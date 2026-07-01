import { cases } from '../data/cases'

export default function Cases() {
  return (
    <main className="site-page page-stack">
      <section className="page-heading">
        <p className="section-label">Cases</p>
        <h1>案件タイプ別の提供価値</h1>
        <p className="lead">
          `/career` は黒澤の背景、`/cases` は「こういう案件で価値を出せる」を判断するためのページです。
          最初は営業で使いやすい4タイプに絞っています。
        </p>
      </section>

      <section className="case-grid" aria-label="案件タイプ">
        {cases.map((item) => (
          <article className="case-card" key={item.id}>
            <span className="service-id">{item.id}</span>
            <h2>{item.title}</h2>
            <CaseField label="課題" value={item.challenge} />
            <CaseField label="支援内容" value={item.support} />
            <CaseField label="成果" value={item.outcome} />
            <CaseField label="向いている相談" value={item.fit} />
            <div className="keyword-chips">
              {item.stack.map((tech) => <span className="keyword-chip" key={tech}>{tech}</span>)}
            </div>
          </article>
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
