# 03 ドメインモデル — 黒澤 Workbench

## 用語

| 用語 | 意味 |
|---|---|
| SalesSite | 黒澤俊文のフリーランス営業サイト全体 |
| Route | React Router で提供するページ。`/`, `/services`, `/ai-consult`, `/career`, `/cases`, `/contact` |
| ServiceMenu | 依頼できる内容。`app/src/data/services.js` |
| ServiceBlock | ServiceMenu の詳細要素。困りごと、提供内容、向き不向き、相談時に必要な情報 |
| EngineerProfile | 黒澤のプロファイル。得意領域・NG条件・仕事スタイル・資格を持つ。`app/src/data/engineer-profile.js` |
| Strength | 得意領域の1エントリ。`{ area, strength, detail, keywords[] }` |
| NgCondition | 対応外条件の1エントリ。`{ condition, reason }` |
| Case | 案件タイプ別の提供価値。`app/src/data/cases.js` |
| ConsultExample | AI相談の入力例。`app/src/data/consultExamples.js` |
| Inquiry | 案件相談の入力。`{ inquiry, stack, budget, deadline, existingCode, involvement }` |
| ConsultResult | AI相談の結果。`{ fit, canHandle, summary, suggestedScope[], risks[], questions[], draftInquiry }` |
| ConsultHistory | 過去の相談履歴。localStorage に保持する ConsultResult の配列 |
| AiUsage | ブラウザ単位の日次 AI 利用回数 |

## ページ責務モデル

```text
/
  SalesSite の分岐ハブ
  ServiceMenu への導線
  AI相談への導線
  Career への導線

/services
  ServiceMenu を表示
  発注者に「何を頼めるか」を判断させる

/ai-consult
  ConsultExample を表示
  Inquiry を入力
  ConsultResult を表示
  draftInquiry をコピー / mailto へつなげる

/career
  EngineerProfile の Strength / credentials を表示

/cases
  Case を案件タイプ別に表示

/contact
  問い合わせに必要な情報を提示
  AI相談から下書きする導線を提示
```

## AI 相談ライフサイクル

```text
ConsultExample
  → Inquiry に入力
  → consumeAiLimit()
  → consult-engineer Edge Function 呼び出し
  → NG ルール判定
      → fit: ng の ConsultResult
  → DeepSeek API
      → ConsultResult
  → ConsultSection で結果表示
  → localStorage['workbench-consultations'] に保存
  → draftInquiry をコピー / mailto:
```

障害時:

```text
Edge Function error / DeepSeek error / JSON parse error
  → { error: true, message }
  → ConsultSection で直接問い合わせ導線を表示
```

## ConsultResult.fit

| fit | 意味 |
|---|---|
| `high` | 主力スタックで経験豊富。スムーズに対応できる |
| `medium` | 対応可能だが主軸ではない。スコープ確認が必要 |
| `low` | 対応可能だが苦手領域が多い。大幅なスコープ調整が必要 |
| `ng` | 常駐必須 / NG条件に該当。対応不可 |

## 制約

- DB なし。
- 固定データは `app/src/data/`。
- 案件情報はサーバーサイドに保存しない。
- 相談履歴はブラウザ localStorage のみ。
- `ServiceMenu`, `ConsultExample`, `Case` はページに直書きしない。
- AI相談の根拠は `engineer-profile.js` と `consult-engineer` の system prompt を同期させる。

## 関連タスク

- 用語・状態・ライフサイクルの変更は task に背景と影響範囲を残してから反映する。
- 未確定の業務ルールはこの文書へ入れず `docs/tasks/backlog/` で管理する。
