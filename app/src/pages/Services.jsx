import { AlertCircle, ArrowRight, CheckCircle2, ClipboardList, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services, serviceHighlights } from '../data/services'

export default function Services() {
  return (
    <main className="site-page page-stack">
      <section className="page-heading">
        <p className="section-label">Services</p>
        <h1>依頼できる内容</h1>
        <p className="lead">
          発注者が最初に知りたいのは、職務経歴の細部より「何を頼めるか」です。
          黒澤 Workbench では、依頼メニューを困りごと・提供内容・向き不向きで整理しています。
        </p>
        <div className="highlight-row">
          {serviceHighlights.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="service-list" aria-label="依頼メニュー">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-card-top">
              <div className="service-card-main">
                <div className="service-card-head">
                  <span className="service-id">{service.id}</span>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                </div>
                <section className="service-pain-panel">
                  <div className="service-panel-title">
                    <AlertCircle size={17} aria-hidden="true" />
                    <h3>対象の困りごと</h3>
                  </div>
                  <p>{service.pain}</p>
                </section>
              </div>
              <section className="service-prep-panel">
                <div className="service-panel-title">
                  <ClipboardList size={17} aria-hidden="true" />
                  <h3>相談時に必要な情報</h3>
                </div>
                <PrepList items={service.requiredInfo} />
              </section>
            </div>

            <div className="service-flow-grid">
              <section className="service-support-panel">
                <h3>提供できること</h3>
                <SupportList items={service.deliverables} />
              </section>
              <div className="service-fit-pair">
                <FitList title="向いている案件" items={service.goodFit} tone="good" />
                <FitList title="向いていない案件" items={service.badFit} tone="bad" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="next-action-panel">
        <div>
          <p className="section-label">Next step</p>
          <h2>自社課題に合うか迷う場合は、AI相談で整理できます。</h2>
        </div>
        <Link className="button primary" to="/ai-consult">
          AIに聞く
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}

function SupportList({ items }) {
  return (
    <ol className="service-support-list">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          {item}
        </li>
      ))}
    </ol>
  )
}

function FitList({ title, items, tone }) {
  const Icon = tone === 'good' ? CheckCircle2 : XCircle

  return (
    <section className={`service-fit-panel is-${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon size={15} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PrepList({ items }) {
  return (
    <ul className="service-prep-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
