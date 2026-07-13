# 02 アーキテクチャ — 黒澤 Workbench

## 概要

```text
ブラウザ (React + Vite SPA)
  -> React Router
       /
       /services
       /ai-consult
       /career
       /cases
       /contact
  -> 静的配信: Cloudflare Pages
  -> Edge Function: consult-engineer
       1. NG ルール判定
       2. DeepSeek API 呼び出し
       3. ConsultResult JSON を返す
  -> 問い合わせ導線
       draftInquiry コピー / mailto:
```

## 構成要素

| 構成要素 | 役割 | パス |
|---|---|---|
| React 19 + Vite 8 | SPA フロントエンド | `app/` |
| React Router | 6ページのルーティング | `app/src/App.jsx` |
| Pico CSS / admin-pico | ダーク固定のUI基盤、レスポンシブシェル、共通コンポーネント | `app/src/styles/`, `app/src/components/ui.jsx` |
| Cloudflare Pages | 静的ホスティング | `app/dist/` |
| `consult-engineer` Edge Function | NG ルール判定 + DeepSeek API ゲートウェイ | `supabase/functions/consult-engineer/` |
| 固定データ | プロフィール、サービス、相談例、案件タイプ | `app/src/data/` |
| localStorage | AI利用回数、相談履歴 | ブラウザ |

## ルーティング

| Route | Component | 役割 |
|---|---|---|
| `/` | `Top.jsx` | 第一印象と分岐 |
| `/services` | `Services.jsx` | 依頼メニュー |
| `/ai-consult` | `AiConsult.jsx` | AI案件相談 |
| `/career` | `Career.jsx` | 経歴・得意領域・資格 |
| `/cases` | `Cases.jsx` | 案件タイプ別の提供価値 |
| `/contact` | `Contact.jsx` | 問い合わせ導線 |

## フロントエンド責務

| 領域 | パス | 責務 |
|---|---|---|
| Layout | `components/AppShell.jsx` | サイドバー、モバイルメニュー、フッターを含む全ページ共通シェル |
| UI primitives | `components/ui.jsx` | `PageHeader`、`SectionHeader`、`Card`、`Badge` |
| Styles | `styles/admin-*.css`, `styles/pages.css` | テーマ、レイアウト、共通部品、ページ表現、レスポンシブ規則 |
| AI相談UI | `components/ConsultSection.jsx` | 入力フォーム、相談例チップ、結果表示、コピー/メール導線 |
| Pages | `pages/*.jsx` | ページ責務ごとのレイアウト |
| Data | `data/*.js` | 画面表示とAI相談の根拠になる固定データ |
| API client | `lib/supabase.js` | Supabase Edge Function 呼び出し |
| AI limit | `lib/aiLimit.js` | ブラウザ単位の日次利用回数 |

## Edge Function: consult-engineer

### 判定フロー

```text
受信: Inquiry { inquiry, stack, budget, deadline, existingCode, involvement }
  │
  ▼
① 入力検証
  │ inquiry 必須 / inquiry は 500 文字まで
  ▼
② NG ルール判定
  │ 常駐・出社必須
  │ デザイン専業
  │ DL モデル研究専業
  │ 薬機法対応
  ▼（NG 非該当）
③ DeepSeek API 呼び出し
  │ system prompt = 黒澤プロフィールと出力 JSON 指示
  │ user message = Inquiry の各フィールド
  ▼
④ ConsultResult JSON を返す
  │ fit / canHandle / summary / suggestedScope / risks / questions / draftInquiry
  ▼（障害時）
⑤ フォールバック
  { error: true, message: "現在 AI が応答できません。お手数ですが直接お問い合わせください。" }
```

### リクエスト

```json
{
  "inquiry": "社内向け生成AIツールのPoCを依頼できますか？",
  "stack": "React, Supabase, GCP",
  "budget": "月100万円前後",
  "deadline": "3ヶ月",
  "existingCode": "なし",
  "involvement": "要件定義〜実装まで一気通貫"
}
```

### レスポンス

```json
{
  "fit": "high",
  "canHandle": true,
  "summary": "対応可能です。生成AI導入支援とWebアプリ実装の両方に近い案件です。",
  "suggestedScope": ["ヒアリング", "PoC設計", "AI相談UI実装"],
  "risks": ["本番個人情報管理はスコープ調整が必要です"],
  "questions": ["既存データはどこにありますか？"],
  "draftInquiry": "社内向け生成AIツールのPoCについて相談したいです..."
}
```

## 問い合わせ導線

AI相談結果に `draftInquiry` がある場合:

1. コピー
2. `mailto:` でメール送信

`/contact` では AI 相談で下書きしてから送る流れを推奨する。バックエンドの問い合わせ保存は持たない。

## 境界

- DeepSeek API キーはブラウザに出さない。`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` は Supabase Secrets。
- 案件情報はDB保存しない。
- 固定データは `app/src/data/`。ページに直書きしない。
- AI相談の根拠は `consult-engineer` の system prompt と `engineer-profile.js` の内容を同期させる。
- フロント側にも `consumeAiLimit()` による日次利用回数制限がある。

## 関連タスク

- 構造変更・責務移動は実装前に `docs/tasks/active/` へ task を作る。
- ページ構成の設計メモは `docs/tasks/backlog/sales-site-page-structure.md`。
