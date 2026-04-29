import Script from "next/script";
import { buildHomeJsonLd, getAbsoluteImageUrl, getLanguageAlternates, getLocalizedMeta, resolveLanguageAsync } from "../lib/site";
import { PublicShell } from "../components/public-ui";

export const revalidate = 120;

const navigationCards = [
  {
    href: "/a-propos",
    index: "01",
    titleKey: "home.nav.about.title",
    title: "À propos",
    bodyKey: "home.nav.about.body",
    body: "Découvrir l’approche, la sélection et le positionnement Nippon Heritage.",
  },
  {
    href: "/motos-disponibles",
    index: "02",
    titleKey: "home.nav.stock.title",
    title: "Motos disponibles",
    bodyKey: "home.nav.stock.body",
    body: "Voir les modèles en vente et les références actuellement proposées.",
  },
  {
    href: "/recherche-personnalisee",
    index: "03",
    titleKey: "home.nav.request.title",
    title: "Recherche personnalisée",
    bodyKey: "home.nav.request.body",
    body: "Confier une recherche ciblée au Japon selon vos critères et votre budget.",
  },
  {
    href: "/services",
    index: "04",
    titleKey: "home.nav.services.title",
    title: "Services",
    bodyKey: "home.nav.services.body",
    body: "Retrouver l’import, la préparation atelier, la présentation et la vente.",
  },
  {
    href: "/atelier-restauration",
    index: "05",
    titleKey: "home.nav.workshop.title",
    title: "Atelier / restauration",
    bodyKey: "home.nav.workshop.body",
    body: "Comprendre la méthode, le contrôle et la remise en état avant diffusion.",
  },
  {
    href: "/contact",
    index: "06",
    titleKey: "home.nav.contact.title",
    title: "Contact",
    bodyKey: "home.nav.contact.body",
    body: "Échanger directement au sujet d’un modèle, d’un arrivage ou d’une demande.",
  },
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
          alt: "Honda VFR400R NC30 présentée par Nippon Heritage",
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

export default function HomePage() {
  const jsonLd = buildHomeJsonLd([]);

  return (
    <>
      <Script id="page-context-home" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="home";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PublicShell activePath="/" showRail={false}>
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
                <h1 data-i18n="hero.title">Motos japonaises rares, sélectionnées avec exigence.</h1>
                <div className="accent-line" aria-hidden="true"></div>
                <p className="hero-text" data-i18n="hero.body">
                  Nippon Heritage sélectionne, importe et valorise des motos japonaises anciennes, rares et emblématiques.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#en-savoir-plus" data-i18n="hero.ctaPrimary">
                    En savoir plus
                  </a>
                  <a className="button button-secondary" href="/motos-disponibles" data-i18n="hero.ctaSecondary">
                    Voir les motos
                  </a>
                </div>
              </div>

              <div className="home-landing-stack">
                <article className="home-depth-card">
                  <span>01</span>
                  <strong data-i18n="hero.card1.title">Sélection au Japon</strong>
                  <p data-i18n="hero.card1.body">Nous visons des motos cohérentes, propres et intéressantes pour la collection.</p>
                </article>
                <article className="home-depth-card">
                  <span>02</span>
                  <strong data-i18n="hero.card2.title">Passage atelier</strong>
                  <p data-i18n="hero.card2.body">Contrôle, remise en état et présentation avant la mise en vente en France.</p>
                </article>
                <article className="home-depth-card">
                  <span>03</span>
                  <strong data-i18n="hero.card3.title">Positionnement clair</strong>
                  <p data-i18n="hero.card3.body">Import, remise en état, vente. Aucune rubrique homologation n’est proposée.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section-band">
            <div className="container section-band-inner">
              <span data-i18n="band.item1">Import de sportives japonaises</span>
              <span data-i18n="band.item2">2 temps & 4 temps</span>
              <span data-i18n="band.item3">Japon</span>
              <span data-i18n="band.item4">Faible kilométrage privilégié</span>
              <span data-i18n="band.item5">Atelier en France</span>
              <span data-i18n="band.item6">Sélection rigoureuse</span>
            </div>
          </section>

          <section className="home-overview" id="en-savoir-plus">
            <div className="container">
              <div className="section-heading centered">
                <p className="section-kicker" data-i18n="home.nav.kicker">
                  En savoir plus
                </p>
                <h2 data-i18n="home.nav.title">Une entrée claire, directe et premium vers les pages du site.</h2>
                <div className="accent-line" aria-hidden="true"></div>
                <p data-i18n="home.nav.body">
                  L’accueil reste volontairement court et met désormais l’accent sur les accès vers les pages utiles :
                  stock, demande, services, atelier, contact et présentation.
                </p>
              </div>

              <div className="home-nav-grid">
                {navigationCards.map((card) => (
                  <a key={card.href} className="home-nav-card" href={card.href}>
                    <span className="home-nav-index">{card.index}</span>
                    <h3 data-i18n={card.titleKey}>{card.title}</h3>
                    <p data-i18n={card.bodyKey}>{card.body}</p>
                    <strong data-i18n="common.viewMore">Voir plus</strong>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PublicShell>

      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
