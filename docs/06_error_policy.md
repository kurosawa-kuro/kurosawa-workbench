# 06 エラー方針

## エラー分類

| 分類 | 発生箇所 | 対応 |
|---|---|---|
| AI タイムアウト / 障害 | Supabase Edge Function → DeepSeek | Edge Function が `{ error: true, message }` を返す。相談 UI はエラー文＋「直接お問い合わせ」（mailto）を表示し、行き止まりにしない |
| Supabase 呼び出し失敗 | React → Edge Function | `consultEngineer` が throw。`ConsultSection` が error 状態に遷移し、同じくエラー文＋直接問い合わせ導線を出す |
| NG 条件に該当 | Edge Function 受信時 | 常駐・出社必須 / デザイン専業 / DL 研究専業 / 薬機法 は正規表現ルールで `fit: "ng"` を即返し、LLM を呼ばない（コスト・誤判定防止） |
| 入力バリデーション違反 | フロント + Edge Function | 案件概要は必須・最大 500 文字。フロント（`maxLength`）と Edge Function（`MAX_INQUIRY_LENGTH`）の双方で強制 |
| AI 利用回数超過 | React（`aiLimit`） | ブラウザ単位・日次の上限に達したら `AiLimitExceededError` を投げ、相談 UI にエラー文を表示 |
| localStorage 読み書き失敗 | 相談履歴（`workbench-consultations`） | 例外を catch して握りつぶし、履歴保存なしで相談自体は継続 |
| ルーティング不一致（404） | Cloudflare Pages | `_redirects` で `/index.html` にフォールバック（SPA） |
| アニメーション非対応 | View Transition API 未対応ブラウザ | 通常表示にフォールバック（現状は単一ページのため影響は限定的） |
| reduced motion | OS / ブラウザで動きを減らす設定 | `MotionConfig reducedMotion="user"` と CSS の `prefers-reduced-motion` で抑制 |
| Supabase keep-alive 失敗 | Cloudflare Cron Worker → PostgREST | HTTP 非2xx、singleton row 不在、timeout を error log に記録して再 throw。Cron Event を failed にし、秘密値はログへ出さない |

## AI フォールバック戦略

DeepSeek または Supabase が応答しない場合、EC のような「固定候補を代わりに返す」フォールバックは行わない。
案件相談は判定結果そのものが価値のため、無理に擬似結果を出さず、次の 2 点を守る。

- 相談 UI にエラー文と **「直接お問い合わせ」（mailto）** を表示し、ユーザーが連絡手段を失わないようにする。
- NG 条件はルールで即時判定し、LLM を呼ばずに `fit: "ng"` と理由を返す。

## 入力制限

コスト事故・濫用防止のため以下を強制する。

| 制限 | 値 |
|---|---|
| 案件概要の最大文字数 | 500 文字（フロント + Edge Function 双方） |
| AI 呼び出し回数 | ブラウザ単位・日次上限（`__AI_DAILY_LIMIT__`、`aiLimit`） |

## AI モデル

- Edge Function は Supabase Secret `DEEPSEEK_MODEL` を優先する。
- 未設定時は `deepseek-chat` を使う。
- `DEEPSEEK_API_KEY` と `DEEPSEEK_MODEL` はブラウザに露出させない（Supabase Secrets で管理）。

## ログ

- `DEEPSEEK_API_KEY` などの秘密情報はログに出さない。
- Edge Function のエラーは Supabase Dashboard > Logs で確認する（`make fn-logs`）。
- フロントエンドはコンソールへの出力のみ（本番ログ収集基盤なし）。
- keep-alive Worker は `supabase.keepalive.succeeded` / `supabase.keepalive.failed` の構造化 JSON を Workers Logs に出す。ログには host、table、件数、所要時間、HTTP status 相当だけを含め、anon key は含めない。

## 関連タスク

- エラー分類、リトライ、ログ出力の変更は task に再現条件と期待する観測結果を残す。
- 障害対応で得た恒久手順は task に閉じず、`docs/runbooks/` へ昇格する。
- 回帰防止が必要なものは `07_test_strategy.md` と task の `Acceptance Criteria` に反映する。
