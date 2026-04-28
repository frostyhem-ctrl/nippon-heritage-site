import "./globals.css";
import { getAbsoluteImageUrl, getLocalizedMeta } from "../lib/site";
import { getGoogleSiteVerification, getSiteUrl } from "../lib/env";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "Nippon Heritage",
  title: getLocalizedMeta("home", "fr").title,
  description: getLocalizedMeta("home", "fr").description,
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    title: getLocalizedMeta("home", "fr").title,
    description: getLocalizedMeta("home", "fr").description,
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg"),
        alt: "Honda VFR400R NC30 presentee par Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: getLocalizedMeta("home", "fr").title,
    description: getLocalizedMeta("home", "fr").description,
    images: [getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg")],
  },
  verification: {
    google: getGoogleSiteVerification(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171314",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
