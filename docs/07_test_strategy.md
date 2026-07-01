# 07 テスト戦略

## 方針

Playwright E2E を品質ゲートとして使う。
CI は未導入だが、ローカルでは `build` / `lint` / `playwright test` を完了条件にする。
Motion / View Transitions は体感品質に直結するため、自動テストに加えて headed 実行で目視確認する。

## 品質ゲート

```bash
make build        # ビルドエラーがないことを確認
make lint         # oxlint
cd app && npx playwright test   # E2E（routes スモーク）
```

`make test` は現時点では no-op のため、品質ゲートとして使わない。

## テスト範囲

| 範囲 | コマンド | 備考 |
|---|---|---|
| ルートスモーク | `cd app && npx playwright test e2e/routes.spec.js` | トップが開き、ヒーロー / 得意領域 / 実績 / AI 案件相談セクションとヘッダーが表示される |
| 見た目・アニメーション目視 | `make debug` | ヒーローの consult() パイプライン図、得意領域カードの stagger、相談 thinking → 判定の遷移 |
| AI 実接続 | `make debug` + 手動操作 | 案件概要を入力 → DeepSeek → Supabase Edge Function `consult-engineer` → fit 判定が返る |
| ユニットテスト | なし | `aiLimit` などは必要になれば `app/src/lib/*` から追加 |
| CI | なし | 今回は省略 |

## Playwright 設定

| 設定 | 値 | 理由 |
|---|---|---|
| `headless` | `false` | ブラウザを表示して目視確認 |
| `slowMo` | 300ms | 操作を遅らせて見やすくする |
| `screenshot` | `only-on-failure` | 失敗時のみ保存 |
| ブラウザ | Chromium のみ | 最速インストール |

```bash
make debug        # ブラウザを開いてスモークテスト実行
make debug-ui     # Playwright UI モード（インタラクティブデバッグ）
```

> ヘッドレス環境（画面なし）で回す場合は、`headless: true` を上書きした一時 config を渡すか、`xvfb-run` を使う。

## アニメーション検証観点

- `MotionConfig reducedMotion="user"` と CSS の `prefers-reduced-motion` が効くこと
- ヒーローの reveal と得意領域カードの `whileInView` stagger が長すぎず、操作可能になるまで待たされないこと
- 相談 thinking 状態（スキャンバー / スケルトン）が layout shift を起こさないこと
- 相談パイプライン（入力 → 照合 → 判定）の状態遷移が結果表示と一致すること
- JS bundle warning はデモでは許容。大きく増える場合は Motion-heavy 部分の lazy import を検討する

## エラー / フォールバック検証観点

- Supabase / DeepSeek 失敗時に相談 UI がエラー文＋「直接お問い合わせ」（mailto）を出すこと
- NG 条件（常駐・薬機法など）で LLM を呼ばずに `fit: "ng"` が返ること
- Supabase 環境変数未設定時もフロントが白画面にならず、相談時にエラー表示へ落ちること
- AI 利用回数上限超過時に `AiLimitExceededError` のメッセージが表示されること
- localStorage（相談履歴）破損時も相談自体は継続できること

## タスク完了条件

各 task は、完了前に以下を `Verification` に残す。

- 実行したコマンドと結果の要約
- `make build` / `make lint` / `cd app && npx playwright test` の結果
- 目視した UI / アニメーション導線
- 実行できなかった検証と理由
- 残るリスク
