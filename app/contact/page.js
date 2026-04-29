import Script from "next/script";
import { ContactSection } from "../../components/public-sections";
import { PublicShell } from "../../components/public-ui";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Contact | Nippon Heritage",
  description: "Contactez Nippon Heritage pour une moto disponible, une recherche personnalisée ou un échange autour de votre projet.",
  alternates: getLanguageAlternates("/contact"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/contact",
    title: "Contact | Nippon Heritage",
    description: "Contactez Nippon Heritage pour une moto disponible ou une recherche personnalisée.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg"),
        alt: "Honda NSR250R présentée par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Nippon Heritage",
    description: "Contactez Nippon Heritage pour une moto disponible ou une recherche personnalisée.",
    images: [getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg")],
  },
};

export default function ContactPage() {
  return (
    <>
      <Script id="page-context-contact" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="contactPage";`}
      </Script>
      <PublicShell activePath="/contact">
        <main className="home-page">
          <ContactSection />
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
