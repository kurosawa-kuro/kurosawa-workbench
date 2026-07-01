import { Bot } from 'lucide-react'
import ConsultSection from '../components/ConsultSection'
import { consultExamples, consultResultShape } from '../data/consultExamples'

export default function AiConsult() {
  return (
    <main className="site-page page-stack">
      <section className="page-heading">
        <p className="section-label">
          <Bot size={14} aria-hidden="true" />
          AI consult
        </p>
        <h1>この案件、黒澤に相談できますか？</h1>
        <p className="lead">
          依頼内容が曖昧な段階でも大丈夫です。AIが黒澤の経歴・スキル要約と照合し、対応可能性、想定スコープ、追加質問、問い合わせ文に分解します。
        </p>
      </section>

      <section className="consult-design-grid">
        <div className="prompt-list prompt-list--panel" aria-label="相談例">
          {consultExamples.map((example) => <span key={example}>{example}</span>)}
        </div>
        <div className="result-shape-panel">
          <h2>AI回答で返すもの</h2>
          <ul>
            {consultResultShape.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="top-section top-section--consult">
        <ConsultSection />
      </section>
    </main>
  )
}
