import Script from "next/script";
import { getPublishedMotorcyclesSafe } from "../lib/motorcycles";
import {
  buildHomeJsonLd,
  buildHomeLegacySections,
  getAbsoluteImageUrl,
  getLanguageAlternates,
  getLocalizedMeta,
  resolveLanguageAsync,
} from "../lib/site";

export const revalidate = 120;

const navigationCards = [
  ["#a-propos", "01", "home.nav.about.title", "home.nav.about.body"],
  ["#stock", "02", "home.nav.stock.title", "home.nav.stock.body"],
  ["#commande", "03", "home.nav.request.title", "home.nav.request.body"],
  ["#services", "04", "home.nav.services.title", "home.nav.services.body"],
  ["#atelier", "05", "home.nav.workshop.title", "home.nav.workshop.body"],
  ["#contact", "06", "home.nav.contact.title", "home.nav.contact.body"],
];

export async function generateMetadata({ searchParams }) {
  const language = await resolveLanguageAsync(searchParams);
  const meta = getLocalizedMeta("home", language);

  return {
    title: meta.title,
    description: meta.description,
    alternates: getLanguageAlternates("/"),
    openGraph: {
      type: "website",
      siteName: "Nippon Heritage",
      locale: "fr_FR",
      url: language === "fr" ? "/" : `/?lang=${language}`,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg"),
          alt: "Honda VFR400R NC30 presentee par Nippon Heritage",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg")],
    },
  };
}

