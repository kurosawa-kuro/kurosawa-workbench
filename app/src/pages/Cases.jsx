import { cases } from '../data/cases'
import { Card, PageHeader } from '../components/ui'

export default function Cases() {
  return (
    <main className="admin-content">
      <PageHeader
        eyebrow="Cases"
        title="案件タイプ別の提供価値"
        description="経歴の羅列ではなく、「こういう案件で価値を出せる」を判断するためのページです。営業で使いやすい4タイプに絞っています。"
      />

      <section className="case-grid" aria-label="案件タイプ">
        {cases.map((item) => (
          <Card
            className="case-card"
            key={item.id}
            header={
              <header>
                <span className="admin-eyebrow">{item.id}</span>
                <h2>{item.title}</h2>
              </header>
            }
          >
            <CaseField label="課題" value={item.challenge} />
            <CaseField label="支援内容" value={item.support} />
            <CaseField label="成果" value={item.outcome} />
            <CaseField label="向いている相談" value={item.fit} />
            <div className="keyword-chips">
              {item.stack.map((tech) => <span className="keyword-chip" key={tech}>{tech}</span>)}
            </div>
          </Card>
        ))}
      </section>
    </main>
  )
}

function CaseField({ label, value }) {
  return (
    <div className="case-field">
      <strong>{label}</strong>
      <p>{value}</p>
    </div>
  )
}
