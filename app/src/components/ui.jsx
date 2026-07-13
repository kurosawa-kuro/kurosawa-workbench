export function PageHeader({ eyebrow, title, description, actions, meta, children }) {
  return (
    <header className="page-header">
      <div className="page-header__copy">
        <span className="admin-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p className="page-header__lead">{description}</p>}
        {children}
      </div>
      {(actions || meta) && (
        <div className="page-header__aside">
          {meta}
          {actions && <div className="admin-actions">{actions}</div>}
        </div>
      )}
    </header>
  )
}

export function SectionHeader({ eyebrow, title, action, count }) {
  return (
    <header className="admin-section-heading">
      <div>
        {eyebrow && <span className="admin-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action ?? (count && <span className="admin-badge">{count}</span>)}
    </header>
  )
}

export function Card({ as: Component = 'article', className = '', header, children }) {
  return (
    <Component className={`admin-card ${className}`.trim()}>
      {header}
      <div className="admin-card__body">{children}</div>
    </Component>
  )
}

export function Badge({ tone = 'neutral', children, className = '' }) {
  return (
    <span className={`admin-badge admin-badge--${tone} ${className}`.trim()}>
      {children}
    </span>
  )
}
