import { Banknote, Clock, MapPin, Wifi } from 'lucide-react'
import { motion } from 'motion/react'
import { engineerProfile } from '../data/engineer-profile'

const HIGH_STRENGTHS = engineerProfile.strengths.filter((s) => s.strength === 'high')
const MED_STRENGTHS = engineerProfile.strengths.filter((s) => s.strength === 'medium')

const STATS = [
  { key: 'REMOTE', label: 'フルリモート専門', icon: Wifi },
  { key: 'BASE', label: '札幌在住', icon: MapPin },
  { key: 'RATE', label: '月 90〜130 万円', icon: Banknote },
  { key: 'EXP', label: '経験 10 年超', icon: Clock },
]

const pad2 = (n) => String(n + 1).padStart(2, '0')

export default function Career() {
  return (
    <main>
      <section className="top-hero">
        <div className="top-hero-inner site-page">
          <p className="eyebrow">Career</p>
          <h1 className="hero-name">黒澤俊文</h1>
          <p className="lead hero-lead">{engineerProfile.summary}</p>
          <div className="hero-stats">
            {STATS.map(({ key, label, icon: Icon }) => (
              <span key={key} className="hero-stat">
                <span className="hero-stat-key">
                  <Icon size={13} aria-hidden="true" />
                  {key}
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="top-section site-page" id="strengths">
        <div className="section-head-row">
          <div>
            <p className="section-label">Capabilities</p>
            <h2 className="section-heading">得意領域</h2>
          </div>
          <span className="section-count">
            {String(HIGH_STRENGTHS.length).padStart(2, '0')} high ·{' '}
            {String(MED_STRENGTHS.length).padStart(2, '0')} medium
          </span>
        </div>

        <div className="strength-grid">
          {HIGH_STRENGTHS.map((s, i) => (
            <StrengthCard key={s.area} strength={s} index={i} />
          ))}
        </div>

        <div className="strength-grid strength-grid--medium">
          {MED_STRENGTHS.map((s) => (
            <article key={s.area} className="strength-card strength-card--medium">
              <div className="strength-card-header">
                <h3 className="strength-area">{s.area}</h3>
                <span className="strength-badge strength-badge--medium">medium</span>
              </div>
              <div className="keyword-chips">
                {s.keywords.slice(0, 4).map((kw) => <span key={kw} className="keyword-chip">{kw}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="top-section site-page" id="career">
        <p className="section-label">Track record</p>
        <h2 className="section-heading">主な実績・資格</h2>
        <ul className="career-list">
          {engineerProfile.credentials.map((c, i) => (
            <motion.li
              key={c}
              className="career-item"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span className="career-index">{pad2(i)}</span>
              <span>{c}</span>
            </motion.li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function StrengthCard({ strength, index }) {
  return (
    <motion.article
      className="strength-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <span className="strength-id">cap.{pad2(index)}</span>
      <div className="strength-card-header">
        <h3 className="strength-area">{strength.area}</h3>
        <span className="strength-badge strength-badge--high">high</span>
      </div>
      <p className="strength-detail">{strength.detail}</p>
      <div className="keyword-chips">
        {strength.keywords.slice(0, 5).map((kw) => <span key={kw} className="keyword-chip">{kw}</span>)}
      </div>
    </motion.article>
  )
}
