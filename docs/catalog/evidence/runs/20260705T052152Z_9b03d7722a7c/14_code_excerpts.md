# Controlled Code Excerpts

evidence_id: ev.code_excerpts.summary

Small deterministic source excerpts around public/test anchors. This is controlled raw evidence for investigation; it is not a license to read or paste the full repository.

## app/src/App.jsx:9-15 `App`

language: `typescript`

```text
9: import Cases from './pages/Cases'
10: import Contact from './pages/Contact'
11: 
12: export default function App() {
13:   return (
14:     <MotionConfig reducedMotion="user">
15:       <BrowserRouter>
```

## app/src/components/ConsultSection.jsx:31-37 `ConsultSection`

language: `typescript`

```text
31:   } catch { /* ignore */ }
32: }
33: 
34: export default function ConsultSection() {
35:   const [form, setForm] = useState({
36:     inquiry: '', stack: '', budget: '', deadline: '', existingCode: '', involvement: '',
37:   })
```

## app/src/components/ConsultSection.jsx:43-49 `handleSubmit`

language: `typescript`

```text
43: <redacted sensitive-looking assignment>
44:   }
45: 
46:   async function handleSubmit(e) {
47:     e.preventDefault()
48:     if (!form.inquiry.trim()) return
49:     setStatus('loading')
```

## app/src/components/Footer.jsx:6-12 `Footer`

language: `typescript`

```text
6:   { label: 'Contact', href: '/contact' },
7: ]
8: 
9: export default function Footer() {
10:   return (
11:     <footer className="site-footer">
12:       <div className="footer-inner">
```

## app/src/components/Header.jsx:1-7 `Header`

language: `typescript`

```text
1: import { Bot } from 'lucide-react'
2: import { Link } from 'react-router-dom'
3: 
4: export default function Header() {
5:   return (
6:     <header className="site-header">
7:       <div className="header-inner">
```

## app/src/lib/aiLimit.js:1-4 `AiLimitExceededError`

language: `typescript`

```text
1: export class AiLimitExceededError extends Error {
2:   constructor(limit) {
3:     super(`本日のAI利用回数の上限（${limit}回）に達しました。明日またご利用ください。`)
4:     this.name = 'AiLimitExceededError'
```

## app/src/lib/aiLimit.js:8-14 `consumeAiLimit`

language: `typescript`

```text
8: 
9: <redacted sensitive-looking assignment>
10: 
11: export function consumeAiLimit() {
12:   const limit = __AI_DAILY_LIMIT__
13: <redacted sensitive-looking assignment>
14: <redacted sensitive-looking assignment>
```

## app/src/lib/aiLimit.js:18-23 `getAiUsageToday`

language: `typescript`

```text
18:   localStorage.setItem(key, String(current + 1))
19: }
20: 
21: export function getAiUsageToday() {
22:   return parseInt(localStorage.getItem(storageKey()) ?? '0')
23: }
```

## app/src/lib/motion.js:1-6 `EASE`

language: `typescript`

```text
1: // Shared animation variants for Motion
2: 
3: export const EASE = [0.25, 0.1, 0.25, 1]
4: 
5: export const staggerGrid = {
6:   hidden: {},
```

## app/src/lib/supabase.js:8-14 `consultEngineer`

language: `typescript`

```text
8: <redacted sensitive-looking assignment>
9: 
10: // AI 案件相談
11: export async function consultEngineer(inquiry) {
12:   if (!supabase) throw new Error('Supabase client is not configured')
13:   consumeAiLimit()
14:   const { data, error } = await supabase.functions.invoke('consult-engineer', {
```

## app/src/lib/viewTransition.js:1-4 `startViewTransition`

language: `typescript`

```text
1: export function startViewTransition(update) {
2:   if (typeof document !== 'undefined' && document.startViewTransition) {
3:     document.startViewTransition(update)
4:     return
```

## app/src/pages/AiConsult.jsx:2-8 `AiConsult`

language: `typescript`

```text
2: import ConsultSection from '../components/ConsultSection'
3: import { consultExamples, consultResultShape } from '../data/consultExamples'
4: 
5: export default function AiConsult() {
6:   return (
7:     <main className="site-page page-stack">
8:       <section className="page-heading">
```

## app/src/pages/Career.jsx:14-20 `Career`

language: `typescript`

```text
14: 
15: const pad2 = (n) => String(n + 1).padStart(2, '0')
16: 
17: export default function Career() {
18:   return (
19:     <main>
20:       <section className="top-hero">
```

## app/src/pages/Cases.jsx:1-6 `Cases`

language: `typescript`

```text
1: import { cases } from '../data/cases'
2: 
3: export default function Cases() {
4:   return (
5:     <main className="site-page page-stack">
6:       <section className="page-heading">
```

