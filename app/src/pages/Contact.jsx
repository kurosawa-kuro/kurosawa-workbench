import { Bot, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, PageHeader } from '../components/ui'

const CONTACT_EMAIL = 'contact@example.com'

export default function Contact() {
  return (
    <main className="admin-content contact-page">
      <PageHeader
        eyebrow="Contact"
        title="問い合わせ・業務委託相談"
        description="まずAI相談で問い合わせ文を下書きし、内容を整理してから送る流れを推奨しています。直接連絡する場合は、下記の項目を含めると初回返信がスムーズです。"
        actions={
          <>
            <Link className="button secondary" to="/ai-consult"><Bot size={16} /> AI相談で下書きする</Link>
            <a className="button primary" href={`mailto:${CONTACT_EMAIL}`}><Mail size={16} /> メールで相談する</a>
          </>
        }
      />

      <Card
        className="contact-panel"
        header={<header><span className="admin-eyebrow">Inquiry checklist</span><h2>含めてほしい情報</h2></header>}
      >
        <ul className="contact-checklist">
          {['会社名', '氏名', 'メール', '相談内容', '希望する支援内容', '稼働開始時期'].map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
          ))}
        </ul>
      </Card>
    </main>
  )
}
