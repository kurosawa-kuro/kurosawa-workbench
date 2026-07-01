import { Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="header-logo" to="/">
          黒澤<span className="header-logo-mark"> Workbench</span>
        </Link>
        <nav className="header-nav" aria-label="サイトナビゲーション">
          <Link to="/services">サービス</Link>
          <Link to="/career">経歴</Link>
          <Link to="/cases">実績タイプ</Link>
          <Link to="/contact">問い合わせ</Link>
          <Link to="/ai-consult" className="header-nav-cta">
            <Bot size={15} aria-hidden="true" />
            AI に相談
          </Link>
        </nav>
      </div>
    </header>
  )
}
