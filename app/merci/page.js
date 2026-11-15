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
      <div
        className="notice-modal"
        id="project-notice-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-notice-title"
        aria-describedby="project-notice-copy"
        aria-hidden="true"
      >
        <div className="notice-modal__backdrop" data-notice-close />
        <section className="notice-modal__panel">
          <button className="notice-modal__close" type="button" data-notice-close aria-label="Fermer" data-i18n-aria-label="thanks.notice.close">×</button>
          <span className="notice-modal__eyebrow" data-i18n="thanks.notice.label">Information importante</span>
          <h2 id="project-notice-title" data-i18n="thanks.notice.title">Le projet est en préparation</h2>
          <div className="notice-modal__accent" aria-hidden="true" />
          <div id="project-notice-copy">
            <p data-i18n="thanks.notice.body1">Nippon Heritage n’est pas encore ouvert au public. Le projet est actuellement en phase de préparation et nous recherchons les financements nécessaires à sa concrétisation.</p>
            <p data-i18n="thanks.notice.body2">Votre message a bien été transmis. Nous serons ravis d’échanger avec vous et de vous tenir informé de l’avancement du projet.</p>
          </div>
          <button className="button button-primary notice-modal__action" type="button" data-notice-close data-i18n="thanks.notice.close">J’ai compris</button>
        </section>
      </div>
      <Script id="project-notice-modal-init" strategy="afterInteractive">
        {`(() => {
          const modal = document.getElementById("project-notice-modal");
          if (!modal || modal.dataset.initialized === "true") return;
          modal.dataset.initialized = "true";
          const closeButtons = modal.querySelectorAll("[data-notice-close]");
          const closeModal = () => {
            modal.classList.remove("is-visible");
            modal.setAttribute("aria-hidden", "true");
            document.body.classList.remove("notice-modal-open");
          };
          closeButtons.forEach((button) => button.addEventListener("click", closeModal));
          document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.classList.contains("is-visible")) closeModal();
          });
          modal.classList.add("is-visible");
          modal.setAttribute("aria-hidden", "false");
          document.body.classList.add("notice-modal-open");
          modal.querySelector(".notice-modal__action")?.focus();
        })();`}
      </Script>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
