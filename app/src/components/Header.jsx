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
          <Link to="/" className="header-nav-cta">
            <Bot size={15} aria-hidden="true" />
            AI に相談
          </Link>
        </nav>
      </div>
    </header>
  )
}
