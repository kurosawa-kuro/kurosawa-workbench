const LINKS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'X (Twitter)', href: 'https://x.com/' },
  { label: 'Wantedly', href: 'https://www.wantedly.com/' },
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
            Vertex AI Pipelines · BigQuery · MLOps · Kubernetes
          </p>
        </div>

        <nav className="footer-nav" aria-label="フッターナビゲーション">
          <p className="footer-nav-heading">リンク</p>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
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
