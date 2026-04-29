import Script from "next/script";
import { PublicShell } from "../../components/public-ui";
import { SearchSection } from "../../components/public-sections";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Recherche personnalisée | Nippon Heritage",
  description: "Décrivez la moto japonaise recherchée et confiez à Nippon Heritage une sélection ciblée au Japon selon vos critères.",
  alternates: getLanguageAlternates("/recherche-personnalisee"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/recherche-personnalisee",
    title: "Recherche personnalisée | Nippon Heritage",
    description: "Confiez à Nippon Heritage votre recherche de moto japonaise rare ou de collection.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg"),
        alt: "Honda NSR250R présentée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recherche personnalisée | Nippon Heritage",
    description: "Confiez à Nippon Heritage votre recherche de moto japonaise rare ou de collection.",
    images: [getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg")],
  },
};

export default function SearchPage() {
  return (
    <>
      <Script id="page-context-request" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="request";`}
      </Script>
      <PublicShell activePath="/recherche-personnalisee">
        <main className="home-page">
          <SearchSection />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
