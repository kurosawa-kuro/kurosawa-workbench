# 05 データモデル — 黒澤 Workbench

## 設定

| 種別 | 場所 | 内容 |
|---|---|---|
| 一般設定 | `env/config.yaml` | プロジェクト名・Supabase URL・AI 制限値・デプロイ先 |
| フロント環境変数 | `app/.env.local`（.gitignore 済み） | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| Edge Function Secrets | Supabase Secrets | `DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL` |

## 固定データ

| データ | 場所 | 用途 |
|---|---|---|
| EngineerProfile | `app/src/data/engineer-profile.js` | `/career` 表示、AI相談の根拠 |
| ServiceMenu | `app/src/data/services.js` | `/services` 表示、トップのサービスプレビュー |
| ConsultExample | `app/src/data/consultExamples.js` | `/ai-consult` の相談例チップ、回答構造説明 |
| Case | `app/src/data/cases.js` | `/cases` の案件タイプ別提供価値 |

## ブラウザ永続化

| データ | 場所 | 補足 |
|---|---|---|
| AI 相談履歴 | `localStorage['workbench-consultations']` | ConsultResult の JSON 配列。最大 50 件 |
| AI 利用回数 | `localStorage['workbench_ai_usage_<YYYY-MM-DD>']` | ブラウザ単位の日次利用回数 |

## データ構造

### EngineerProfile

```js
{
  name: "黒澤俊文",
  title: "GCP AI 基盤専門家 / リーダー・技術コンサルタント",
  location: "札幌（フルリモートのみ）",
  experience: "10年超...",
  summary: "...",
  strengths: [{ area, strength: "high" | "medium", detail, keywords: [] }],
  ngConditions: [{ condition, reason }],
  workStyle: { remote, engagement: [], notes },
  credentials: []
}
```

### ServiceMenu

```js
{
  id: "ai-poc",
  title: "生成AI導入支援",
  summary: "...",
  pain: "...",
  deliverables: [],
  goodFit: [],
  badFit: [],
  requiredInfo: []
}
```

### ConsultExample

```js
[
  "AWSとKubernetesの運用改善を相談できますか？",
  "社内向け生成AIツールのPoCを依頼できますか？"
]
```

### Case

```js
{
  id: "ai-poc",
  title: "AI導入支援・PoC",
  challenge: "...",
  support: "...",
  stack: ["React", "Supabase Edge Functions"],
  outcome: "...",
  fit: "..."
}
```

### Inquiry

```js
{
  inquiry: "社内向け生成AIツールのPoCを依頼できますか？",
  stack: "React, Supabase, GCP",
  budget: "月100万円前後",
  deadline: "3ヶ月",
  existingCode: "なし",
  involvement: "要件定義〜実装まで一気通貫"
}
```

### ConsultResult

```js
{
  fit: "high",
  canHandle: true,
  summary: "対応可能です...",
  suggestedScope: ["ヒアリング", "PoC設計"],
  risks: ["本番個人情報管理はスコープ調整が必要です"],
  questions: ["既存データはどこにありますか？"],
  draftInquiry: "社内向け生成AIツールのPoCについて相談したいです..."
}
```

## Edge Function I/O

詳細は `docs/02_architecture.md` の「Edge Function: consult-engineer」節を参照。

## 注意点

- `engineer-profile.js` と `consult-engineer` の system prompt は現状別管理。プロフィール変更時は同期漏れに注意する。
- `env/config.yaml` は非機密設定の正本だが、変更時はアプリ実装・README・runbook と同期する。
- 固定データをページコンポーネントへ直書きしない。

## 関連タスク

- schema・設定・永続化方式の変更は task に目的・移行手順・検証方法を残す。
