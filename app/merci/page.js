import Script from "next/script";
import {
  buildThanksHtml,
  buildThanksJsonLd,
  getAbsoluteImageUrl,
  getLanguageAlternates,
  getLocalizedMeta,
  resolveLanguageAsync,
} from "../../lib/site";

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

export default function MerciPage() {
  const html = buildThanksHtml();
  const jsonLd = buildThanksJsonLd();

  return (
    <>
      <Script id="page-context-thanks" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="thanks";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
