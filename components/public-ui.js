const navLinks = [
  { href: "/", key: "nav.home", label: "Accueil" },
  { href: "/motos-disponibles", key: "nav.stock", label: "Motos disponibles" },
  { href: "/recherche-personnalisee", key: "nav.request", label: "Recherche personnalisée" },
  { href: "/services", key: "nav.services", label: "Services" },
  { href: "/atelier-restauration", key: "nav.workshop", label: "Atelier" },
  { href: "/contact", key: "nav.contact", label: "Contact" },
];

const railLinks = [
  { href: "/motos-disponibles", key: "rail.stock", label: "Motos" },
  { href: "/recherche-personnalisee", key: "rail.request", label: "Demande" },
  { href: "/contact", key: "rail.contact", label: "Contact" },
];

export function PublicShell({ children, activePath = "/", showRail = true }) {
  return (
    <>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <p data-i18n="top.strip">Import sélectif depuis le Japon • 2 temps & 4 temps • Atelier en France</p>
          <div className="lang-switch" aria-label="Langues disponibles" data-i18n-aria-label="aria.langSwitch">
            <button className="is-active" type="button" data-lang="fr" aria-pressed="true">
              FR
            </button>
            <button type="button" data-lang="en" aria-pressed="false">
              EN
            </button>
            <button type="button" data-lang="es" aria-pressed="false">
              ES
            </button>
            <button type="button" data-lang="it" aria-pressed="false">
              IT
            </button>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand-plate" href="/" aria-label="Nippon Heritage" data-i18n-aria-label="aria.brand">
            <img
              src="/assets/images/nippon-heritage-logo.png"
              alt="Logo Nippon Heritage"
              data-i18n-alt="common.logoAlt"
              width="1285"
              height="637"
              decoding="async"
            />
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="site-nav"
            aria-label="Ouvrir le menu"
            data-i18n-aria-label="aria.openMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="site-nav" id="site-nav" aria-label="Navigation principale" data-i18n-aria-label="aria.primaryNav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-i18n={link.key}
                aria-current={activePath === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a className="header-cta" href="/recherche-personnalisee" data-i18n="nav.cta">
            Faire une demande
          </a>
        </div>
      </header>

      {showRail ? (
        <aside className="floating-rail" aria-label="Accès rapides" data-i18n-aria-label="aria.quickLinks">
          {railLinks.map((link) => (
            <a key={link.href} href={link.href} data-i18n={link.key}>
              {link.label}
            </a>
          ))}
        </aside>
      ) : null}

      {children}

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img
              src="/assets/images/nippon-heritage-logo.png"
              alt="Logo Nippon Heritage"
              data-i18n-alt="common.logoAlt"
              width="1285"
              height="637"
              loading="lazy"
              decoding="async"
            />
            <p data-i18n="footer.brand">Nippon Heritage • Import de motos japonaises 2 temps et 4 temps de collection.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function PageLead({ kicker, kickerKey, title, body, bodyKey }) {
  return (
    <div className="section-heading centered on-dark">
      <p className="section-kicker" data-i18n={kickerKey}>
        {kicker}
      </p>
      <h1>{title}</h1>
      <div className="accent-line" aria-hidden="true"></div>
      <p data-i18n={bodyKey}>{body}</p>
    </div>
  );
}
