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
    title: "État actuel du site",
    paragraphs: [
      "À la date de mise à jour de cette page, le site public Nippon Heritage ne comporte pas de solution d’analyse d’audience ou de publicité identifiée dans le code nécessitant, à elle seule, un recueil préalable du consentement des visiteurs.",
      "Cette situation doit être réévaluée à chaque ajout d’outil tiers, de mesure d’audience, de pixel marketing, de lecteur vidéo externe ou d’intégration sociale.",
    ],
  },
  {
    title: "Traceurs techniques",
    paragraphs: [
      "Le site peut utiliser des mécanismes techniques strictement nécessaires à son fonctionnement, par exemple pour mémoriser certaines préférences locales ou permettre le bon fonctionnement d’un espace d’administration.",
      "Ces mécanismes ne doivent pas être détournés pour des finalités publicitaires ou de mesure non exemptée sans mise à jour préalable de cette politique et, si nécessaire, du recueil du consentement.",
    ],
  },
  {
    title: "Si de nouveaux cookies sont ajoutés",
    items: [
      "Informer clairement l’utilisateur de la finalité des traceurs",
      "Permettre un refus aussi simple que l’acceptation lorsque le consentement est requis",
      "Bloquer le dépôt des cookies non exemptés tant qu’aucun consentement valable n’a été recueilli",
      "Prévoir une preuve de recueil du consentement et une durée de conservation adaptée",
    ],
  },
  {
    title: "Gestion de vos préférences",
    paragraphs: [
      "Vous pouvez paramétrer votre navigateur pour limiter ou supprimer certains traceurs. Ce réglage peut toutefois affecter certaines fonctionnalités du site.",
      "Pour toute question sur les mécanismes utilisés par Nippon Heritage, vous pouvez écrire à : frostyhem@gmail.com",
    ],
  },
];

export default function PolitiqueCookiesPage() {
  return (
    <LegalPage
      pageId="legalCookies"
      title="Politique de cookies"
      intro="Cette page explique l’usage éventuel de cookies ou autres traceurs sur le site. Elle doit être mise à jour avant tout ajout d’outil de mesure d’audience, de publicité ou d’intégration tierce non indispensable."
      sections={sections}
    />
  );
}
