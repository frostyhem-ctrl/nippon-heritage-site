import Script from "next/script";
import { PublicShell } from "../../components/public-ui";
import { WorkshopSection } from "../../components/public-sections";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Atelier & restauration | Nippon Heritage",
  description: "Découvrez la méthode atelier Nippon Heritage : contrôle, remise en état, préparation et présentation avant mise en vente.",
  alternates: getLanguageAlternates("/atelier-restauration"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/atelier-restauration",
    title: "Atelier & restauration | Nippon Heritage",
    description: "Contrôle, remise en état et préparation atelier des motos japonaises sélectionnées par Nippon Heritage.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg"),
        alt: "Honda NSR250R présentée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelier & restauration | Nippon Heritage",
    description: "Contrôle, remise en état et préparation atelier des motos japonaises sélectionnées par Nippon Heritage.",
    images: [getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg")],
  },
};

export default function WorkshopPage() {
  return (
    <>
      <Script id="page-context-workshop" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="workshopPage";`}
      </Script>
      <PublicShell activePath="/atelier-restauration">
        <main className="home-page">
          <WorkshopSection />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
