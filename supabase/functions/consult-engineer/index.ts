import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const DEEPSEEK_API_KEY = Deno.env.get("DEEPSEEK_API_KEY") ?? ""
const DEEPSEEK_MODEL = Deno.env.get("DEEPSEEK_MODEL") ?? "deepseek-chat"
const MAX_INQUIRY_LENGTH = 500

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const NG_RULES: { pattern: RegExp; summary: string }[] = [
  {
    pattern: /常駐|出社\s*必須|週[0-9０-９日]+出社|通勤\s*必須/u,
    summary: "フルリモートのみ対応しているため、常駐・出社必須の案件はお受けできません。",
  },
  {
    pattern: /デザイン専業|UIデザイン専業|UXデザイン専業|グラフィックデザイン専業/u,
    summary: "ビジュアルデザイン・UIデザイン専業は対応外です。フロント実装は対応可能です。",
  },
  {
    pattern: /DLモデル.*研究専業|論文実装.*専業|ディープラーニング.*研究専業/u,
    summary: "DLモデル研究・論文実装専業は対応外です。周辺インフラやパイプライン構築は対応可能です。",
  },
  {
    pattern: /薬機法/u,
    summary: "薬機法対応を含む案件は対応外です。",
  },
]

const FALLBACK: Record<string, unknown> = {
  error: true,
  message: "現在 AI が応答できません。お手数ですが直接お問い合わせください。",
}

const SYSTEM_PROMPT = `あなたは「黒澤俊文」の案件マッチング AI です。
訪問者から案件の概要を受け取り、黒澤が対応できるかを判定して JSON で返してください。

## 黒澤俊文のプロファイル

GCP AI 基盤（Vertex AI Pipelines / Vertex Vector Search / BigQuery）を軸に、
問題定義・ヒアリング・要件整理・PoC・スライド・プレゼンまで上流から一気通貫で担えるリーダー兼コンサルタント。
フルリモート専門（札幌在住）。フリーランス月 90〜130 万円。

### 得意領域

- GCP AI 基盤整備（高）: Vertex AI Pipelines / Vertex Vector Search / Vertex AI Feature Store / BigQuery / Dataform / Cloud Run。学習〜サービング〜監視〜自動再学習ループを一人で設計・構築できる。
- 上流コンサルティング（高）: ヒアリング・問題定義・要件整理・PoC 設計・スライド作成・プレゼンまで主導。技術者と経営層の両方に伝わる資料を作れる。
- MLOps・ML 基盤（高）: LightGBM（LambdaRank 含む）/ scikit-learn / ONNX / MLflow / Airflow / Kubeflow / KServe。モデル CI・自動再学習・推論 API サービングまでカバー。
- 検索基盤・ランキング（高）: Elasticsearch（BM25）+ multilingual-e5 ベクトル検索 + LightGBM LambdaRank 二段構成の設計・実装経験あり。
- バックエンド・API 開発（高）: Python（FastAPI / Pydantic）/ Go（Gin）/ TypeScript（NestJS / Express）/ Java（Spring Boot）。
- インフラ・IaC・DevOps（高）: Terraform（GCP / AWS）/ Kubernetes（EKS / kind）/ Helm / Argo CD / GitHub Actions（WIF）。
- フロントエンド（中）: Next.js / React / TypeScript / Tailwind CSS。バックエンド・インフラとの一体型で強みが出る。
- データ基盤・DWH（中）: BigQuery / Dataform / Snowflake / Redshift / dbt / Airflow。特徴量マートや分析基盤の設計・実装経験あり。
- 生成 AI 活用指導（中）: GitHub Copilot 活用指導・動画制作・開発ハーネス展開。
- ブロックチェーン（中）: Solidity / Hyperledger Fabric。テックリードとして設計・実装した経験あり。

### 対応外（NG）条件

- 常駐・出社必須: フルリモートのみ対応。
- DL モデル研究・論文実装専業: 周辺インフラは対応可能。
- デザイン専業・UI/UX デザイン: フロント実装は対応可。
- 実決済・個人情報の本番管理専業: PoC・設計レビューは対応可。
- 薬機法対応の医療・美容効能表現: 対応外。

### 仕事スタイル

- フルリモートのみ（札幌在住）
- 関わり方: 要件定義〜PoC〜実装〜デプロイの一気通貫 / 上流のみ / 実装支援 / MLOps 基盤整備チームリーダー
- PoC 段階からの参画が最も価値を発揮しやすい。

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
- ng: 常駐必須 / フルリモート不可 / NG 条件に該当、対応不可`

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS })
  }

  try {
    const { inquiry, stack, budget, deadline, existingCode, involvement } = await req.json()

    if (!inquiry) {
      return json({ error: true, message: "inquiry は必須です" }, 400)
    }

    const trimmedInquiry = String(inquiry).slice(0, MAX_INQUIRY_LENGTH)
    const allText = [trimmedInquiry, stack, involvement].filter(Boolean).join(" ")

    for (const rule of NG_RULES) {
      if (rule.pattern.test(allText)) {
        return json({
          fit: "ng",
          canHandle: false,
          summary: rule.summary,
          suggestedScope: [],
          risks: [],
          questions: [],
          draftInquiry: "",
        })
      }
    }

    const parts = [`案件概要: ${trimmedInquiry}`]
    if (stack) parts.push(`技術スタック: ${stack}`)
    if (budget) parts.push(`予算・単価感: ${budget}`)
    if (deadline) parts.push(`期限・稼働期間: ${deadline}`)
    if (existingCode) parts.push(`既存コードの有無: ${existingCode}`)
    if (involvement) parts.push(`希望する関わり方: ${involvement}`)

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: parts.join("\n") },
        ],
        max_tokens: 1024,
        temperature: 0.3,
      }),
    })

    if (!res.ok) return json(FALLBACK)

    const data = await res.json()
    const content: string = data.choices?.[0]?.message?.content ?? ""

    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ?? content.match(/(\{[\s\S]*\})/)
    const jsonText = jsonMatch ? (jsonMatch[1] ?? jsonMatch[0]) : content

    return json(JSON.parse(jsonText))
  } catch {
    return json(FALLBACK)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  })
}
