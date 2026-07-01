import { ArrowRight, Bot, BriefcaseBusiness, FileText, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { engineerProfile } from '../data/engineer-profile'
import { services } from '../data/services'
import { consultExamples } from '../data/consultExamples'

const featuredServices = services.slice(0, 3)

export default function Top() {
  return (
    <main>
      <section className="top-hero">
        <div className="top-hero-inner site-page home-hero-grid">
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Freelance AI implementation partner
            </motion.p>
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              AI導入とクラウド実装を、相談から形にする。
            </motion.h1>
            <motion.p
              className="lead hero-lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
            >
              {engineerProfile.name}は、生成AI導入、Webアプリ、GCP/AWS/Kubernetes基盤、技術顧問をリモートで支援するフリーランスエンジニアです。
              まずは依頼できる内容を見るか、自社課題に合うかAIに聞いてください。
            </motion.p>
            <motion.div
              className="cta-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              <Link to="/services" className="button primary">
                <BriefcaseBusiness size={16} aria-hidden="true" />
                依頼できる内容を見る
              </Link>
              <Link to="/ai-consult" className="button secondary">
                <Bot size={16} aria-hidden="true" />
                AIに相談する
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="axis-card-grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <Link className="axis-card" to="/career">
              <span className="axis-card-icon"><FileText size={18} aria-hidden="true" /></span>
              <span className="axis-card-kicker">見る軸</span>
              <strong>経歴・実績を見る</strong>
              <p>AWS / Kubernetes / Web / AI導入支援の経験と技術背景を確認できます。</p>
              <span className="axis-card-link">Career <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
            <Link className="axis-card axis-card--primary" to="/ai-consult">
              <span className="axis-card-icon"><Sparkles size={18} aria-hidden="true" /></span>
              <span className="axis-card-kicker">相談する軸</span>
              <strong>AIに適合性を聞く</strong>
              <p>自社課題に黒澤が合うか、自然文で確認し、問い合わせ文まで下書きできます。</p>
              <span className="axis-card-link">AI consult <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="top-section site-page">
        <div className="section-head-row">
          <div>
            <p className="section-label">Services</p>
            <h2 className="section-heading">依頼できること</h2>
          </div>
          <Link className="text-link" to="/services">すべて見る</Link>
        </div>
        <div className="preview-grid">
          {featuredServices.map((service) => (
            <article className="preview-card" key={service.id}>
              <span className="preview-card-kicker">{service.id}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="top-section site-page">
        <div className="consult-preview">
          <div>
            <p className="section-label">AI consult</p>
            <h2 className="section-heading">依頼できるか分からない状態から始められます。</h2>
            <p className="section-lead">
              技術スタックや相談内容が曖昧でも、AIが対応可能性、想定スコープ、追加質問、問い合わせ文の下書きに分解します。
            </p>
            <Link className="button primary" to="/ai-consult">
              <Bot size={16} aria-hidden="true" />
              AI相談を試す
            </Link>
          </div>
          <div className="prompt-list" aria-label="AI相談例">
            {consultExamples.map((example) => (
              <span key={example}>{example}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
