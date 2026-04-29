import Script from "next/script";
import { buildThanksJsonLd, getAbsoluteImageUrl, getLanguageAlternates, getLocalizedMeta, resolveLanguageAsync } from "../../lib/site";
import { PublicShell } from "../../components/public-ui";

export const revalidate = 3600;

export async function generateMetadata({ searchParams }) {
  const language = await resolveLanguageAsync(searchParams);
  const meta = getLocalizedMeta("thanks", language);

  return {
    title: meta.title,
    description: meta.description,
    alternates: getLanguageAlternates("/merci"),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: "Nippon Heritage",
      locale: "fr_FR",
      url: language === "fr" ? "/merci" : `/merci?lang=${language}`,
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

export default function MerciPage() {
  const jsonLd = buildThanksJsonLd();

  return (
    <>
      <Script id="page-context-thanks" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="thanks";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublicShell activePath="/" showRail={false}>
        <main className="thank-you-page">
          <section className="search-section">
            <div className="container">
              <div className="section-heading centered on-dark">
                <p className="section-kicker" data-i18n="thanks.kicker">
                  Message envoyé
                </p>
                <h1 data-i18n="thanks.title">Merci, votre demande a bien été transmise.</h1>
                <div className="accent-line" aria-hidden="true"></div>
                <p data-i18n="thanks.body">
                  Nous revenons vers vous sur l’e-mail indiqué dès que possible. Vous pouvez maintenant retourner au site principal.
                </p>
                <a className="button button-primary" href="/" data-home-link data-i18n="thanks.cta">
                  Revenir à l’accueil
                </a>
              </div>
            </div>
          </section>
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
