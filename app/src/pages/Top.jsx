import { ArrowRight, Bot, BriefcaseBusiness, FileText, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { engineerProfile } from '../data/engineer-profile'
import { services } from '../data/services'
import { consultExamples } from '../data/consultExamples'
import { Card, PageHeader, SectionHeader } from '../components/ui'

const featuredServices = services.slice(0, 3)

export default function Top() {
  return (
    <main className="admin-content">
      <section className="admin-hero home-hero">
        <PageHeader
          eyebrow="Freelance AI implementation partner"
          title="AI導入とクラウド実装を、相談から形にする。"
          description={`${engineerProfile.name}は、生成AI導入、Webアプリ、GCP/AWS/Kubernetes基盤、技術顧問をリモートで支援するフリーランスエンジニアです。まずは依頼できる内容を見るか、自社課題に合うかAIに聞いてください。`}
          actions={
            <>
              <Link to="/services" className="button primary">
                <BriefcaseBusiness size={17} aria-hidden="true" />
                依頼できる内容を見る
              </Link>
              <Link to="/ai-consult" className="button secondary">
                <Bot size={17} aria-hidden="true" />
                AIに相談する
              </Link>
            </>
          }
        />

        <div className="axis-card-grid">
          <Link className="axis-card" to="/career">
            <span className="axis-card-icon"><FileText size={19} aria-hidden="true" /></span>
            <span className="admin-eyebrow">見る軸</span>
            <strong>経歴・実績を見る</strong>
            <p>AWS / Kubernetes / Web / AI導入支援の経験と技術背景を確認できます。</p>
            <span className="axis-card-link">Career <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
          <Link className="axis-card axis-card--primary" to="/ai-consult">
            <span className="axis-card-icon"><Sparkles size={19} aria-hidden="true" /></span>
            <span className="admin-eyebrow">相談する軸</span>
            <strong>AIに適合性を聞く</strong>
            <p>自社課題に黒澤が合うか、自然文で確認し、問い合わせ文まで下書きできます。</p>
            <span className="axis-card-link">AI consult <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Services"
          title="依頼できること"
          action={<Link className="text-link" to="/services">すべて見る <ArrowRight size={14} /></Link>}
        />
        <div className="admin-grid admin-grid--3">
          {featuredServices.map((service) => (
            <Card className="preview-card" key={service.id}>
              <span className="admin-eyebrow">{service.id}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="consult-preview">
        <div className="consult-preview__copy">
          <span className="admin-eyebrow">AI consult</span>
          <h2>依頼できるか分からない状態から始められます。</h2>
          <p>
            技術スタックや相談内容が曖昧でも、AIが対応可能性、想定スコープ、追加質問、問い合わせ文の下書きに分解します。
          </p>
          <Link className="button primary" to="/ai-consult">
            <Bot size={16} aria-hidden="true" />
            AI相談を試す
          </Link>
        </div>
        <div className="prompt-list" aria-label="AI相談例">
          {consultExamples.map((example) => <span key={example}>{example}</span>)}
        </div>
      </Card>
    </main>
  )
}
