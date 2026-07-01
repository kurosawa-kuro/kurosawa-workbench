import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
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
            <div className="service-card-head">
              <span className="service-id">{service.id}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
            </div>
            <div className="service-detail-grid">
              <ServiceBlock title="対象の困りごと" items={[service.pain]} />
              <ServiceBlock title="提供できること" items={service.deliverables} />
              <ServiceBlock title="向いている案件" items={service.goodFit} icon="ok" />
              <ServiceBlock title="向いていない案件" items={service.badFit} icon="ng" />
              <ServiceBlock title="相談時に必要な情報" items={service.requiredInfo} />
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

function ServiceBlock({ title, items, icon }) {
  return (
    <section className="service-block">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            {icon === 'ok' && <CheckCircle2 size={14} aria-hidden="true" />}
            {icon === 'ng' && <XCircle size={14} aria-hidden="true" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
