import { Bot } from 'lucide-react'
import ConsultSection from '../components/ConsultSection'
import { consultExamples, consultResultShape } from '../data/consultExamples'
import { Card, PageHeader } from '../components/ui'

export default function AiConsult() {
  return (
    <main className="admin-content">
      <PageHeader
        eyebrow="AI consult"
        title="この案件、黒澤に相談できますか？"
        description="依頼内容が曖昧な段階でも大丈夫です。AIが黒澤の経歴・スキル要約と照合し、対応可能性、想定スコープ、追加質問、問い合わせ文に分解します。"
        meta={<span className="admin-badge admin-badge--lime"><Bot size={14} /> AI fit check</span>}
      />

      <section className="consult-design-grid">
        <Card className="prompt-list-card">
          <span className="admin-eyebrow">相談例</span>
          <div className="prompt-list" aria-label="相談例">
            {consultExamples.map((example) => <span key={example}>{example}</span>)}
          </div>
        </Card>
        <Card className="result-shape-panel">
          <span className="admin-eyebrow">Output</span>
          <h2>AI回答で返すもの</h2>
          <ul>
            {consultResultShape.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      </section>

      <section>
        <ConsultSection />
      </section>
    </main>
  )
}
