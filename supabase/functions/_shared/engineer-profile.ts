/**
 * 黒澤俊文 — AI 判定用プロファイル（AI の正本）
 *
 * 画面表示用の正本は `app/src/data/engineer-profile.js`。
 * 画面文と AI 判定文は目的が違うため別管理にし、AI 側はこのファイルを唯一の正本とする。
 * consult-engineer Edge Function はここからシステムプロンプトと NG ルールを組み立てる。
 * 内容を変えるときは必ずこのファイルを直す（index.ts にプロンプトをハードコードしない）。
 */

export interface Strength {
  area: string
  level: "高" | "中"
  detail: string
}

export const SUMMARY =
  "GCP AI 基盤（Vertex AI Pipelines / Vertex Vector Search / BigQuery）を軸に、\n" +
  "問題定義・ヒアリング・要件整理・PoC・スライド・プレゼンまで上流から一気通貫で担えるリーダー兼コンサルタント。\n" +
  "フルリモート専門（札幌在住）。フリーランス月 90〜130 万円。"

export const STRENGTHS: Strength[] = [
  { area: "GCP AI 基盤整備", level: "高", detail: "Vertex AI Pipelines / Vertex Vector Search / Vertex AI Feature Store / BigQuery / Dataform / Cloud Run。学習〜サービング〜監視〜自動再学習ループを一人で設計・構築できる。" },
  { area: "上流コンサルティング", level: "高", detail: "ヒアリング・問題定義・要件整理・PoC 設計・スライド作成・プレゼンまで主導。技術者と経営層の両方に伝わる資料を作れる。" },
  { area: "MLOps・ML 基盤", level: "高", detail: "LightGBM（LambdaRank 含む）/ scikit-learn / ONNX / MLflow / Airflow / Kubeflow / KServe。モデル CI・自動再学習・推論 API サービングまでカバー。" },
  { area: "検索基盤・ランキング", level: "高", detail: "Elasticsearch（BM25）+ multilingual-e5 ベクトル検索 + LightGBM LambdaRank 二段構成の設計・実装経験あり。" },
  { area: "バックエンド・API 開発", level: "高", detail: "Python（FastAPI / Pydantic）/ Go（Gin）/ TypeScript（NestJS / Express）/ Java（Spring Boot）。" },
  { area: "インフラ・IaC・DevOps", level: "高", detail: "Terraform（GCP / AWS）/ Kubernetes（EKS / kind）/ Helm / Argo CD / GitHub Actions（WIF）。" },
  { area: "フロントエンド", level: "中", detail: "Next.js / React / TypeScript / Tailwind CSS。バックエンド・インフラとの一体型で強みが出る。" },
  { area: "データ基盤・DWH", level: "中", detail: "BigQuery / Dataform / Snowflake / Redshift / dbt / Airflow。特徴量マートや分析基盤の設計・実装経験あり。" },
  { area: "生成 AI 活用指導", level: "中", detail: "GitHub Copilot 活用指導・動画制作・開発ハーネス展開。" },
  { area: "ブロックチェーン", level: "中", detail: "Solidity / Hyperledger Fabric。テックリードとして設計・実装した経験あり。" },
]

export const NG_CONDITIONS = [
  "常駐・出社必須: フルリモートのみ対応。",
  "DL モデル研究・論文実装専業: 周辺インフラは対応可能。",
  "デザイン専業・UI/UX デザイン: フロント実装は対応可。",
  "実決済・個人情報の本番管理専業: PoC・設計レビューは対応可。",
  "薬機法対応の医療・美容効能表現: 対応外。",
]

export const WORK_STYLE = [
  "フルリモートのみ（札幌在住）",
  "関わり方: 要件定義〜PoC〜実装〜デプロイの一気通貫 / 上流のみ / 実装支援 / MLOps 基盤整備チームリーダー",
  "PoC 段階からの参画が最も価値を発揮しやすい。",
]

/**
 * ルールベースの即時 NG 判定（LLM を呼ばずコスト・誤判定を避ける）。
 * soft が付くものは「主担当としては対象外だが周辺支援は相談可」に逃がし、
 * 完全拒否で営業機会を捨てないようにする（draftInquiry を空にしない）。
 */
