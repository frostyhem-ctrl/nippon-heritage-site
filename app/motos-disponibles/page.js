import Script from "next/script";
import { PublicShell } from "../../components/public-ui";
import { StockSection } from "../../components/public-sections";
import { getPublishedMotorcyclesSafe } from "../../lib/motorcycles";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const revalidate = 120;

export const metadata = {
  title: "Motos disponibles | Nippon Heritage",
  description: "Découvrez les motos japonaises disponibles chez Nippon Heritage : 2 temps, 4 temps, sportives rares et modèles de collection.",
  alternates: getLanguageAlternates("/motos-disponibles"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/motos-disponibles",
    title: "Motos disponibles | Nippon Heritage",
    description: "Découvrez les motos japonaises disponibles chez Nippon Heritage.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/rvf400.jpg"),
        alt: "Honda RVF400R proposée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motos disponibles | Nippon Heritage",
    description: "Découvrez les motos japonaises disponibles chez Nippon Heritage.",
    images: [getAbsoluteImageUrl("/assets/images/stock/rvf400.jpg")],
  },
};

export default async function StockPage() {
  const motorcycles = await getPublishedMotorcyclesSafe();

  return (
    <>
      <Script id="page-context-stock" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="stock";`}
      </Script>
      <PublicShell activePath="/motos-disponibles">
        <main className="home-page">
          <StockSection motorcycles={motorcycles} pageTitle="Motos disponibles" />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
