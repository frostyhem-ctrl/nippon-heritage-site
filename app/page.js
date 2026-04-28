import Script from "next/script";
import { getPublishedMotorcyclesSafe } from "../lib/motorcycles";
import {
  buildHomeHtml,
  buildHomeJsonLd,
  getAbsoluteImageUrl,
  getLanguageAlternates,
  getLocalizedMeta,
  resolveLanguageAsync,
} from "../lib/site";

export const revalidate = 120;

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

export default async function HomePage() {
  const motorcycles = await getPublishedMotorcyclesSafe();
  const html = buildHomeHtml(motorcycles);
  const jsonLd = buildHomeJsonLd(motorcycles);

  return (
    <>
      <Script id="page-context-home" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="home";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