export interface NgRule {
  pattern: RegExp
  summary: string
  soft?: { suggestedScope: string[]; draftInquiry: string }
}

export const NG_RULES: NgRule[] = [
  {
    // 絶対 NG — フルリモート専門
    pattern: /常駐|出社\s*必須|週[0-9０-９日]+出社|通勤\s*必須/u,
    summary: "フルリモートのみ対応しているため、常駐・出社必須の案件はお受けできません。",
  },
  {
    // 逃がし — デザイン専業は対象外だがフロント実装・基盤は可
    pattern: /デザイン専業|UIデザイン専業|UXデザイン専業|グラフィックデザイン専業/u,
    summary: "ビジュアルデザイン・UI/UX デザイン専業は主担当として対象外です。ただしフロントエンド実装・AI 導入基盤・PoC 化は相談可能です。",
    soft: {
      suggestedScope: ["フロントエンド実装（React / Next.js）", "AI 導入基盤・PoC 設計"],
      draftInquiry:
        "黒澤様\n\nUI/UX デザインそのものではなく、フロントエンド実装や AI 導入基盤・PoC 化の面でご相談できればと考えています。\n（案件概要をここに記載してください）\n\nよろしくお願いいたします。",
    },
  },
  {
    // 逃がし — DL 研究専業は対象外だが周辺インフラ・パイプラインは可
    pattern: /DLモデル.*研究専業|論文実装.*専業|ディープラーニング.*研究専業/u,
    summary: "DL モデル研究・論文実装専業は主担当として対象外です。ただし周辺インフラ・ML/LLM パイプライン構築・PoC 化は相談可能です。",
    soft: {
      suggestedScope: ["ML / LLM 基盤・MLOps パイプライン構築", "PoC 設計・本番化支援"],
      draftInquiry:
        "黒澤様\n\nDL モデルの研究そのものではなく、その周辺の ML/LLM 基盤・MLOps パイプライン構築や PoC 化についてご相談できればと考えています。\n（案件概要をここに記載してください）\n\nよろしくお願いいたします。",
    },
  },
  {
    // 絶対 NG — 薬機法
    pattern: /薬機法/u,
    summary: "薬機法対応を含む案件は対応外です。",
  },
]

export function buildSystemPrompt(): string {
  const strengths = STRENGTHS
    .map((s) => `- ${s.area}（${s.level}）: ${s.detail}`)
    .join("\n")
  const ng = NG_CONDITIONS.map((c) => `- ${c}`).join("\n")
  const work = WORK_STYLE.map((w) => `- ${w}`).join("\n")

  return `あなたは「黒澤俊文」の案件マッチング AI です。
訪問者から案件の概要を受け取り、黒澤が対応できるかを判定して JSON で返してください。

## 黒澤俊文のプロファイル

${SUMMARY}

### 得意領域

${strengths}

### 対応外（NG）条件

${ng}

### 仕事スタイル

${work}

## 返答形式

以下の JSON のみを返してください（\`\`\`json ブロック不要、JSON だけ）。

{
  "fit": "high | medium | low | ng",
  "canHandle": true または false,
  "summary": "1〜2文で対応可否と理由",
  "suggestedScope": ["作業項目1", "作業項目2"],
  "risks": ["リスク・注意点1"],
  "questions": ["確認したい質問1"],
  "draftInquiry": "訪問者がそのままコピーして送れる問い合わせ文"
}

fit の基準:
- high: 主力スタックで経験豊富、スムーズに対応できる
- medium: 対応可能だが主軸ではない、スコープ確認が必要
- low: 対応可能だが苦手領域が多い、大幅なスコープ調整が必要
- ng: 常駐必須 / フルリモート不可 / NG 条件に該当、対応不可

対応外に近い場合も、可能なら周辺の支援（フロント実装・AI 導入基盤・PoC 化など）へ逃がし、
draftInquiry を空にせず代替の相談文を提案してください。`
}
