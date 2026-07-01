# 02 アーキテクチャ — 黒澤 Workbench

## 概要

```text
ブラウザ (React + Vite SPA)
  -> 静的配信: Cloudflare Pages
  -> Edge Function (consult-engineer)
      1. ルールベース NG 判定（常駐・出社必須等 → 即 fit:ng、LLM を呼ばない）
      2. LLM 判定（DeepSeek API）
      3. ConsultResult JSON を返す
  -> 問い合わせ導線（draftInquiry コピー / mailto: リンク）
```

## 構成要素

| 構成要素 | 役割 | パス |
|---|---|---|
| React 19 + Vite 8 | SPA フロントエンド | `app/` |
| Cloudflare Pages | 静的ホスティング | — |
| `consult-engineer` Edge Function | NG ルール判定 + DeepSeek API ゲートウェイ | `supabase/functions/consult-engineer/` |
| `engineer-profile.js` | 黒澤プロファイル + `buildSystemPrompt()` | `app/src/data/engineer-profile.js` |
| localStorage | 相談履歴（`workbench-consultations`） | — |

## 判定フロー（consult-engineer Edge Function）

```text
受信: Inquiry { inquiry, stack, budget, deadline, existingCode, involvement }
  │
  ▼
① NG ルール判定（LLM を呼ばない）
  │ 常駐・出社必須 → fit: ng, canHandle: false を即返す
  │ デザイン専業 → 同上
  │ DL モデル研究専業 → 同上
  │ 薬機法対応 → 同上
  │ 実決済本番管理 → 同上
  │
  ▼（NG 非該当）
② DeepSeek API 呼び出し
  │ system prompt = buildSystemPrompt()（黒澤プロファイル埋め込み）
  │ user message = Inquiry の各フィールドを整形したテキスト
  │
  ▼
③ ConsultResult JSON を返す
  │ fit / canHandle / summary / suggestedScope / risks / questions / draftInquiry
  │
  ▼（障害時）
④ フォールバック
  { error: true, message: "現在AIが応答できません。直接お問い合わせください。" }
```

## Edge Function I/O

### リクエスト

```json
{
  "inquiry":      "Vertex AI Pipelines を使った MLOps 基盤を構築したい。BigQuery で特徴量管理もしたい。",
  "stack":        "GCP, Python, Terraform",
  "budget":       "月 100 万円",
  "deadline":     "3ヶ月",
  "existingCode": "なし",
  "involvement":  "要件定義から実装まで一気通貫"
}
```

### レスポンス（fit: high 例）

```json
{
  "fit": "high",
  "canHandle": true,
  "summary": "対応可能です。Vertex AI Pipelines + BigQuery の MLOps 基盤整備は主力領域です。要件定義から Cloud Run サービングまで一気通貫で担えます。",
  "suggestedScope": ["ヒアリング・要件整理", "Vertex AI Pipelines 設計・実装", "BigQuery 特徴量マート構築", "Cloud Run サービング", "Terraform IaC 整備"],
  "risks": ["フルリモート専門のため出社不可"],
  "questions": ["GCP プロジェクトはすでにありますか？", "学習データは BigQuery に集約済みですか？"],
  "draftInquiry": "Vertex AI Pipelines + BigQuery での MLOps 基盤整備をご相談したいです。要件定義から実装まで一気通貫でお願いできますか？"
}
```

### レスポンス（fit: ng 例 — ルール判定）

```json
{
  "fit": "ng",
  "canHandle": false,
  "summary": "フルリモートのみ対応しているため、常駐必須の案件はお受けできません。",
  "suggestedScope": [],
  "risks": [],
  "questions": [],
  "draftInquiry": ""
}
```

## 問い合わせ導線

AI QA の最終ゴールは整理済みリードの獲得。ConsultResult を表示後、必ず以下を提供する。

1. `draftInquiry` の1クリックコピーボタン
2. `mailto:kurosawa@example.com?subject=案件相談&body={draftInquiry}` のリンク（MVP はこれで十分）
3. fit: ng のときも「直接お問い合わせください」+ 連絡先を表示

## エンジニアプロファイル（`engineer-profile.js`）

`buildSystemPrompt()` が以下を組み合わせて system prompt を生成する:

1. 黒澤のポジショニング（GCP AI 基盤専門家 / フリーランス / フルリモート）
2. 得意領域と具体技術（strength: high / medium）
3. NG 条件（ルール判定で弾けなかった曖昧なケースの補完）
4. fit 判定基準と出力 JSON スキーマの指示

**プロファイルの質が AI QA の質を決める。** ここが薄いと汎用チャットになる。

## 境界

- DeepSeek API キーはブラウザに出さない。`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` は Supabase Secrets のみ。
- NG ルール判定はサーバーサイド（Edge Function 内）で行い、フロントに判定ロジックを持たせない。
- `engineer-profile.js` が AI 判定の唯一の根拠。プロファイルを変えれば判定が変わる。

## 関連タスク

- 構造変更・責務移動は実装前に `docs/tasks/active/` へ task を作る。
- NG ルールの追加・変更は `engineer-profile.js` の `ngConditions` と Edge Function のルール判定を同時に更新する。
