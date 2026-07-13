import { Banknote, Clock, MapPin, Wifi } from 'lucide-react'
import { motion } from 'motion/react'
import { engineerProfile } from '../data/engineer-profile'
import { Badge, Card, PageHeader, SectionHeader } from '../components/ui'

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
    <main className="admin-content">
      <section className="admin-hero career-hero">
        <PageHeader
          eyebrow="Career"
          title="黒澤俊文"
          description={engineerProfile.summary}
        >
          <div className="hero-stats">
            {STATS.map(({ key, label, icon: Icon }) => (
              <span key={key} className="hero-stat">
                <span className="hero-stat-key"><Icon size={14} aria-hidden="true" />{key}</span>
                {label}
              </span>
            ))}
          </div>
        </PageHeader>
      </section>

      <section>
        <SectionHeader
          eyebrow="Capabilities"
          title="得意領域"
          count={`${String(HIGH_STRENGTHS.length).padStart(2, '0')} high · ${String(MED_STRENGTHS.length).padStart(2, '0')} medium`}
        />
        <div className="strength-grid">
          {HIGH_STRENGTHS.map((strength, index) => (
            <StrengthCard key={strength.area} strength={strength} index={index} />
          ))}
        </div>
        <div className="strength-grid strength-grid--medium">
          {MED_STRENGTHS.map((strength) => (
            <Card key={strength.area} className="strength-card strength-card--medium">
              <div className="strength-card-header">
                <h3>{strength.area}</h3>
                <Badge>medium</Badge>
              </div>
              <div className="keyword-chips">
                {strength.keywords.slice(0, 4).map((keyword) => <span key={keyword} className="keyword-chip">{keyword}</span>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card
        as="section"
        className="career-card"
        header={<SectionHeader eyebrow="Track record" title="主な実績・資格" />}
      >
        <ul className="career-list">
          {engineerProfile.credentials.map((credential, index) => (
            <motion.li
              key={credential}
              className="career-item"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="career-index">{pad2(index)}</span>
              <span>{credential}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </main>
  )
}

function StrengthCard({ strength, index }) {
  return (
    <motion.article
      className="admin-card strength-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <div className="admin-card__body">
        <span className="admin-eyebrow">cap.{pad2(index)}</span>
        <div className="strength-card-header">
          <h3>{strength.area}</h3>
          <Badge tone="lime">high</Badge>
        </div>
        <p>{strength.detail}</p>
        <div className="keyword-chips">
          {strength.keywords.slice(0, 5).map((keyword) => <span key={keyword} className="keyword-chip">{keyword}</span>)}
        </div>
      </div>
    </motion.article>
  )
}
