import {
  Bot,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Home,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_GROUPS = [
  {
    label: 'Workbench',
    items: [
      { to: '/', label: '概要', icon: Home, end: true },
      { to: '/services', label: '依頼できる内容', icon: BriefcaseBusiness },
      { to: '/ai-consult', label: 'AI に相談', icon: Bot },
    ],
  },
  {
    label: 'Profile',
    items: [
      { to: '/career', label: '経歴・技術背景', icon: FileText },
      { to: '/cases', label: '案件タイプ', icon: FolderKanban },
      { to: '/contact', label: '問い合わせ', icon: Mail },
    ],
  },
]

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    document.body.dataset.sidebarOpen = String(sidebarOpen)
    return () => delete document.body.dataset.sidebarOpen
  }, [sidebarOpen])

  return (
    <div className="admin-shell">
      <button
        className="admin-mobile-toggle secondary"
        type="button"
        aria-label="メニューを開く"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={18} aria-hidden="true" />
        メニュー
      </button>
      <button
        className="admin-sidebar-backdrop"
        type="button"
        aria-label="メニューを閉じる"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className="admin-sidebar" aria-label="サイトメニュー">
        <div className="admin-sidebar__inner">
          <div className="admin-brand">
            <Link className="admin-brand__link" to="/" aria-label="黒澤 Workbench ホーム">
              <span className="admin-brand__mark">K</span>
              <span>
                <strong>黒澤 Workbench</strong>
                <small>AI implementation partner</small>
              </span>
            </Link>
            <button
              className="admin-sidebar__close secondary"
              type="button"
              aria-label="メニューを閉じる"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="admin-nav" aria-label="メインナビゲーション">
            {NAV_GROUPS.map((group) => (
              <section className="admin-nav__group" key={group.label}>
                <p className="admin-nav__label">{group.label}</p>
                <ul>
                  {group.items.map(({ to, label, icon: Icon, end }) => (
                    <li key={to}>
                      <NavLink
                        className="admin-nav-item"
                        to={to}
                        end={end}
                      >
                        <Icon size={17} aria-hidden="true" />
                        <span>{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>

          <article className="admin-card admin-sidebar__status">
            <div className="admin-card__body">
              <span className="admin-eyebrow">Availability</span>
              <strong>フルリモートで相談受付中</strong>
              <p>生成AI・クラウド基盤・Web実装を、要件整理から支援します。</p>
              <Link className="admin-badge admin-badge--lime" to="/contact">
                問い合わせへ
              </Link>
            </div>
          </article>
        </div>
      </aside>

      <div className="admin-main">
        {children}
        <footer className="admin-footer">
          <p>© 2026 黒澤俊文</p>
          <p>札幌 / フルリモート専門</p>
        </footer>
      </div>
    </div>
  )
}
