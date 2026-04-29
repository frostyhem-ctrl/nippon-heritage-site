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
    title: "Responsable du traitement",
    paragraphs: [
      "Le responsable du traitement des données collectées via le site Nippon Heritage doit être identifié de manière précise avant mise en ligne définitive.",
    ],
    items: [
      "Responsable du traitement : [à compléter]",
      "Adresse postale : [à compléter]",
      "Adresse e-mail de contact : frostyhem@gmail.com",
    ],
  },
  {
    title: "Données concernées",
    paragraphs: [
      "Le site peut collecter, selon les formulaires utilisés, des données d’identité, de contact et de projet afin de répondre aux demandes des internautes.",
    ],
    items: [
      "Nom et prénom",
      "Adresse e-mail",
      "Numéro de téléphone",
      "Informations relatives à la moto recherchée, au budget et au projet",
      "Données techniques minimales nécessaires au fonctionnement et à la sécurité du site",
    ],
  },
  {
    title: "Finalités et bases légales",
    items: [
      "Répondre à une demande de contact ou de recherche personnalisée",
      "Assurer le suivi des échanges précontractuels",
      "Administrer et sécuriser le site",
      "La base légale doit être confirmée selon le cas : consentement, mesures précontractuelles à votre demande ou intérêt légitime pour la sécurité du site",
    ],
  },
  {
    title: "Destinataires",
    paragraphs: [
      "Les données sont destinées à Nippon Heritage et, si nécessaire, à ses prestataires techniques strictement impliqués dans l’hébergement, l’administration du site, la gestion des formulaires ou la base de données.",
      "Selon la configuration actuelle du site, cela peut inclure des prestataires techniques d’hébergement, d’envoi de formulaires et d’administration. La liste exacte doit être validée avant publication définitive.",
    ],
  },
  {
    title: "Durées de conservation",
    paragraphs: [
      "Les données ne doivent pas être conservées au-delà de la durée nécessaire à la finalité poursuivie. Les durées exactes doivent être fixées et documentées par l’entreprise.",
    ],
    items: [
      "Demandes de contact et de recherche : [durée à compléter]",
      "Échanges commerciaux ou précontractuels : [durée à compléter]",
      "Journaux techniques et sécurité : [durée à compléter]",
    ],
  },
  {
    title: "Vos droits",
    paragraphs: [
      "Conformément à la réglementation applicable, vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou, selon le cas, l’opposition au traitement de vos données.",
      "Vous pouvez également introduire une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.",
    ],
    items: [
      "Contact d’exercice des droits : frostyhem@gmail.com",
      "Autorité de contrôle : CNIL — www.cnil.fr",
    ],
  },
  {
    title: "Sécurité et transferts",
    paragraphs: [
      "Nippon Heritage doit mettre en place des mesures raisonnables de sécurité pour protéger les données personnelles contre l’accès non autorisé, la perte, l’altération ou la divulgation.",
      "Si des prestataires situés hors de l’Union européenne sont utilisés, les garanties applicables et les mécanismes de transfert doivent être documentés ici avant mise en ligne définitive.",
    ],
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      pageId="legalPrivacy"
      title="Politique de confidentialité"
      intro="Cette page décrit la manière dont les données personnelles peuvent être traitées via les formulaires et les services techniques du site. Elle doit être relue et complétée avec vos informations d’entreprise avant publication finale."
      sections={sections}
    />
  );
}
