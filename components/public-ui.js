const navLinks = [
  { href: "/", key: "nav.home", label: "Accueil" },
  { href: "/motos-disponibles", key: "nav.stock", label: "Motos disponibles" },
  { href: "/recherche-personnalisee", key: "nav.request", label: "Recherche personnalisée" },
  { href: "/services", key: "nav.services", label: "Services" },
  { href: "/atelier-restauration", key: "nav.workshop", label: "Atelier / restauration" },
  { href: "/a-propos", key: "home.nav.about.title", label: "À propos" },
  { href: "/contact", key: "nav.contact", label: "Contact" },
];

const quickLinks = [
  { href: "/motos-disponibles", key: "nav.stock", label: "Motos disponibles" },
  { href: "/recherche-personnalisee", key: "nav.request", label: "Recherche personnalisée" },
  { href: "/contact", key: "nav.contact", label: "Contact" },
];

const footerNavigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/motos-disponibles", label: "Motos disponibles" },
  { href: "/recherche-personnalisee", label: "Recherche personnalisée" },
  { href: "/services", label: "Services" },
  { href: "/atelier-restauration", label: "Atelier / restauration" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const footerAccessLinks = [
  { href: "/motos-disponibles", label: "Voir le stock" },
  { href: "/recherche-personnalisee", label: "Faire une demande" },
  { href: "mailto:frostyhem@gmail.com", label: "frostyhem@gmail.com" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/politique-cookies", label: "Politique de cookies" },
];

export function PublicShell({ children, activePath = "/", showRail = false }) {
  return (
    <div className="site-frame">
      <div className="site-background" aria-hidden="true">
        <div className="site-background-grid"></div>
        <div className="site-background-lines"></div>
        <div className="site-background-focus"></div>
        <div className="site-background-glow site-background-glow-left"></div>
        <div className="site-background-glow site-background-glow-right"></div>
      </div>

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
        <div className="container">
          <div className="nav-shell">
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
        </div>
      </header>

      {showRail ? (
        <aside className="floating-rail" aria-label="Accès rapides" data-i18n-aria-label="aria.quickLinks">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} data-i18n={link.key}>
              {link.label}
            </a>
          ))}
        </aside>
      ) : null}

      <div className="site-content">{children}</div>

      <footer className="site-footer">
        <div className="container footer-panel">
          <div className="footer-top">
            <div className="footer-brand-block">
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
              </div>
              <p data-i18n="footer.brand">
                Nippon Heritage • Import de motos japonaises 2 temps et 4 temps de collection.
              </p>
            </div>

            <div className="footer-links-block">
              <strong>Navigation</strong>
              <div className="footer-links-list">
                {footerNavigationLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-block">
              <strong>Accès directs</strong>
              <div className="footer-links-list">
                {footerAccessLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links-block">
              <strong>Cadre public</strong>
              <div className="footer-links-list">
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p>© {new Date().getFullYear()} Nippon Heritage. Tous droits réservés.</p>
            <div className="footer-legal-links">
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
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
