import Script from "next/script";
import { AboutSection, ContactSection } from "../../components/public-sections";
import { PublicShell } from "../../components/public-ui";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "À propos | Nippon Heritage",
  description: "Découvrez l’approche Nippon Heritage : sélection exigeante, import ciblé et valorisation de motos japonaises anciennes et rares.",
  alternates: getLanguageAlternates("/a-propos"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/a-propos",
    title: "À propos | Nippon Heritage",
    description: "Découvrez l’approche Nippon Heritage pour la sélection et la valorisation de motos japonaises rares.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg"),
        alt: "Honda VFR400R présentée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos | Nippon Heritage",
    description: "Découvrez l’approche Nippon Heritage pour la sélection et la valorisation de motos japonaises rares.",
    images: [getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg")],
  },
};

export default function AboutPage() {
  return (
    <>
      <Script id="page-context-about" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="about";`}
      </Script>
      <PublicShell activePath="/a-propos">
        <main className="home-page">
          <AboutSection />
          <ContactSection />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