export default async function HomePage() {
  const publishedMotorcycles = await getPublishedMotorcyclesSafe();
  const jsonLd = buildHomeJsonLd(publishedMotorcycles);
  const legacySections = buildHomeLegacySections(publishedMotorcycles);

  return (
    <>
      <Script id="page-context-home" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="home";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="top-strip">
        <div className="container top-strip-inner">
          <p data-i18n="top.strip">Import selectif depuis le Japon • 2 temps & 4 temps • Atelier en France</p>
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

      <header className="site-header" id="accueil">
        <div className="container nav-shell">
          <a className="brand-plate" href="#accueil" aria-label="Nippon Heritage" data-i18n-aria-label="aria.brand">
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
            <a href="#accueil" data-i18n="nav.home">
              Accueil
            </a>
            <a href="#stock" data-i18n="nav.stock">
              Motos en stock
            </a>
            <a href="#commande" data-i18n="nav.request">
              Recherche personnalisee
            </a>
            <a href="#services" data-i18n="nav.services">
              Nos services
            </a>
            <a href="#atelier" data-i18n="nav.workshop">
              Atelier
            </a>
          </nav>

          <a className="header-cta" href="#commande" data-i18n="nav.cta">
            Faire une demande
          </a>
        </div>
      </header>

      <aside className="floating-rail" aria-label="Acces rapides" data-i18n-aria-label="aria.quickLinks">
        <a href="#stock" data-i18n="rail.stock">
          Stock
        </a>
        <a href="#commande" data-i18n="rail.request">
          Demande
        </a>
        <a href="#contact" data-i18n="rail.contact">
          Contact
        </a>
      </aside>

      <main className="home-page">
        <section className="home-landing">
          <div className="home-landing-backdrop"></div>
          <div className="home-landing-glow home-landing-glow-left"></div>
          <div className="home-landing-glow home-landing-glow-right"></div>
          <div className="container home-landing-layout">
            <div className="home-landing-copy home-surface">
              <p className="kicker" data-i18n="hero.kicker">
                Nippon Heritage • Sportives japonaises de collection
              </p>
              <img
                className="home-landing-logo"
                src="/assets/images/nippon-heritage-logo.png"
                alt="Logo Nippon Heritage"
                data-i18n-alt="common.logoAlt"
                width="1285"
                height="637"
                decoding="async"
              />
              <h1 data-i18n="hero.title">Motos japonaises rares, selectionnees avec exigence.</h1>
              <div className="accent-line" aria-hidden="true"></div>
              <p className="hero-text" data-i18n="hero.body">
                Nippon Heritage selectionne, importe et valorise des motos japonaises anciennes, rares et emblematiques.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#en-savoir-plus" data-i18n="hero.ctaPrimary">
                  En savoir plus
                </a>
                <a className="button button-secondary" href="#stock" data-i18n="hero.ctaSecondary">
                  Voir les motos
                </a>
              </div>
            </div>

            <div className="home-landing-stack">
              <article className="home-depth-card">
                <span>01</span>
                <strong data-i18n="hero.card1.title">Selection au Japon</strong>
                <p data-i18n="hero.card1.body">
                  Nous visons des motos coherentes, propres et interessantes pour la collection.
                </p>
              </article>
              <article className="home-depth-card">
                <span>02</span>
                <strong data-i18n="hero.card2.title">Passage atelier</strong>
                <p data-i18n="hero.card2.body">
                  Controle, remise en etat et presentation avant la mise en vente en France.
                </p>
              </article>
              <article className="home-depth-card">
                <span>03</span>
                <strong data-i18n="hero.card3.title">Positionnement clair</strong>
                <p data-i18n="hero.card3.body">
                  Import, remise en etat, vente. Aucune rubrique homologation n'est proposee.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="container section-band-inner">
            <span data-i18n="band.item1">Import de sportives japonaises</span>
            <span data-i18n="band.item2">2 temps & 4 temps</span>
            <span data-i18n="band.item3">Japon</span>
            <span data-i18n="band.item4">Faible kilometrage privilegie</span>
            <span data-i18n="band.item5">Atelier en France</span>
            <span data-i18n="band.item6">Selection rigoureuse</span>
          </div>
        </section>

        <section className="home-overview" id="en-savoir-plus">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker" data-i18n="home.nav.kicker">
                En savoir plus
              </p>
              <h2 data-i18n="home.nav.title">Une entree plus claire, plus nette et plus premium dans le meme esprit.</h2>
              <div className="accent-line" aria-hidden="true"></div>
              <p data-i18n="home.nav.body">
                Retrouvez rapidement les sections importantes du site sans perdre l'ambiance atelier et collection de
                Nippon Heritage.
              </p>
            </div>

            <div className="home-nav-grid">
              {navigationCards.map(([href, index, titleKey, bodyKey]) => (
                <a key={href} className="home-nav-card" href={href}>
                  <span className="home-nav-index">{index}</span>
                  <h3 data-i18n={titleKey}>Titre</h3>
                  <p data-i18n={bodyKey}>Description</p>
                  <strong data-i18n="common.viewMore">Voir plus</strong>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-about" id="a-propos">
          <div className="container">
            <div className="home-about-panel home-surface">
              <div className="home-about-copy">
                <p className="section-kicker" data-i18n="home.about.kicker">
                  A propos
                </p>
                <h2 data-i18n="home.about.title">
                  Une approche selective, pensee pour des motos qui meritent mieux qu'un simple import.
                </h2>
                <div className="accent-line" aria-hidden="true"></div>
                <p className="hero-text" data-i18n="home.about.body">
                  Nippon Heritage selectionne, importe et valorise des motos japonaises anciennes, rares et emblematiques.
                </p>
              </div>

              <div className="home-about-aside">
                <article className="home-about-card">
                  <strong data-i18n="home.about.card1.title">Bases choisies avec exigence</strong>
                  <p data-i18n="home.about.card1.body">
                    Les motos retenues privilegient la coherence d'ensemble, la desirabilite et un historique lisible.
                  </p>
                </article>
                <article className="home-about-card">
                  <strong data-i18n="home.about.card2.title">Presentation atelier avant diffusion</strong>
                  <p data-i18n="home.about.card2.body">
                    Chaque machine passe par une remise en etat adaptee avant sa mise en vente en France.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: legacySections }} />

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker" data-i18n="home.contact.kicker">
                Contact
              </p>
              <h2 data-i18n="home.contact.title">Echangez avec Nippon Heritage au sujet d'une moto ou d'une recherche ciblee.</h2>
              <div className="accent-line" aria-hidden="true"></div>
              <p data-i18n="home.contact.body">
                Pour un modele precis, une demande d'approvisionnement ou un premier echange, le formulaire et l'email
                direct restent les deux acces les plus simples.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#commande" data-i18n="nav.cta">
                  Faire une demande
                </a>
                <a className="button button-secondary" href="mailto:frostyhem@gmail.com">
                  frostyhem@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-panels">
              <article>
                <strong data-i18n="home.contact.panel1.title">Recherche personnalisee</strong>
                <p data-i18n="home.contact.panel1.body">
                  Indiquez le modele souhaite, votre budget et le niveau d'exigence attendu pour la selection.
                </p>
              </article>
              <article>
                <strong data-i18n="home.contact.panel2.title">Motos en vente</strong>
                <p data-i18n="home.contact.panel2.body">
                  Les motos publiees peuvent etre completees par des recherches en cours ou des arrivages a venir.
                </p>
              </article>
              <article>
                <strong data-i18n="home.contact.panel3.title">Atelier et presentation</strong>
                <p data-i18n="home.contact.panel3.body">
                  La mise en vente s'appuie sur une preparation claire, une presentation serieuse et un echange direct.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

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

      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
