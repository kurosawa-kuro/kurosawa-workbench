import { Bot, MapPin, Clock, Banknote, Wifi } from 'lucide-react'
import { motion } from 'motion/react'
import { engineerProfile } from '../data/engineer-profile'
import ConsultSection from '../components/ConsultSection'

const HIGH_STRENGTHS = engineerProfile.strengths.filter(s => s.strength === 'high')
const MED_STRENGTHS  = engineerProfile.strengths.filter(s => s.strength === 'medium')

export default function Top() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────── */}
      <section className="top-hero">
        <div className="top-hero-inner site-page">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            GCP AI 基盤専門家 / フリーランス技術コンサルタント
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            黒澤俊文
          </motion.h1>

          <motion.p
            className="lead hero-lead"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
          >
            {engineerProfile.summary}
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            <span className="hero-stat">
              <Banknote size={14} aria-hidden="true" />
              月 90〜130 万円
            </span>
            <span className="hero-stat">
              <Wifi size={14} aria-hidden="true" />
              フルリモート専門
            </span>
            <span className="hero-stat">
              <MapPin size={14} aria-hidden="true" />
              札幌在住
            </span>
            <span className="hero-stat">
              <Clock size={14} aria-hidden="true" />
              経験 10 年超
            </span>
          </motion.div>

          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <a href="#consult" className="button primary">
              <Bot size={16} aria-hidden="true" />
              AI に案件を相談する
            </a>
            <a href="#career" className="button secondary">実績を見る</a>
          </motion.div>
        </div>
      </section>

      {/* ── 得意領域 ─────────────────────────── */}
      <section className="top-section site-page" id="strengths">
        <p className="section-label">Expertise</p>
        <h2 className="section-heading">得意領域</h2>

        <div className="strength-grid">
          {HIGH_STRENGTHS.map((s, i) => (
            <motion.article
              key={s.area}
              className="strength-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="strength-card-header">
                <h3 className="strength-area">{s.area}</h3>
                <span className="strength-badge strength-badge--high">得意</span>
              </div>
              <p className="strength-detail">{s.detail}</p>
              <div className="keyword-chips">
                {s.keywords.slice(0, 5).map(kw => (
                  <span key={kw} className="keyword-chip">{kw}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="strength-grid strength-grid--medium">
          {MED_STRENGTHS.map((s, i) => (
            <motion.article
              key={s.area}
              className="strength-card strength-card--medium"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="strength-card-header">
                <h3 className="strength-area">{s.area}</h3>
                <span className="strength-badge strength-badge--medium">対応可</span>
              </div>
              <div className="keyword-chips">
                {s.keywords.slice(0, 4).map(kw => (
                  <span key={kw} className="keyword-chip keyword-chip--medium">{kw}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── キャリア・実績 ────────────────────── */}
      <section className="top-section site-page" id="career">
        <p className="section-label">Career</p>
        <h2 className="section-heading">主な実績・資格</h2>
        <ul className="career-list">
          {engineerProfile.credentials.map((c, i) => (
            <motion.li
              key={i}
              className="career-item"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {c}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ── AI 案件相談 ───────────────────────── */}
      <section className="top-section top-section--consult site-page" id="consult">
        <p className="section-label">
          <Bot size={14} aria-hidden="true" />
          AI 案件相談
        </p>
        <h2 className="section-heading">この案件、黒澤に<br />相談できますか？</h2>
        <p className="section-lead">
          案件概要を入力すると、対応可否・得意度・想定スコープ・問い合わせ文を AI が返します。
        </p>
        <ConsultSection />
      </section>
    </main>
  )
}
