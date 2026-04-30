import { LegalPage } from "../../components/legal-page";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Mentions légales | Nippon Heritage",
  description: "Mentions légales du site Nippon Heritage.",
  alternates: getLanguageAlternates("/mentions-legales"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/mentions-legales",
    title: "Mentions légales | Nippon Heritage",
    description: "Mentions légales du site Nippon Heritage.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg"),
        alt: "Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions légales | Nippon Heritage",
    description: "Mentions légales du site Nippon Heritage.",
    images: [getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg")],
  },
};

const sections = [
  {
    title: "Édition du site",
    paragraphs: [
      "Le site Nippon Heritage présente une activité d’import, de sélection, de préparation et de vente de motos japonaises de collection.",
      "Les informations diffusées ont pour objet de présenter l’univers, les services, les motos disponibles et les modalités de prise de contact associées au site.",
    ],
  },
  {
    title: "Publication",
    paragraphs: [
      "La coordination éditoriale, les contenus et leur mise à jour sont assurés dans le cadre de l’exploitation du site Nippon Heritage.",
      "Les prises de contact publiques s’effectuent exclusivement via les formulaires intégrés au site.",
    ],
  },
  {
    title: "Hébergement",
    paragraphs: [
      "Le site repose sur une infrastructure d’hébergement professionnelle externalisée.",
      "Les éléments techniques d’exploitation et de diffusion relèvent des services d’hébergement, de déploiement et de maintenance associés à cette infrastructure.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "L’ensemble des contenus présents sur ce site, notamment les textes, visuels, logos, éléments graphiques, photographies, structure et code source, est protégé par le droit applicable à la propriété intellectuelle.",
      "Toute reproduction, représentation, adaptation, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable de Nippon Heritage est interdite.",
    ],
  },
  {
    title: "Responsabilité",
    paragraphs: [
      "Les informations publiées sur ce site sont fournies à titre informatif. Nippon Heritage s’efforce d’en assurer la cohérence et la mise à jour, sans garantir l’absence totale d’erreur, d’omission ou d’indisponibilité technique.",
      "L’utilisateur reste responsable de l’usage qu’il fait des informations disponibles sur le site.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      pageId="legalMentions"
      title="Mentions légales"
      intro="Cette page regroupe les informations générales relatives à l’exploitation du site Nippon Heritage et à son cadre de diffusion public."
      sections={sections}
    />
  );
}
