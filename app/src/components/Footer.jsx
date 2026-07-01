const LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'AI Consult', href: '/ai-consult' },
  { label: 'Career', href: '/career' },
  { label: 'Cases', href: '/cases' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">黒澤 Workbench</p>
          <p className="footer-tagline">
            GCP AI 基盤専門家 / フリーランス技術コンサルタント
            <br />
            LLM · ML · MLOps · Vertex AI · Kubernetes
          </p>
        </div>

        <nav className="footer-nav" aria-label="フッターナビゲーション">
          <p className="footer-nav-heading">リンク</p>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <div className="footer-info">
          <p className="footer-nav-heading">連絡先</p>
          <address>
            黒澤俊文
            <br />
            札幌（フルリモートのみ）
            <br />
            <a href="mailto:contact@example.com">contact@example.com</a>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 黒澤俊文. All rights reserved.</p>
      </div>
    </footer>
  )
}
