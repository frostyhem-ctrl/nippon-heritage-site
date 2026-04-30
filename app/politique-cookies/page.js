import { LegalPage } from "../../components/legal-page";
import { getAbsoluteImageUrl, getLanguageAlternates } from "../../lib/site";

export const metadata = {
  title: "Politique de cookies | Nippon Heritage",
  description: "Informations sur l’utilisation des cookies et traceurs sur le site Nippon Heritage.",
  alternates: getLanguageAlternates("/politique-cookies"),
  openGraph: {
    type: "website",
    siteName: "Nippon Heritage",
    locale: "fr_FR",
    url: "/politique-cookies",
    title: "Politique de cookies | Nippon Heritage",
    description: "Informations sur l’utilisation des cookies et traceurs sur le site Nippon Heritage.",
    images: [
      {
        url: getAbsoluteImageUrl("/assets/images/stock/cbr400.jpg"),
        alt: "Nippon Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de cookies | Nippon Heritage",
    description: "Informations sur l’utilisation des cookies et traceurs sur le site Nippon Heritage.",
    images: [getAbsoluteImageUrl("/assets/images/stock/cbr400.jpg")],
  },
};

const sections = [
  {
    title: "Usage actuel",
    paragraphs: [
      "Le site public Nippon Heritage ne met pas en avant de dispositif publicitaire ni d’outil de mesure d’audience visible destiné à suivre le comportement de navigation à des fins marketing.",
      "Le fonctionnement du site peut toutefois s’appuyer sur des mécanismes techniques limités, nécessaires à l’affichage, à la sécurité, à certaines préférences locales et à l’administration.",
    ],
  },
  {
    title: "Traceurs techniques",
    paragraphs: [
      "Certains traceurs strictement nécessaires peuvent être utilisés afin d’assurer la stabilité, la sécurité, le rendu ou l’administration du site.",
      "Ces mécanismes ne sont pas destinés à la publicité ciblée ni à une exploitation commerciale du parcours de navigation.",
    ],
  },
  {
    title: "Évolutions éventuelles",
    items: [
      "Toute intégration d’outil tiers non indispensable donnera lieu à une mise à jour de cette rubrique",
      "Les usages nécessitant un consentement préalable feront l’objet d’un dispositif adapté",
      "Les durées de conservation et finalités associées seront précisées selon les outils réellement utilisés",
    ],
  },
  {
    title: "Préférences de navigation",
    paragraphs: [
      "Le navigateur peut être configuré pour limiter, refuser ou supprimer certains traceurs. Ce réglage peut toutefois modifier une partie du fonctionnement du site.",
      "Les demandes d’information liées aux traceurs ou au fonctionnement du site peuvent être adressées via la page de contact.",
    ],
  },
];

export default function PolitiqueCookiesPage() {
  return (
    <LegalPage
      pageId="legalCookies"
      title="Politique de cookies"
      intro="Cette page présente les principes généraux applicables aux cookies et traceurs susceptibles d’être utilisés dans le cadre du fonctionnement technique du site Nippon Heritage."
      sections={sections}
    />
  );
}
