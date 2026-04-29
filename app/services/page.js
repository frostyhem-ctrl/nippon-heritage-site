import Script from "next/script";
import { PublicShell } from "../../components/public-ui";
import { ServicesSection } from "../../components/public-sections";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Services | Nippon Heritage",
  description: "Import sélectif, préparation atelier et vente de motos japonaises 2 temps et 4 temps chez Nippon Heritage.",
  alternates: getLanguageAlternates("/services"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/services",
    title: "Services | Nippon Heritage",
    description: "Import sélectif, préparation atelier et vente de motos japonaises de collection.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/rvf400.jpg"),
        alt: "Honda RVF400R présentée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Nippon Heritage",
    description: "Import sélectif, préparation atelier et vente de motos japonaises de collection.",
    images: [getAbsoluteImageUrl("/assets/images/stock/rvf400.jpg")],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Script id="page-context-services" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="servicesPage";`}
      </Script>
      <PublicShell activePath="/services">
        <main className="home-page">
          <ServicesSection />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
