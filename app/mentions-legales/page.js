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
    title: "Éditeur du site",
    items: [
      "Dénomination sociale : [à compléter]",
      "Forme juridique : [à compléter]",
      "Capital social : [à compléter]",
      "Siège social : [à compléter]",
      "Numéro SIREN / SIRET / RCS : [à compléter]",
      "Numéro de TVA intracommunautaire : [à compléter si applicable]",
      "Adresse e-mail de contact : frostyhem@gmail.com",
      "Téléphone : [à compléter]",
    ],
  },
  {
    title: "Direction de la publication",
    items: [
      "Directeur ou directrice de la publication : [à compléter]",
      "Responsable éditorial : [à compléter si différent]",
    ],
  },
  {
    title: "Hébergement",
    paragraphs: [
      "Le site est déployé sur une infrastructure technique externe. Les informations complètes d’identification de l’hébergeur doivent être indiquées ici avant mise en ligne définitive.",
    ],
    items: [
      "Nom ou dénomination sociale de l’hébergeur : [à compléter]",
      "Adresse de l’hébergeur : [à compléter]",
      "Téléphone de l’hébergeur : [à compléter]",
    ],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "L’ensemble des contenus présents sur ce site, notamment les textes, visuels, logos, éléments graphiques, photographies, vidéos, structure et code source, est protégé par le droit applicable à la propriété intellectuelle.",
      "Toute reproduction, représentation, adaptation, diffusion ou exploitation, totale ou partielle, sans autorisation écrite préalable de Nippon Heritage est interdite.",
    ],
  },
  {
    title: "Responsabilité",
    paragraphs: [
      "Les informations publiées sur ce site sont fournies à titre informatif. Nippon Heritage s’efforce d’en assurer l’exactitude et la mise à jour, sans garantir l’absence totale d’erreur, d’omission ou d’indisponibilité technique.",
      "L’utilisateur reste responsable de l’usage qu’il fait des informations disponibles sur le site.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      pageId="legalMentions"
      title="Mentions légales"
      intro="Cette page rassemble les informations d’identification du site et du responsable de publication. Les champs signalés à compléter doivent être renseignés avec les données exactes de l’entreprise avant ouverture publique définitive."
      sections={sections}
    />
  );
}
