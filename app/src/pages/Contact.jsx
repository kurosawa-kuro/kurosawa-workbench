import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const CONTACT_EMAIL = 'contact@example.com'

export default function Contact() {
  return (
    <main className="site-page page-stack">
      <section className="page-heading">
        <p className="section-label">Contact</p>
        <h1>問い合わせ・業務委託相談</h1>
        <p className="lead">
          まずAI相談で問い合わせ文を下書きし、内容を整理してから送る流れを推奨しています。
          直接連絡する場合は、下記の項目を含めると初回返信がスムーズです。
        </p>
        <div className="cta-row">
          <Link className="button secondary" to="/ai-consult">AI相談で下書きする</Link>
          <a className="button primary" href={`mailto:${CONTACT_EMAIL}`}>
            <Mail size={16} aria-hidden="true" />
            メールで相談する
          </a>
        </div>
      </section>

      <section className="contact-panel">
        <h2>含めてほしい情報</h2>
        <ul>
          <li>会社名</li>
          <li>氏名</li>
          <li>メール</li>
          <li>相談内容</li>
          <li>希望する支援内容</li>
          <li>稼働開始時期</li>
        </ul>
      </section>
    </main>
  )
}