## app/src/pages/Contact.jsx:3-9 `Contact`

language: `typescript`

```text
3: 
4: const CONTACT_EMAIL = 'contact@example.com'
5: 
6: export default function Contact() {
7:   return (
8:     <main className="site-page page-stack">
9:       <section className="page-heading">
```

## app/src/pages/Services.jsx:2-8 `Services`

language: `typescript`

```text
2: import { Link } from 'react-router-dom'
3: import { services, serviceHighlights } from '../data/services'
4: 
5: export default function Services() {
6:   return (
7:     <main className="site-page page-stack">
8:       <section className="page-heading">
```

## app/src/pages/Top.jsx:7-13 `Top`

language: `typescript`

```text
7: 
8: const featuredServices = services.slice(0, 3)
9: 
10: export default function Top() {
11:   return (
12:     <main>
13:       <section className="top-hero">
```

## supabase/functions/_shared/engineer-profile.ts:31-37 `NG_CONDITIONS`

language: `typescript`

```text
31:   { area: "ブロックチェーン", level: "中", detail: "Solidity / Hyperledger Fabric。テックリードとして設計・実装した経験あり。" },
32: ]
33: 
34: export const NG_CONDITIONS = [
35:   "常駐・出社必須: フルリモートのみ対応。",
36:   "DL モデル研究・論文実装専業: 周辺インフラは対応可能。",
37:   "デザイン専業・UI/UX デザイン: フロント実装は対応可。",
```

## supabase/functions/_shared/engineer-profile.ts:56-62 `NG_RULES`

language: `typescript`

```text
56:   soft?: { suggestedScope: string[]; draftInquiry: string }
57: }
58: 
59: export const NG_RULES: NgRule[] = [
60:   {
61:     // 絶対 NG — フルリモート専門
62:     pattern: /常駐|出社\s*必須|週[0-9０-９日]+出社|通勤\s*必須/u,
```

## supabase/functions/_shared/engineer-profile.ts:18-24 `STRENGTHS`

language: `typescript`

```text
18:   "問題定義・ヒアリング・要件整理・PoC・スライド・プレゼンまで上流から一気通貫で担えるリーダー兼コンサルタント。\n" +
19:   "フルリモート専門（札幌在住）。フリーランス月 90〜130 万円。"
20: 
21: export const STRENGTHS: Strength[] = [
22:   { area: "GCP AI 基盤整備", level: "高", detail: "Vertex AI Pipelines / Vertex Vector Search / Vertex AI Feature Store / BigQuery / Dataform / Cloud Run。学習〜サービング〜監視〜自動再学習ループを一人で設計・構築でき
23:   { area: "上流コンサルティング", level: "高", detail: "ヒアリング・問題定義・要件整理・PoC 設計・スライド作成・プレゼンまで主導。技術者と経営層の両方に伝わる資料を作れる。" },
24:   { area: "MLOps・ML 基盤", level: "高", detail: "LightGBM（LambdaRank 含む）/ scikit-learn / ONNX / MLflow / Airflow / Kubeflow / KServe。モデル CI・自動再学習・推論 API サービングまでカバー。" },
```

## supabase/functions/_shared/engineer-profile.ts:13-19 `SUMMARY`

language: `typescript`

```text
13:   detail: string
14: }
15: 
16: export const SUMMARY =
17:   "GCP AI 基盤（Vertex AI Pipelines / Vertex Vector Search / BigQuery）を軸に、\n" +
18:   "問題定義・ヒアリング・要件整理・PoC・スライド・プレゼンまで上流から一気通貫で担えるリーダー兼コンサルタント。\n" +
19:   "フルリモート専門（札幌在住）。フリーランス月 90〜130 万円。"
```

## supabase/functions/_shared/engineer-profile.ts:39-45 `WORK_STYLE`

language: `typescript`

```text
39:   "薬機法対応の医療・美容効能表現: 対応外。",
40: ]
41: 
42: export const WORK_STYLE = [
43:   "フルリモートのみ（札幌在住）",
44:   "関わり方: 要件定義〜PoC〜実装〜デプロイの一気通貫 / 上流のみ / 実装支援 / MLOps 基盤整備チームリーダー",
45:   "PoC 段階からの参画が最も価値を発揮しやすい。",
```

## supabase/functions/_shared/engineer-profile.ts:89-95 `buildSystemPrompt`

language: `typescript`

```text
89:   },
90: ]
91: 
92: export function buildSystemPrompt(): string {
93:   const strengths = STRENGTHS
94:     .map((s) => `- ${s.area}（${s.level}）: ${s.detail}`)
95:     .join("\n")
```

## Guardrail

- Excerpts are capped and redacted for sensitive-looking assignment lines. Confirm full context with owner approval before relying on omitted lines.
