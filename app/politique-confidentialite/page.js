import { LegalPage } from "../../components/legal-page";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Politique de confidentialité | Nippon Heritage",
  description: "Politique de confidentialité et informations relatives au traitement des données personnelles sur le site Nippon Heritage.",
  alternates: getLanguageAlternates("/politique-confidentialite"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/politique-confidentialite",
    title: "Politique de confidentialité | Nippon Heritage",
    description: "Informations relatives au traitement des données personnelles sur le site Nippon Heritage.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg"),
        alt: "Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de confidentialité | Nippon Heritage",
    description: "Informations relatives au traitement des données personnelles sur le site Nippon Heritage.",
    images: [getAbsoluteImageUrl("/assets/images/stock/nsr250.jpg")],
  },
};

const sections = [
  {
    title: "Traitement des données",
    paragraphs: [
      "Le site Nippon Heritage peut traiter certaines données transmises volontairement via les formulaires de contact et de recherche personnalisée.",
      "Ces traitements sont limités aux besoins de gestion des demandes, du suivi des échanges et du bon fonctionnement technique du site.",
    ],
  },
  {
    title: "Données concernées",
    items: [
      "Identité et coordonnées transmises dans les formulaires",
      "Informations relatives à une moto recherchée, au budget et au projet",
      "Données techniques nécessaires à la sécurité, à l’administration et à la stabilité du site",
    ],
  },
  {
    title: "Finalités",
    items: [
      "Répondre à une demande de contact ou de recherche personnalisée",
      "Assurer le suivi des échanges liés au site",
      "Gérer l’administration technique et la sécurité de la plateforme",
    ],
  },
  {
    title: "Destinataires",
    paragraphs: [
      "Les informations transmises via le site sont destinées au traitement des demandes dans le cadre de l’activité présentée par Nippon Heritage.",
      "Des prestataires techniques peuvent intervenir lorsque cela est nécessaire à l’hébergement, au traitement des formulaires, à l’administration ou à la maintenance du site.",
    ],
  },
  {
    title: "Conservation",
    paragraphs: [
      "Les données sont conservées pendant une durée cohérente avec la nature de la demande, les échanges engagés et les impératifs techniques ou de sécurité liés au fonctionnement du site.",
      "Les informations devenues inutiles sont supprimées, archivées ou anonymisées selon leur nature.",
    ],
  },
  {
    title: "Droits",
    paragraphs: [
      "Toute personne concernée peut solliciter l’accès, la rectification, l’effacement ou la limitation du traitement de ses données, selon le cadre applicable.",
      "Les demandes relatives aux données personnelles peuvent être adressées via la page de contact du site. Une réclamation peut également être introduite auprès de la CNIL.",
    ],
  },
  {
    title: "Sécurité",
    paragraphs: [
      "Des mesures techniques et organisationnelles adaptées sont mises en œuvre afin de préserver la confidentialité, l’intégrité et la disponibilité des données traitées via le site.",
      "Les flux, outils et services utilisés sont encadrés dans une logique de minimisation et de protection des données.",
    ],
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      pageId="legalPrivacy"
      title="Politique de confidentialité"
      intro="Cette page présente les principes généraux appliqués au traitement des données personnelles via les formulaires et les services techniques associés au site Nippon Heritage."
      sections={sections}
    />
  );
}
