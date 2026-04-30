const body = document.body;
const page = body?.dataset.page || document.documentElement?.dataset.page || "home";
const year = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const languageButtons = Array.from(document.querySelectorAll(".lang-switch [data-lang]"));
const metaDescription = document.querySelector('meta[name="description"]');
const canonicalLink = document.querySelector('link[rel="canonical"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');
const ogUrl = document.querySelector('meta[property="og:url"]');
const ogLocale = document.querySelector('meta[property="og:locale"]');
const twitterTitle = document.querySelector('meta[name="twitter:title"]');
const twitterDescription = document.querySelector('meta[name="twitter:description"]');
const googleVerificationMeta = document.querySelector('meta[data-google-site-verification]');
const homeLinks = Array.from(document.querySelectorAll("[data-home-link]"));

const stockGrid = document.getElementById("stock-grid");
let stockCards = Array.from(document.querySelectorAll(".stock-card"));
const stockCount = document.getElementById("stock-count");
const stockSearch = document.getElementById("stock-search");
const brandFilter = document.getElementById("brand-filter");
const typeFilter = document.getElementById("type-filter");
const budgetFilter = document.getElementById("budget-filter");
const budgetOutput = document.getElementById("budget-output");
const sortFilter = document.getElementById("sort-filter");
const resetFilters = document.getElementById("reset-filters");

const searchBudget = document.getElementById("search-budget");
const searchBudgetOutput = document.getElementById("search-budget-output");
const searchForm = document.getElementById("search-form");
const formNext = document.getElementById("form-next");
const formUrl = document.getElementById("form-url");

const defaultLanguage = "fr";
const defaultSiteUrl = "https://www.nipponheritage.fr";
const storageKey = "nipponHeritageLanguage";
const localeMap = {
  fr: "fr-FR",
  en: "en-IE",
  es: "es-ES",
  it: "it-IT",
};

const translations = {
  fr: {
    "meta.home.title": "Nippon Heritage | Import de motos japonaises 2 temps",
    "meta.home.description":
      "Nippon Heritage importe du Japon des motos de collection 2 temps, les remet en etat en France et les propose a la vente.",
    "meta.thanks.title": "Merci | Nippon Heritage",
    "meta.thanks.description": "Confirmation d'envoi du formulaire Nippon Heritage.",
    "top.strip": "Import selectif depuis le Japon â€¢ 2 temps de collection â€¢ Atelier en France",
    "aria.langSwitch": "Langues disponibles",
    "aria.brand": "Nippon Heritage",
    "aria.openMenu": "Ouvrir le menu",
    "aria.primaryNav": "Navigation principale",
    "aria.quickLinks": "Acces rapides",
    "common.logoAlt": "Logo Nippon Heritage",
    "common.japan": "Japon",
    "common.viewMore": "Voir plus",
    "nav.home": "Accueil",
    "nav.stock": "Motos en stock",
    "nav.request": "Recherche personnalisee",
    "nav.services": "Nos services",
    "nav.workshop": "Atelier",
    "nav.contact": "Contact",
    "nav.cta": "Faire une demande",
    "rail.stock": "Stock",
    "rail.request": "Demande",
    "rail.contact": "Contact",
    "hero.kicker": "Nippon Heritage â€¢ Motos japonaises de collection",
    "hero.title": "Specialiste de l'import de motos 2 temps japonaises.",
    "hero.body":
      "Nous sourcons au Japon des motos saines, peu kilometrees et desirables, puis nous les remettons en etat en France avant la revente. Pas d'homologation, pas de volume inutile, uniquement des bases choisies.",
    "hero.ctaPrimary": "Voir les modeles",
    "hero.ctaSecondary": "Recherche sur commande",
    "hero.card1.title": "Selection au Japon",
    "hero.card1.body":
      "Nous visons des motos coherentes, propres et interessantes pour la collection.",
    "hero.card2.title": "Passage atelier",
    "hero.card2.body":
      "Controle, remise en etat et presentation avant la mise en vente en France.",
    "hero.card3.title": "Positionnement clair",
    "hero.card3.body":
      "Import, remise en etat, vente. Aucune rubrique homologation n'est proposee.",
    "band.item1": "Import moto de collection",
    "band.item2": "2 temps uniquement",
    "band.item3": "Japon",
    "band.item4": "Faible kilometrage privilegie",
    "band.item5": "Atelier en France",
    "band.item6": "Selection rigoureuse",
    "catalog.kicker": "Motos en stock",
    "catalog.title": "Exemples d'arrivages et de modeles suivis.",
    "catalog.body":
      "Cette selection presente des sportives japonaises 2 temps et 4 temps que nous pouvons proposer ou rechercher selon disponibilite.",
    "catalog.resultLabel": "modeles affiches",
    "catalog.toolbarNote": "Exemples de modeles suivis et regulierement recherches.",
    "filters.searchLabel": "Rechercher",
    "filters.searchPlaceholder": "NSR, TZR, RGV...",
    "filters.brandLabel": "Filtrer par marque",
    "filters.brandAll": "Toutes les marques",
    "filters.typeLabel": "Filtrer par type",
    "filters.typeAll": "Tous les types",
    "filters.typeSportive": "Sportive",
    "filters.typeRoadster": "Roadster",
    "filters.typeRarete": "Rarete",
    "filters.budgetLabel": "Budget maximum",
    "filters.sortLabel": "Trier",
    "filters.sortRecent": "Annee recente",
    "filters.sortPriceAsc": "Prix croissant",
    "filters.sortPriceDesc": "Prix decroissant",
    "filters.sortYearAsc": "Annee ancienne",
    "filters.reset": "Reinitialiser les filtres",
    "cards.nsr.body":
      "Sportive 2 temps emblematique, base saine privilegiee pour une vente collection.",
    "cards.tzr.body":
      "Profil sport collection pour passionnes de 2 temps japonais a forte identite.",
    "cards.rgv.body":
      "Machine plus pointue, destinee a une clientele qui cherche une vraie rarete sportive.",
    "cards.kr1s.body":
      "Positionnement expert et niche, parfait pour une identite de specialiste assumee.",
    "cards.r1z.body":
      "Roadster 2 temps tres caracteriel, interessant pour differencier l'offre du catalogue.",
    "cards.ns400.body":
      "Une piece plus rare, selectionnee pour renforcer le positionnement heritage de la marque.",
    "search.kicker": "Recherche personnalisee",
    "search.title": "Vous avez un modele precis en tete ? Nous pouvons le rechercher au Japon pour vous.",
    "search.body":
      "Indiquez le modele souhaite, votre budget et vos criteres. Nous revenons vers vous avec une recherche ciblee sur des motos coherentes, saines et adaptees a votre projet.",
    "form.subject": "Nouvelle demande depuis Nippon Heritage",
    "form.brandLabel": "Marque",
    "form.brandPlaceholder": "Honda, Yamaha, Suzuki...",
    "form.modelLabel": "Modele",
    "form.modelPlaceholder": "NSR250R, TZR250, RGV250...",
    "form.typeLabel": "Type",
    "form.typeDefault": "Sportive, roadster, rarete...",
    "form.yearLabel": "Annee minimale",
    "form.yearPlaceholder": "Ex : 1988",
    "form.engineLabel": "Cylindree",
    "form.enginePlaceholder": "250 cc, 350 cc, 400 cc...",
    "form.budgetLabel": "Budget cible",
    "form.nameLabel": "Nom",
    "form.namePlaceholder": "Votre nom",
    "form.firstnameLabel": "Prenom",
    "form.firstnamePlaceholder": "Votre prenom",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "votre@email.fr",
    "form.phoneLabel": "Telephone",
    "form.phonePlaceholder": "Votre numero",
    "form.messageLabel": "Informations complementaires",
    "form.messagePlaceholder":
      "Precisez la moto recherchee, l'etat souhaite, les couleurs, la tolerance kilometrage ou votre objectif de collection.",
    "form.submit": "Envoyer la demande",
    "form.helper": "Les demandes sont traitees via le formulaire du site.",
    "services.kicker": "Nos services",
    "services.title": "Import, selection, atelier et vente de motos preparees.",
    "services.import.title": "Import selectif depuis le Japon",
    "services.import.body":
      "Le sourcing ne vise pas la quantite. Chaque moto est choisie pour sa coherence, son etat de depart et sa valeur potentielle une fois remise en presentation pour le marche francais.",
    "services.import.bullet1": "Recherche de motos de collection 2 temps",
    "services.import.bullet2": "Priorite aux bases saines et peu kilometrees",
    "services.import.bullet3": "Selection adaptee a une clientele collection",
    "services.workshop.title": "Remise en etat atelier avant mise en vente",
    "services.workshop.body":
      "Chaque moto fait l'objet d'un controle, d'une remise en etat adaptee et d'une presentation soignee avant sa mise en vente.",
    "services.workshop.bullet1": "Controle visuel et technique a reception",
    "services.workshop.bullet2": "Interventions selon l'etat reel de la machine",
    "services.workshop.bullet3": "Presentation propre et valorisante avant diffusion",
    "services.sale.title": "Vente de motos de collection a forte personnalite",
    "services.sale.body":
      "Nous privilegions une presentation claire, serieuse et documentee, en accord avec le niveau d'exigence attendu sur ce type de motos.",
    "services.sale.bullet1": "Catalogue lisible et plus haut de gamme",
    "services.sale.bullet2": "Recherche personnalisee pour demandes precises",
    "services.sale.bullet3": "Aucune rubrique homologation integree au site",
    "method.kicker": "Atelier & methode",
    "method.title": "Une methode courte, lisible et credible.",
    "method.body":
      "Notre methode de travail est simple : selectionner, controler, remettre en etat et proposer des motos coherentes a la vente.",
    "method.step1.title": "Reperage",
    "method.step1.body":
      "Veille des modeles suivis, lecture de l'etat reel et tri rigoureux des opportunites.",
    "method.step2.title": "Achat cible",
    "method.step2.body":
      "Priorite aux motos completes, desirables et adaptees a une remise en etat serieuse.",
    "method.step3.title": "Preparation",
    "method.step3.body":
      "Controle, nettoyage, intervention atelier et mise en presentation avant publication.",
    "method.step4.title": "Vente",
    "method.step4.body":
      "Diffusion soignee, echange direct avec les acheteurs et recherche sur commande.",
    "contact.kicker": "Contact",
    "contact.title": "Un site pense pour inspirer confiance et convertir.",
    "contact.body":
      "",
    "contact.panel1.title": "Positionnement",
    "contact.panel1.body":
      "Import selectif de motos 2 temps japonaises de collection, remises en etat puis revendues en France.",
    "contact.panel2.title": "Navigation",
    "contact.panel2.body":
      "Le site met en avant les modeles en stock, la recherche sur commande, l'atelier et le contact.",
    "contact.panel3.title": "Etape suivante",
    "contact.panel3.body":
      "",
    "footer.brand": "Nippon Heritage â€¢ Import de motos japonaises 2 temps de collection.",
    "footer.visuals": "Visuels gratuits telecharges depuis Unsplash.",
    "footer.note": "",
    "thanks.kicker": "Message envoye",
    "thanks.title": "Merci, votre demande a bien ete transmise.",
    "thanks.body":
      "Nous revenons vers vous sur l'email indique des que possible. Vous pouvez maintenant retourner au site principal.",
    "thanks.cta": "Revenir a l'accueil",
  },
  en: {
    "meta.home.title": "Nippon Heritage | Japanese 2-stroke motorcycle imports",
    "meta.home.description":
      "Nippon Heritage sources collectible Japanese 2-stroke motorcycles, refreshes them in France, and offers them for sale.",
    "meta.thanks.title": "Thank you | Nippon Heritage",
    "meta.thanks.description": "Confirmation page for the Nippon Heritage contact form.",
    "top.strip": "Selective import from Japan â€¢ Collectible 2-strokes â€¢ Workshop in France",
    "aria.langSwitch": "Available languages",
    "aria.brand": "Nippon Heritage",
    "aria.openMenu": "Open menu",
    "aria.primaryNav": "Main navigation",
    "aria.quickLinks": "Quick links",
    "common.logoAlt": "Nippon Heritage logo",
    "common.japan": "Japan",
    "common.viewMore": "View more",
    "nav.home": "Home",
    "nav.stock": "Bikes in stock",
    "nav.request": "Custom sourcing",
    "nav.services": "Services",
    "nav.workshop": "Workshop",
    "nav.contact": "Contact",
    "nav.cta": "Make a request",
    "rail.stock": "Stock",
    "rail.request": "Request",
    "rail.contact": "Contact",
    "hero.kicker": "Nippon Heritage â€¢ Collectible Japanese motorcycles",
    "hero.title": "Specialist in imported Japanese 2-stroke motorcycles.",
    "hero.body":
      "We source sound, low-mileage and desirable motorcycles in Japan, then refresh them in France before resale. No homologation, no unnecessary volume, only carefully chosen bikes.",
    "hero.ctaPrimary": "View the models",
    "hero.ctaSecondary": "Custom sourcing",
    "hero.card1.title": "Selection in Japan",
    "hero.card1.body":
      "We target coherent, clean and compelling bikes for collectors.",
    "hero.card2.title": "Workshop process",
    "hero.card2.body":
      "Inspection, refurbishment and presentation before the bike goes on sale in France.",
    "hero.card3.title": "Clear positioning",
    "hero.card3.body":
      "Import, refurbishment, sale. No homologation section is offered on the site.",
    "band.item1": "Collectible motorcycle import",
    "band.item2": "2-stroke only",
    "band.item3": "Japan",
    "band.item4": "Low mileage preferred",
    "band.item5": "Workshop in France",
    "band.item6": "Strict selection",
    "catalog.kicker": "Bikes in stock",
    "catalog.title": "Examples of arrivals and tracked models.",
    "catalog.body":
      "The catalog keeps a clear presentation with real filters, bike cards and a coherent tone.",
    "catalog.resultLabel": "models displayed",
    "catalog.toolbarNote": "Presentation catalog inspired by your reference layout.",
    "filters.searchLabel": "Search",
    "filters.searchPlaceholder": "NSR, TZR, RGV...",
    "filters.brandLabel": "Filter by brand",
    "filters.brandAll": "All brands",
    "filters.typeLabel": "Filter by type",
    "filters.typeAll": "All types",
    "filters.typeSportive": "Sport bike",
    "filters.typeRoadster": "Roadster",
    "filters.typeRarete": "Rarity",
    "filters.budgetLabel": "Maximum budget",
    "filters.sortLabel": "Sort",
    "filters.sortRecent": "Newest year",
    "filters.sortPriceAsc": "Price low to high",
    "filters.sortPriceDesc": "Price high to low",
    "filters.sortYearAsc": "Oldest year",
    "filters.reset": "Reset filters",
    "cards.nsr.body":
      "An iconic 2-stroke sport bike, with a healthy base suited to collector resale.",
    "cards.tzr.body":
      "A sport-oriented collector profile for enthusiasts who love distinctive Japanese 2-strokes.",
    "cards.rgv.body":
      "A sharper machine aimed at buyers looking for a true sport rarity.",
    "cards.kr1s.body":
      "Expert, niche positioning that fits a strong specialist identity.",
    "cards.r1z.body":
      "A characterful 2-stroke roadster that helps diversify the catalog.",
    "cards.ns400.body":
      "A rarer piece selected to reinforce the heritage positioning of the brand.",
    "search.kicker": "Custom sourcing",
    "search.title": "Have a specific bike in mind? We can source it for you.",
    "search.body":
      "The form keeps the spirit of your reference while adapting it to your business: targeted search, budget, healthy base, collectible 2-strokes only.",
    "form.subject": "New request from Nippon Heritage",
    "form.brandLabel": "Brand",
    "form.brandPlaceholder": "Honda, Yamaha, Suzuki...",
    "form.modelLabel": "Model",
    "form.modelPlaceholder": "NSR250R, TZR250, RGV250...",
    "form.typeLabel": "Type",
    "form.typeDefault": "Sport bike, roadster, rarity...",
    "form.yearLabel": "Minimum year",
    "form.yearPlaceholder": "Example: 1988",
    "form.engineLabel": "Engine size",
    "form.enginePlaceholder": "250 cc, 350 cc, 400 cc...",
    "form.budgetLabel": "Target budget",
    "form.nameLabel": "Last name",
    "form.namePlaceholder": "Your last name",
    "form.firstnameLabel": "First name",
    "form.firstnamePlaceholder": "Your first name",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "your@email.com",
    "form.phoneLabel": "Phone",
    "form.phonePlaceholder": "Your phone number",
    "form.messageLabel": "Additional information",
    "form.messagePlaceholder":
      "Tell us about the bike you want, the condition you expect, preferred colors, mileage tolerance or your collecting goal.",
    "form.submit": "Send request",
    "form.helper": "Requests are processed through the website form.",
    "services.kicker": "Services",
    "services.title": "Import, selection, workshop work and sale of prepared motorcycles.",
    "services.import.title": "Selective import from Japan",
    "services.import.body":
      "The sourcing strategy is not about volume. Each bike is chosen for its consistency, starting condition and potential value once properly presented for the French market.",
    "services.import.bullet1": "Search for collectible 2-stroke motorcycles",
    "services.import.bullet2": "Priority to healthy, low-mileage bases",
    "services.import.bullet3": "Selection tailored to collector clients",
    "services.workshop.title": "Workshop preparation before sale",
    "services.workshop.body":
      "Each motorcycle is inspected, prepared and presented before being offered for sale.",
    "services.workshop.bullet1": "Visual and technical inspection on arrival",
    "services.workshop.bullet2": "Work carried out according to the bike's real condition",
    "services.workshop.bullet3": "Clean, valuable presentation before publication",
    "services.sale.title": "Collector bikes with real personality",
    "services.sale.body":
      "The sales message focuses on desirability, trust and rarity, with a clear and coherent presentation.",
    "services.sale.bullet1": "Clearer, more upscale catalog",
    "services.sale.bullet2": "Custom sourcing for specific requests",
    "services.sale.bullet3": "No homologation section on the site",
    "method.kicker": "Workshop & method",
    "method.title": "A short, clear and credible process.",
    "method.body":
      "The site explains very clearly how a motorcycle reaches the sale stage, without promising services you do not want to offer.",
    "method.step1.title": "Sourcing watch",
    "method.step1.body":
      "Monitoring tracked models, reading real condition and strictly sorting the opportunities.",
    "method.step2.title": "Targeted purchase",
    "method.step2.body":
      "Priority goes to complete, desirable bikes that are suitable for a serious refresh.",
    "method.step3.title": "Preparation",
    "method.step3.body":
      "Inspection, cleaning, workshop work and final presentation before listing.",
    "method.step4.title": "Sale",
    "method.step4.body":
      "Careful presentation, direct exchanges with buyers and custom sourcing.",
    "contact.kicker": "Contact",
    "contact.title": "A clear point of contact for requests and collector inquiries.",
    "contact.body":
      "The public presentation brings together catalog access, custom sourcing, workshop services and contact in a clear way.",
    "contact.panel1.title": "Positioning",
    "contact.panel1.body":
      "Selective import of collectible Japanese 2-stroke motorcycles, refreshed and then resold in France.",
    "contact.panel2.title": "Navigation",
    "contact.panel2.body":
      "The site highlights bikes in stock, sourcing on request, the workshop and contact.",
    "contact.panel3.title": "Next step",
    "contact.panel3.body":
      "The published content can evolve according to available motorcycles and the information shared on the site.",
    "footer.brand": "Nippon Heritage â€¢ Import of collectible Japanese 2-stroke motorcycles.",
    "footer.visuals": "Free visuals sourced from Unsplash.",
    "footer.note": "",
    "thanks.kicker": "Message sent",
    "thanks.title": "Thank you, your request has been sent successfully.",
    "thanks.body":
      "We will get back to you at the email address provided as soon as possible. You can now return to the main site.",
    "thanks.cta": "Back to home",
  },
  es: {
    "meta.home.title": "Nippon Heritage | Importacion de motos japonesas 2 tiempos",
    "meta.home.description":
      "Nippon Heritage selecciona en Japon motos japonesas 2 tiempos de coleccion, las pone al dia en Francia y luego las ofrece a la venta.",
    "meta.thanks.title": "Gracias | Nippon Heritage",
    "meta.thanks.description": "Pagina de confirmacion del formulario de Nippon Heritage.",
    "top.strip": "Importacion selectiva desde Japon â€¢ 2 tiempos de coleccion â€¢ Taller en Francia",
    "aria.langSwitch": "Idiomas disponibles",
    "aria.brand": "Nippon Heritage",
    "aria.openMenu": "Abrir menu",
    "aria.primaryNav": "Navegacion principal",
    "aria.quickLinks": "Accesos rapidos",
    "common.logoAlt": "Logotipo de Nippon Heritage",
    "common.japan": "Japon",
    "common.viewMore": "Ver mas",
    "nav.home": "Inicio",
    "nav.stock": "Motos en stock",
    "nav.request": "Busqueda personalizada",
    "nav.services": "Servicios",
    "nav.workshop": "Taller",
    "nav.contact": "Contacto",
    "nav.cta": "Hacer una solicitud",
    "rail.stock": "Stock",
    "rail.request": "Solicitud",
    "rail.contact": "Contacto",
    "hero.kicker": "Nippon Heritage â€¢ Motos japonesas de coleccion",
    "hero.title": "Especialista en importacion de motos japonesas 2 tiempos.",
    "hero.body":
      "Seleccionamos en Japon motos sanas, con poco kilometraje y deseables, y luego las reacondicionamos en Francia antes de revenderlas. Sin homologacion, sin volumen inutil, solo bases elegidas con criterio.",
    "hero.ctaPrimary": "Ver modelos",
    "hero.ctaSecondary": "Busqueda por encargo",
    "hero.card1.title": "Seleccion en Japon",
    "hero.card1.body":
      "Buscamos motos coherentes, limpias e interesantes para coleccion.",
    "hero.card2.title": "Paso por taller",
    "hero.card2.body":
      "Control, puesta al dia y presentacion antes de salir a la venta en Francia.",
    "hero.card3.title": "Posicionamiento claro",
    "hero.card3.body":
      "Importacion, reacondicionamiento y venta. El sitio no incluye una seccion de homologacion.",
    "band.item1": "Importacion de motos de coleccion",
    "band.item2": "Solo 2 tiempos",
    "band.item3": "Japon",
    "band.item4": "Prioridad a bajo kilometraje",
    "band.item5": "Taller en Francia",
    "band.item6": "Seleccion rigurosa",
    "catalog.kicker": "Motos en stock",
    "catalog.title": "Ejemplos de llegadas y modelos seguidos.",
    "catalog.body":
      "La presentacion conserva un espiritu catalogo claro, con filtros reales y fichas de motos coherentes.",
    "catalog.resultLabel": "modelos mostrados",
    "catalog.toolbarNote": "Modelos representativos seguidos y buscados regularmente.",
    "filters.searchLabel": "Buscar",
    "filters.searchPlaceholder": "NSR, TZR, RGV...",
    "filters.brandLabel": "Filtrar por marca",
    "filters.brandAll": "Todas las marcas",
    "filters.typeLabel": "Filtrar por tipo",
    "filters.typeAll": "Todos los tipos",
    "filters.typeSportive": "Deportiva",
    "filters.typeRoadster": "Roadster",
    "filters.typeRarete": "Rareza",
    "filters.budgetLabel": "Presupuesto maximo",
    "filters.sortLabel": "Ordenar",
    "filters.sortRecent": "Ano mas reciente",
    "filters.sortPriceAsc": "Precio ascendente",
    "filters.sortPriceDesc": "Precio descendente",
    "filters.sortYearAsc": "Ano mas antiguo",
    "filters.reset": "Restablecer filtros",
    "cards.nsr.body":
      "Deportiva 2 tiempos iconica, con una base sana ideal para venta de coleccion.",
    "cards.tzr.body":
      "Perfil sport de coleccion para apasionados de los 2 tiempos japoneses con mucha identidad.",
    "cards.rgv.body":
      "Una maquina mas afilada, pensada para clientes que buscan una verdadera rareza deportiva.",
    "cards.kr1s.body":
      "Un posicionamiento experto y de nicho, perfecto para una identidad de especialista asumida.",
    "cards.r1z.body":
      "Roadster 2 tiempos con mucho caracter, ideal para diferenciar la oferta del catalogo.",
    "cards.ns400.body":
      "Una pieza mas rara, seleccionada para reforzar el posicionamiento heritage de la marca.",
    "search.kicker": "Busqueda personalizada",
    "search.title": "Tienes una moto concreta en mente? Podemos buscarla por ti.",
    "search.body":
      "El formulario se centra en la busqueda dirigida, el presupuesto y una seleccion coherente de motos.",
    "form.subject": "Nueva solicitud desde Nippon Heritage",
    "form.brandLabel": "Marca",
    "form.brandPlaceholder": "Honda, Yamaha, Suzuki...",
    "form.modelLabel": "Modelo",
    "form.modelPlaceholder": "NSR250R, TZR250, RGV250...",
    "form.typeLabel": "Tipo",
    "form.typeDefault": "Deportiva, roadster, rareza...",
    "form.yearLabel": "Ano minimo",
    "form.yearPlaceholder": "Ej.: 1988",
    "form.engineLabel": "Cilindrada",
    "form.enginePlaceholder": "250 cc, 350 cc, 400 cc...",
    "form.budgetLabel": "Presupuesto objetivo",
    "form.nameLabel": "Apellido",
    "form.namePlaceholder": "Apellido",
    "form.firstnameLabel": "Nombre",
    "form.firstnamePlaceholder": "Nombre",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "tu@email.com",
    "form.phoneLabel": "Telefono",
    "form.phonePlaceholder": "Telefono",
    "form.messageLabel": "Informacion adicional",
    "form.messagePlaceholder":
      "Indica la moto buscada, el estado deseado, los colores, la tolerancia de kilometraje o el objetivo de coleccion.",
    "form.submit": "Enviar solicitud",
    "form.helper": "Las solicitudes se tramitan a traves del formulario del sitio.",
    "services.kicker": "Servicios",
    "services.title": "Importacion, seleccion, taller y venta de motos preparadas.",
    "services.import.title": "Importacion selectiva desde Japon",
    "services.import.body":
      "La busqueda no va de cantidad. Cada moto se elige por su coherencia, su estado de partida y su valor potencial una vez presentada correctamente para el mercado frances.",
    "services.import.bullet1": "Busqueda de motos 2 tiempos de coleccion",
    "services.import.bullet2": "Prioridad a bases sanas y con poco kilometraje",
    "services.import.bullet3": "Seleccion adaptada a clientes coleccionistas",
    "services.workshop.title": "Puesta al dia en taller antes de la venta",
    "services.workshop.body":
      "No propones una importacion en bruto. Por eso el sitio destaca el control, la limpieza, la presentacion y la coherencia mecanica antes de que una moto llegue a manos del comprador.",
    "services.workshop.bullet1": "Control visual y tecnico a la recepcion",
    "services.workshop.bullet2": "Intervenciones segun el estado real de la moto",
    "services.workshop.bullet3": "Presentacion limpia y valorizada antes de publicar",
    "services.sale.title": "Venta de motos de coleccion con mucha personalidad",
    "services.sale.body":
      "El discurso comercial se centra en la deseabilidad, la confianza y la rareza, con una presentacion clara y coherente.",
    "services.sale.bullet1": "Catalogo mas claro y mas exclusivo",
    "services.sale.bullet2": "Busqueda personalizada para demandas concretas",
    "services.sale.bullet3": "Sin seccion de homologacion en el sitio",
    "method.kicker": "Taller y metodo",
    "method.title": "Un metodo corto, claro y creible.",
    "method.body":
      "El sitio explica con claridad como una moto llega hasta la venta, sin prometer servicios que no quieres ofrecer.",
    "method.step1.title": "Deteccion",
    "method.step1.body":
      "Seguimiento de los modelos objetivo, lectura del estado real y seleccion rigurosa de oportunidades.",
    "method.step2.title": "Compra dirigida",
    "method.step2.body":
      "Prioridad a motos completas, deseables y aptas para una puesta al dia seria.",
    "method.step3.title": "Preparacion",
    "method.step3.body":
      "Control, limpieza, trabajo de taller y presentacion final antes de publicar.",
    "method.step4.title": "Venta",
    "method.step4.body":
      "Difusion cuidada, contacto directo con los compradores y busqueda por encargo.",
    "contact.kicker": "Contacto",
    "contact.title": "Un sitio pensado para generar confianza y convertir.",
    "contact.body":
      "La base ya esta mucho mas cerca de tus capturas: negro, naranja, foto hero, catalogo, busqueda personalizada y servicios en bloques. El formulario ahora envia las solicitudes directamente por email.",
    "contact.panel1.title": "Posicionamiento",
    "contact.panel1.body":
      "Importacion selectiva de motos japonesas 2 tiempos de coleccion, puestas al dia y revendidas en Francia.",
    "contact.panel2.title": "Navegacion",
    "contact.panel2.body":
      "El sitio destaca las motos en stock, la busqueda por encargo, el taller y el contacto.",
    "contact.panel3.title": "Proximo paso",
    "contact.panel3.body":
      "Despues podremos sustituir los ejemplos por tus motos reales, tus textos reales y tus datos reales.",
    "footer.brand": "Nippon Heritage â€¢ Importacion de motos japonesas 2 tiempos de coleccion.",
    "footer.visuals": "Imagenes gratuitas obtenidas desde Unsplash.",
    "footer.note": "",
    "thanks.kicker": "Mensaje enviado",
    "thanks.title": "Gracias, la solicitud se ha enviado correctamente.",
    "thanks.body":
      "La solicitud sera tratada lo antes posible. Ya puede volver al sitio principal.",
    "thanks.cta": "Volver al inicio",
  },
  it: {
    "meta.home.title": "Nippon Heritage | Importazione di moto giapponesi 2 tempi",
    "meta.home.description":
      "Nippon Heritage seleziona in Giappone moto giapponesi 2 tempi da collezione, le rimette in ordine in Francia e poi le propone in vendita.",
    "meta.thanks.title": "Grazie | Nippon Heritage",
    "meta.thanks.description": "Pagina di conferma del modulo Nippon Heritage.",
    "top.strip": "Import selettivo dal Giappone â€¢ 2 tempi da collezione â€¢ Officina in Francia",
    "aria.langSwitch": "Lingue disponibili",
    "aria.brand": "Nippon Heritage",
    "aria.openMenu": "Apri il menu",
    "aria.primaryNav": "Navigazione principale",
    "aria.quickLinks": "Collegamenti rapidi",
    "common.logoAlt": "Logo Nippon Heritage",
    "common.japan": "Giappone",
    "common.viewMore": "Scopri di piu",
    "nav.home": "Home",
    "nav.stock": "Moto in stock",
    "nav.request": "Ricerca personalizzata",
    "nav.services": "Servizi",
    "nav.workshop": "Officina",
    "nav.contact": "Contatto",
    "nav.cta": "Fai una richiesta",
    "rail.stock": "Stock",
    "rail.request": "Richiesta",
    "rail.contact": "Contatto",
    "hero.kicker": "Nippon Heritage â€¢ Moto giapponesi da collezione",
    "hero.title": "Specialista nell'importazione di moto giapponesi 2 tempi.",
    "hero.body":
      "Selezioniamo in Giappone moto sane, poco chilometrate e desiderabili, poi le rimettiamo in ordine in Francia prima della rivendita. Niente omologazione, niente volume inutile, solo basi scelte con criterio.",
    "hero.ctaPrimary": "Vedi i modelli",
    "hero.ctaSecondary": "Ricerca su richiesta",
    "hero.card1.title": "Selezione in Giappone",
    "hero.card1.body":
      "Puntiamo su moto coerenti, pulite e interessanti per il collezionismo.",
    "hero.card2.title": "Passaggio in officina",
    "hero.card2.body":
      "Controllo, ripristino e presentazione prima della messa in vendita in Francia.",
    "hero.card3.title": "Posizionamento chiaro",
    "hero.card3.body":
      "Importazione, ripristino, vendita. Nessuna sezione omologazione sul sito.",
    "band.item1": "Import di moto da collezione",
    "band.item2": "Solo 2 tempi",
    "band.item3": "Giappone",
    "band.item4": "Basso chilometraggio preferito",
    "band.item5": "Officina in Francia",
    "band.item6": "Selezione rigorosa",
    "catalog.kicker": "Moto in stock",
    "catalog.title": "Esempi di arrivi e modelli seguiti.",
    "catalog.body":
      "La presentazione mantiene uno spirito catalogo chiaro, con filtri reali e schede moto coerenti.",
    "catalog.resultLabel": "modelli visualizzati",
    "catalog.toolbarNote": "Catalogo di presentazione ispirato al layout di riferimento.",
    "filters.searchLabel": "Cerca",
    "filters.searchPlaceholder": "NSR, TZR, RGV...",
    "filters.brandLabel": "Filtra per marca",
    "filters.brandAll": "Tutte le marche",
    "filters.typeLabel": "Filtra per tipo",
    "filters.typeAll": "Tutti i tipi",
    "filters.typeSportive": "Sportiva",
    "filters.typeRoadster": "Roadster",
    "filters.typeRarete": "Rarita",
    "filters.budgetLabel": "Budget massimo",
    "filters.sortLabel": "Ordina",
    "filters.sortRecent": "Anno piu recente",
    "filters.sortPriceAsc": "Prezzo crescente",
    "filters.sortPriceDesc": "Prezzo decrescente",
    "filters.sortYearAsc": "Anno piu vecchio",
    "filters.reset": "Reimposta filtri",
    "cards.nsr.body":
      "Iconica sportiva 2 tempi, con una base sana perfetta per una vendita da collezione.",
    "cards.tzr.body":
      "Profilo sportivo da collezione per appassionati dei 2 tempi giapponesi con forte identita.",
    "cards.rgv.body":
      "Una moto piu affilata, pensata per clienti alla ricerca di una vera rarita sportiva.",
    "cards.kr1s.body":
      "Posizionamento esperto e di nicchia, perfetto per un'identita da specialista.",
    "cards.r1z.body":
      "Roadster 2 tempi con molto carattere, ideale per differenziare il catalogo.",
    "cards.ns400.body":
      "Un pezzo piu raro, selezionato per rafforzare il posizionamento heritage del marchio.",
    "search.kicker": "Ricerca personalizzata",
    "search.title": "Hai in mente una moto precisa? Possiamo cercarla per te.",
    "search.body":
      "Il modulo riprende lo spirito del tuo riferimento ma lo adatta alla tua attivita: ricerca mirata, budget, base sana e solo moto 2 tempi da collezione.",
    "form.subject": "Nuova richiesta da Nippon Heritage",
    "form.brandLabel": "Marca",
    "form.brandPlaceholder": "Honda, Yamaha, Suzuki...",
    "form.modelLabel": "Modello",
    "form.modelPlaceholder": "NSR250R, TZR250, RGV250...",
    "form.typeLabel": "Tipo",
    "form.typeDefault": "Sportiva, roadster, rarita...",
    "form.yearLabel": "Anno minimo",
    "form.yearPlaceholder": "Es.: 1988",
    "form.engineLabel": "Cilindrata",
    "form.enginePlaceholder": "250 cc, 350 cc, 400 cc...",
    "form.budgetLabel": "Budget obiettivo",
    "form.nameLabel": "Cognome",
    "form.namePlaceholder": "Il tuo cognome",
    "form.firstnameLabel": "Nome",
    "form.firstnamePlaceholder": "Il tuo nome",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "tu@email.com",
    "form.phoneLabel": "Telefono",
    "form.phonePlaceholder": "Il tuo numero",
    "form.messageLabel": "Informazioni aggiuntive",
    "form.messagePlaceholder":
      "Indica la moto cercata, lo stato desiderato, i colori, la tolleranza chilometrica o il tuo obiettivo da collezione.",
    "form.submit": "Invia richiesta",
    "form.helper": "Le richieste vengono gestite tramite il modulo del sito.",
    "services.kicker": "Servizi",
    "services.title": "Importazione, selezione, officina e vendita di moto preparate.",
    "services.import.title": "Import selettivo dal Giappone",
    "services.import.body":
      "La ricerca non punta alla quantita. Ogni moto viene scelta per coerenza, stato di partenza e valore potenziale una volta presentata correttamente per il mercato francese.",
    "services.import.bullet1": "Ricerca di moto 2 tempi da collezione",
    "services.import.bullet2": "Priorita a basi sane e poco chilometrate",
    "services.import.bullet3": "Selezione adatta a una clientela da collezione",
    "services.workshop.title": "Preparazione in officina prima della vendita",
    "services.workshop.body":
      "Non proponi una semplice importazione grezza. Per questo il sito insiste su controllo, pulizia, presentazione e coerenza meccanica prima che una moto arrivi nelle mani di un acquirente.",
    "services.workshop.bullet1": "Controllo visivo e tecnico alla ricezione",
    "services.workshop.bullet2": "Interventi in base alle reali condizioni della moto",
    "services.workshop.bullet3": "Presentazione pulita e valorizzata prima della pubblicazione",
    "services.sale.title": "Vendita di moto da collezione con forte personalita",
    "services.sale.body":
      "Il messaggio commerciale si concentra su desiderabilita, fiducia e rarita, con una presentazione chiara e coerente.",
    "services.sale.bullet1": "Catalogo piu chiaro e di livello superiore",
    "services.sale.bullet2": "Ricerca personalizzata per richieste precise",
    "services.sale.bullet3": "Nessuna sezione omologazione sul sito",
    "method.kicker": "Officina e metodo",
    "method.title": "Un metodo breve, chiaro e credibile.",
    "method.body":
      "Il sito racconta con chiarezza come una moto arriva fino alla vendita, senza promettere servizi che non vuoi offrire.",
    "method.step1.title": "Selezione",
    "method.step1.body":
      "Monitoraggio dei modelli seguiti, lettura dello stato reale e selezione rigorosa delle opportunita.",
    "method.step2.title": "Acquisto mirato",
    "method.step2.body":
      "Priorita a moto complete, desiderabili e adatte a una rimessa in ordine seria.",
    "method.step3.title": "Preparazione",
    "method.step3.body":
      "Controllo, pulizia, lavoro in officina e presentazione finale prima della pubblicazione.",
    "method.step4.title": "Vendita",
    "method.step4.body":
      "Presentazione curata, contatto diretto con gli acquirenti e ricerca su richiesta.",
    "contact.kicker": "Contatto",
    "contact.title": "Un sito pensato per creare fiducia e convertire.",
    "contact.body":
      "La base e ora molto piu vicina ai tuoi screenshot: nero, arancione, hero photo, catalogo, ricerca personalizzata e servizi a blocchi. Il modulo invia ora le richieste direttamente via email.",
    "contact.panel1.title": "Posizionamento",
    "contact.panel1.body":
      "Import selettivo di moto giapponesi 2 tempi da collezione, rimesse in ordine e poi rivendute in Francia.",
    "contact.panel2.title": "Navigazione",
    "contact.panel2.body":
      "Il sito mette in evidenza le moto in stock, la ricerca su richiesta, l'officina e il contatto.",
    "contact.panel3.title": "Prossimo step",
    "contact.panel3.body":
      "Poi potremo sostituire gli esempi con le tue vere moto, i tuoi testi reali e i tuoi dati reali.",
    "footer.brand": "Nippon Heritage â€¢ Importazione di moto giapponesi 2 tempi da collezione.",
    "footer.visuals": "Visual gratuiti scaricati da Unsplash.",
    "footer.note": "",
    "thanks.kicker": "Messaggio inviato",
    "thanks.title": "Grazie, la richiesta e stata inviata correttamente.",
    "thanks.body":
      "La richiesta verra trattata il prima possibile. Ora puo tornare al sito principale.",
    "thanks.cta": "Torna alla home",
  },
};

Object.assign(translations.fr, {
  "meta.home.title": "Nippon Heritage | Import moto Japon, motos japonaises de collection et sportives 2 temps",
  "meta.home.description":
    "Nippon Heritage importe du Japon des motos japonaises de collection 2 temps et 4 temps, les remet en Ã©tat en France et les propose Ã  la vente.",
  "meta.thanks.title": "Merci | Demande envoyee a Nippon Heritage",
  "meta.thanks.description": "Confirmation dâ€™envoi du formulaire Nippon Heritage.",
  "top.strip": "Import sÃ©lectif depuis le Japon â€¢ 2 temps & 4 temps â€¢ Atelier en France",
  "aria.quickLinks": "AccÃ¨s rapides",
  "common.logoAlt": "Logo Nippon Heritage",
  "nav.request": "Recherche personnalisÃ©e",
  "hero.kicker": "Nippon Heritage â€¢ Sportives japonaises de collection",
  "hero.title": "SpÃ©cialiste de lâ€™import de motos japonaises 2 temps et 4 temps.",
  "hero.body":
    "Nous sourÃ§ons au Japon des motos saines, peu kilomÃ©trÃ©es et dÃ©sirables, puis nous les remettons en Ã©tat en France avant la revente. Pas dâ€™homologation, pas de volume inutile, uniquement des bases choisies.",
  "hero.ctaPrimary": "Voir les modÃ¨les",
  "hero.card1.title": "SÃ©lection au Japon",
  "hero.card1.body":
    "Nous visons des motos cohÃ©rentes, propres et intÃ©ressantes pour la collection.",
  "hero.card2.body":
    "ContrÃ´le, remise en Ã©tat et prÃ©sentation avant la mise en vente en France.",
  "hero.card3.body":
    "Import, remise en Ã©tat, vente. Aucune rubrique homologation nâ€™est proposÃ©e.",
  "band.item1": "Import de sportives japonaises",
  "band.item2": "2 temps & 4 temps",
  "band.item4": "Faible kilomÃ©trage privilÃ©giÃ©",
  "band.item6": "SÃ©lection rigoureuse",
  "catalog.title": "Quelques modÃ¨les reprÃ©sentatifs de notre sÃ©lection.",
  "catalog.body":
    "Cette sÃ©lection prÃ©sente des sportives japonaises 2 temps et 4 temps que nous pouvons proposer ou rechercher selon disponibilitÃ©.",
  "catalog.resultLabel": "modÃ¨les affichÃ©s",
  "catalog.toolbarNote": "Exemples de modÃ¨les suivis et rÃ©guliÃ¨rement recherchÃ©s.",
  "filters.searchPlaceholder": "RVF 400, NSR 250, VFR 400...",
  "filters.typeLabel": "Filtrer par motorisation",
  "filters.typeAll": "Toutes les motorisations",
  "filters.type2t": "2 temps",
  "filters.type4t": "4 temps",
  "filters.sortRecent": "AnnÃ©e rÃ©cente",
  "filters.sortPriceDesc": "Prix dÃ©croissant",
  "filters.sortYearAsc": "AnnÃ©e ancienne",
  "filters.reset": "RÃ©initialiser les filtres",
  "cards.rvf.body":
    "V4 4 temps iconique, trÃ¨s recherchÃ© pour son chÃ¢ssis compact et son identitÃ© RC45.",
  "cards.vfr.body":
    "Une 400 V4 de collection emblÃ©matique, parfaite pour une sÃ©lection sport japonaise premium.",
  "cards.cbr.body":
    "Une 400 quatre cylindres vive et lÃ©gÃ¨re, trÃ¨s cohÃ©rente pour une offre youngtimer sportive.",
  "cards.nsr.body":
    "Une vraie sportive 2 temps de collection, emblÃ©matique du marchÃ© japonais des annÃ©es 80-90.",
  "cards.rgv.body":
    "Une base 2 temps trÃ¨s dÃ©sirable, nerveuse et lÃ©gÃ¨re, idÃ©ale pour une vitrine plus racing.",
  "search.kicker": "Recherche personnalisÃ©e",
  "search.title": "Vous avez un modÃ¨le prÃ©cis en tÃªte ? Nous pouvons le rechercher au Japon pour vous.",
  "search.body":
    "Indiquez le modÃ¨le souhaitÃ©, votre budget et vos critÃ¨res. Nous revenons vers vous avec une recherche ciblÃ©e sur des motos cohÃ©rentes, saines et adaptÃ©es Ã  votre projet.",
  "form.modelLabel": "ModÃ¨le",
  "form.modelPlaceholder": "RVF400, VFR400, CBR400RR, NSR250, RGV250...",
  "form.typeLabel": "Motorisation",
  "form.typeDefault": "2 temps, 4 temps...",
  "form.yearLabel": "AnnÃ©e minimale",
  "form.yearPlaceholder": "Ex. : 1988",
  "form.engineLabel": "CylindrÃ©e",
  "form.enginePlaceholder": "250 cc, 400 cc...",
  "form.firstnameLabel": "PrÃ©nom",
  "form.firstnamePlaceholder": "Votre prÃ©nom",
  "form.phoneLabel": "TÃ©lÃ©phone",
  "form.phonePlaceholder": "Votre numÃ©ro",
  "form.messageLabel": "Informations complÃ©mentaires",
  "form.messagePlaceholder":
    "PrÃ©cisez la moto recherchÃ©e, lâ€™Ã©tat souhaitÃ©, les couleurs, la tolÃ©rance kilomÃ©trage ou votre objectif de collection.",
  "services.title": "Import, sÃ©lection, atelier et vente de motos japonaises 2 temps et 4 temps.",
  "services.import.title": "Import sÃ©lectif depuis le Japon",
  "services.import.body":
    "Le sourcing ne vise pas la quantitÃ©. Chaque moto est choisie pour sa cohÃ©rence, son Ã©tat de dÃ©part et sa valeur potentielle une fois remise en prÃ©sentation pour le marchÃ© franÃ§ais.",
  "services.import.bullet1": "Recherche de sportives japonaises 2 temps et 4 temps",
  "services.import.bullet2": "PrioritÃ© aux bases saines et peu kilomÃ©trÃ©es",
  "services.import.bullet3": "SÃ©lection adaptÃ©e Ã  une clientÃ¨le collection",
  "services.workshop.title": "Remise en Ã©tat atelier avant mise en vente",
  "services.workshop.body":
    "Chaque moto fait lâ€™objet dâ€™un contrÃ´le, dâ€™une remise en Ã©tat adaptÃ©e et dâ€™une prÃ©sentation soignÃ©e avant sa mise en vente.",
  "services.workshop.bullet1": "ContrÃ´le visuel et technique Ã  rÃ©ception",
  "services.workshop.bullet3": "PrÃ©sentation propre et valorisante avant diffusion",
  "services.sale.title": "Vente de motos de collection Ã  forte personnalitÃ©",
  "services.sale.body":
    "Nous privilÃ©gions une prÃ©sentation claire, sÃ©rieuse et documentÃ©e, en accord avec le niveau dâ€™exigence attendu sur ce type de motos.",
  "services.sale.bullet2": "Recherche personnalisÃ©e pour demandes prÃ©cises",
  "services.sale.bullet3": "Aucune rubrique homologation intÃ©grÃ©e au site",
  "method.kicker": "Atelier & mÃ©thode",
  "method.title": "Une mÃ©thode courte, lisible et crÃ©dible.",
  "method.body":
    "Notre mÃ©thode de travail est simple : sÃ©lectionner, contrÃ´ler, remettre en Ã©tat et proposer des motos cohÃ©rentes Ã  la vente.",
  "method.step1.title": "RepÃ©rage",
  "method.step1.body":
    "Veille des modÃ¨les suivis, lecture de lâ€™Ã©tat rÃ©el et tri rigoureux des opportunitÃ©s.",
  "method.step2.title": "Achat ciblÃ©",
  "method.step2.body":
    "PrioritÃ© aux motos complÃ¨tes, dÃ©sirables et adaptÃ©es Ã  une remise en Ã©tat sÃ©rieuse.",
  "method.step3.title": "PrÃ©paration",
  "method.step4.body":
    "Diffusion soignÃ©e, Ã©change direct avec les acheteurs et recherche sur commande.",
  "contact.title": "",
  "contact.body": "",
  "contact.panel1.body":
    "Import sÃ©lectif de motos japonaises 2 temps et 4 temps de collection, remises en Ã©tat puis revendues en France.",
  "contact.panel2.body":
    "Le site met en avant les modÃ¨les en stock, la recherche sur commande et lâ€™atelier.",
  "contact.panel3.title": "Ã‰tape suivante",
  "contact.panel3.body":
    "",
  "footer.brand": "Nippon Heritage â€¢ Import de motos japonaises 2 temps et 4 temps de collection.",
  "footer.visuals": "Photos de modÃ¨les issues de Wikimedia Commons.",
  "footer.note": "",
  "thanks.kicker": "Message envoyÃ©",
  "thanks.title": "Merci, votre demande a bien Ã©tÃ© transmise.",
  "thanks.body":
    "Nous revenons vers vous sur lâ€™email indiquÃ© dÃ¨s que possible. Vous pouvez maintenant retourner au site principal.",
  "thanks.cta": "Revenir Ã  lâ€™accueil",
});

Object.assign(translations.en, {
  "meta.home.title": "Nippon Heritage | Japanese 2-stroke and 4-stroke motorcycle imports",
  "meta.home.description":
    "Nippon Heritage sources collectible Japanese 2-stroke and 4-stroke motorcycles, refreshes them in France, and offers them for sale.",
  "top.strip": "Selective import from Japan â€¢ 2-stroke & 4-stroke â€¢ Workshop in France",
  "hero.kicker": "Nippon Heritage â€¢ Collectible Japanese sport bikes",
  "hero.title": "Specialist in imported Japanese 2-stroke and 4-stroke motorcycles.",
  "hero.body":
    "We source sound, low-mileage and desirable motorcycles in Japan, then refresh them in France before resale. No homologation, no unnecessary volume, only carefully chosen bikes.",
  "band.item1": "Import of Japanese sport bikes",
  "band.item2": "2-stroke & 4-stroke",
  "catalog.title": "A showcase mixing iconic 2-strokes and collectible 4-strokes.",
  "catalog.body":
    "The sample selection now highlights RVF 400, VFR 400, CBR 400, NSR 250 and RGV 250 models with matching visuals and a more credible sales presentation.",
  "catalog.toolbarNote": "Representative bikes currently followed and sourced by Nippon Heritage.",
  "filters.searchPlaceholder": "RVF 400, NSR 250, VFR 400...",
  "filters.typeLabel": "Filter by engine type",
  "filters.typeAll": "All engine types",
  "filters.type2t": "2-stroke",
  "filters.type4t": "4-stroke",
  "cards.rvf.body":
    "An iconic 4-stroke V4, highly desirable for its compact chassis and RC45-inspired character.",
  "cards.vfr.body":
    "A landmark 400cc V4 collector bike, perfect for a premium Japanese sport selection.",
  "cards.cbr.body":
    "A sharp and lightweight inline-four 400, ideal for a youngtimer sport offering.",
  "cards.nsr.body":
    "A true collectible 2-stroke sport bike, emblematic of the Japanese market of the late 80s and 90s.",
  "cards.rgv.body":
    "A highly desirable 2-stroke base, light and punchy, ideal for a more racing-focused showcase.",
  "search.title": "Have an RVF 400, NSR 250 or RGV 250 in mind? We can source it for you.",
  "search.body":
    "The form keeps the spirit of your reference while adapting it to your business: targeted sourcing, budget, healthy base, and coherent Japanese 2-stroke and 4-stroke selection.",
  "form.modelPlaceholder": "RVF400, VFR400, CBR400RR, NSR250, RGV250...",
  "form.typeLabel": "Engine type",
  "form.typeDefault": "2-stroke, 4-stroke...",
  "form.yearPlaceholder": "Ex.: 1988",
  "services.title": "Import, selection, workshop preparation and sale of Japanese 2-stroke and 4-stroke motorcycles.",
  "services.import.bullet1": "Search for collectible Japanese 2-stroke and 4-stroke sport bikes",
  "contact.panel1.body":
    "Selective import of collectible Japanese 2-stroke and 4-stroke motorcycles, refreshed and then resold in France.",
  "footer.brand": "Nippon Heritage â€¢ Import of collectible Japanese 2-stroke and 4-stroke motorcycles.",
  "footer.visuals": "Model photos sourced from Wikimedia Commons.",
});

Object.assign(translations.es, {
  "meta.home.title": "Nippon Heritage | ImportaciÃ³n de motos japonesas 2 tiempos y 4 tiempos",
  "meta.home.description":
    "Nippon Heritage selecciona en JapÃ³n motos japonesas de colecciÃ³n 2 tiempos y 4 tiempos, las pone al dÃ­a en Francia y luego las ofrece a la venta.",
  "top.strip": "ImportaciÃ³n selectiva desde JapÃ³n â€¢ 2 tiempos y 4 tiempos â€¢ Taller en Francia",
  "hero.title": "Especialista en importaciÃ³n de motos japonesas 2 tiempos y 4 tiempos.",
  "band.item2": "2 tiempos y 4 tiempos",
  "filters.typeLabel": "Filtrar por motor",
  "filters.typeAll": "Todos los motores",
  "filters.type2t": "2 tiempos",
  "filters.type4t": "4 tiempos",
  "cards.rvf.body":
    "Una V4 de 4 tiempos icÃ³nica, muy buscada por su chasis compacto y su carÃ¡cter inspirado en la RC45.",
  "cards.vfr.body":
    "Una 400 V4 de colecciÃ³n emblemÃ¡tica, perfecta para una selecciÃ³n sport japonesa premium.",
  "cards.cbr.body":
    "Una 400 de cuatro cilindros viva y ligera, ideal para una oferta youngtimer deportiva.",
  "search.title": "Â¿Tienes una RVF 400, una NSR 250 o una RGV 250 en mente? Podemos buscarla por ti.",
  "form.typeLabel": "MotorizaciÃ³n",
  "form.typeDefault": "2 tiempos, 4 tiempos...",
  "services.title": "ImportaciÃ³n, selecciÃ³n, taller y venta de motos japonesas 2 tiempos y 4 tiempos.",
  "footer.brand": "Nippon Heritage â€¢ ImportaciÃ³n de motos japonesas 2 tiempos y 4 tiempos de colecciÃ³n.",
  "footer.visuals": "Fotos de modelos procedentes de Wikimedia Commons.",
});

Object.assign(translations.it, {
  "meta.home.title": "Nippon Heritage | Importazione di moto giapponesi 2 tempi e 4 tempi",
  "meta.home.description":
    "Nippon Heritage seleziona in Giappone moto giapponesi da collezione 2 tempi e 4 tempi, le rimette in ordine in Francia e poi le propone in vendita.",
  "top.strip": "Import selettivo dal Giappone â€¢ 2 tempi e 4 tempi â€¢ Officina in Francia",
  "hero.title": "Specialista nell'importazione di moto giapponesi 2 tempi e 4 tempi.",
  "band.item2": "2 tempi e 4 tempi",
  "filters.typeLabel": "Filtra per motore",
  "filters.typeAll": "Tutte le motorizzazioni",
  "filters.type2t": "2 tempi",
  "filters.type4t": "4 tempi",
  "cards.rvf.body":
    "Una V4 4 tempi iconica, molto ricercata per il suo telaio compatto e il carattere ispirato alla RC45.",
  "cards.vfr.body":
    "Una 400 V4 da collezione emblematica, perfetta per una selezione sportiva giapponese premium.",
  "cards.cbr.body":
    "Una 400 quattro cilindri vivace e leggera, ideale per un'offerta youngtimer sportiva.",
  "search.title": "Hai in mente una RVF 400, una NSR 250 o una RGV 250? Possiamo cercarla per te.",
  "form.typeLabel": "Motorizzazione",
  "form.typeDefault": "2 tempi, 4 tempi...",
  "services.title": "Importazione, selezione, officina e vendita di moto giapponesi 2 tempi e 4 tempi.",
  "footer.brand": "Nippon Heritage â€¢ Importazione di moto giapponesi 2 tempi e 4 tempi da collezione.",
  "footer.visuals": "Foto dei modelli da Wikimedia Commons.",
});

Object.assign(translations.fr, {
  "meta.home.title": "Nippon Heritage | Import moto Japon, motos japonaises de collection et sportives 2 temps",
  "meta.home.description":
    "Nippon Heritage est specialise dans l'import moto Japon et la selection de motos japonaises de collection, sportives 2 temps et 4 temps, rares JDM et restaurees en France.",
  "meta.thanks.title": "Merci | Demande envoyee a Nippon Heritage",
  "meta.thanks.description": "Confirmation d'envoi de votre demande a Nippon Heritage.",
});

Object.assign(translations.en, {
  "meta.home.title": "Nippon Heritage | Japan motorcycle imports and collectible JDM sport bikes",
  "meta.home.description":
    "Nippon Heritage sources collectible Japanese motorcycles from Japan, including rare JDM two-strokes and four-strokes, then refreshes them in France before sale.",
  "meta.thanks.title": "Thank you | Request sent to Nippon Heritage",
  "meta.thanks.description": "Your request has been sent to Nippon Heritage.",
});

Object.assign(translations.es, {
  "meta.home.title": "Nippon Heritage | Importacion de motos japonesas y deportivas JDM de coleccion",
  "meta.home.description":
    "Nippon Heritage selecciona en Japon motos japonesas de coleccion, 2 tiempos y 4 tiempos, y las prepara en Francia antes de venderlas.",
  "meta.thanks.title": "Gracias | Solicitud enviada a Nippon Heritage",
  "meta.thanks.description": "Su solicitud ha sido enviada a Nippon Heritage.",
});

Object.assign(translations.it, {
  "meta.home.title": "Nippon Heritage | Importazione di moto giapponesi e sportive JDM da collezione",
  "meta.home.description":
    "Nippon Heritage seleziona in Giappone moto giapponesi da collezione, 2 tempi e 4 tempi, e le prepara in Francia prima della vendita.",
  "meta.thanks.title": "Grazie | Richiesta inviata a Nippon Heritage",
  "meta.thanks.description": "La richiesta e stata inviata a Nippon Heritage.",
});

Object.assign(translations.fr, {
  "hero.title": "Motos japonaises rares, selectionnees avec exigence.",
  "hero.body":
    "Nippon Heritage selectionne, importe et valorise des motos japonaises anciennes, rares et emblematiques.",
  "hero.ctaPrimary": "En savoir plus",
  "hero.ctaSecondary": "Voir les motos",
  "home.nav.kicker": "En savoir plus",
  "home.nav.title": "Un acces clair et direct aux pages essentielles du site.",
  "home.nav.body":
    "Retrouvez rapidement les sections importantes du site sans perdre l'ambiance atelier et collection de Nippon Heritage.",
  "home.nav.about.title": "A propos",
  "home.nav.about.body": "Decouvrir l'approche, la selection et le positionnement Nippon Heritage.",
  "home.nav.stock.title": "Motos en vente",
  "home.nav.stock.body": "Voir les modeles presentes en stock ou utilises comme references de selection.",
  "home.nav.request.title": "Recherche personnalisee",
  "home.nav.request.body": "Confier une recherche ciblee au Japon selon vos criteres et votre budget.",
  "home.nav.services.title": "Services",
  "home.nav.services.body": "Retrouver l'import, la preparation atelier, la presentation et la vente.",
  "home.nav.workshop.title": "Atelier / restauration",
  "home.nav.workshop.body": "Comprendre la methode, le controle et la remise en etat avant diffusion.",
  "home.nav.contact.title": "Contact",
  "home.nav.contact.body": "Echanger directement au sujet d'un modele, d'un arrivage ou d'une recherche.",
  "home.about.kicker": "A propos",
  "home.about.title": "Une approche selective, pensee pour des motos qui meritent mieux qu'un simple import.",
  "home.about.body":
    "Nippon Heritage selectionne, importe et valorise des motos japonaises anciennes, rares et emblematiques.",
  "home.about.card1.title": "Bases choisies avec exigence",
  "home.about.card1.body":
    "Les motos retenues privilegient la coherence d'ensemble, la desirabilite et un historique lisible.",
  "home.about.card2.title": "Presentation atelier avant diffusion",
  "home.about.card2.body":
    "Chaque machine passe par une remise en etat adaptee avant sa mise en vente en France.",
  "home.contact.kicker": "Contact",
  "home.contact.title": "Echangez avec Nippon Heritage au sujet d'une moto ou d'une recherche ciblee.",
  "home.contact.body":
    "Pour un modele precis, une demande d'approvisionnement ou un premier echange, la page de contact et le formulaire dedie permettent un premier echange simple et direct.",
  "home.contact.panel1.title": "Recherche personnalisee",
  "home.contact.panel1.body":
    "Indiquez le modele souhaite, votre budget et le niveau d'exigence attendu pour la selection.",
  "home.contact.panel2.title": "Motos en vente",
  "home.contact.panel2.body":
    "Les motos publiees peuvent etre completees par des recherches en cours ou des arrivages a venir.",
  "home.contact.panel3.title": "Atelier et presentation",
  "home.contact.panel3.body":
    "La mise en vente s'appuie sur une preparation claire, une presentation serieuse et un echange direct.",
});

Object.assign(translations.en, {
  "hero.title": "Rare Japanese motorcycles, selected with real standards.",
  "hero.body":
    "Nippon Heritage selects, imports and enhances rare, iconic and collectible Japanese motorcycles.",
  "hero.ctaPrimary": "Learn more",
  "hero.ctaSecondary": "View the bikes",
  "home.nav.kicker": "Learn more",
  "home.nav.title": "A clear and direct gateway to the key pages of the website.",
  "home.nav.body":
    "Reach the key sections quickly without losing the workshop and heritage atmosphere of Nippon Heritage.",
  "home.nav.about.title": "About",
  "home.nav.about.body": "Understand the approach, the selection process and the Nippon Heritage positioning.",
  "home.nav.stock.title": "Bikes for sale",
  "home.nav.stock.body": "See the bikes currently shown in stock or used as selection references.",
  "home.nav.request.title": "Custom sourcing",
  "home.nav.request.body": "Request a focused search in Japan based on your criteria and budget.",
  "home.nav.services.title": "Services",
  "home.nav.services.body": "Find import, workshop preparation, presentation and sales support.",
  "home.nav.workshop.title": "Workshop / restoration",
  "home.nav.workshop.body": "Review the method, inspection and refurbishment approach before listing.",
  "home.nav.contact.title": "Contact",
  "home.nav.contact.body": "Get in touch directly about a model, an incoming bike or a specific request.",
  "home.about.kicker": "About",
  "home.about.title": "A selective approach built for motorcycles that deserve more than simple import.",
  "home.about.body":
    "Nippon Heritage selects, imports and enhances rare, iconic and collectible Japanese motorcycles.",
  "home.about.card1.title": "Carefully chosen bases",
  "home.about.card1.body":
    "Selected motorcycles prioritize overall consistency, desirability and a readable history.",
  "home.about.card2.title": "Workshop presentation before sale",
  "home.about.card2.body":
    "Each machine goes through an appropriate workshop pass before being offered in France.",
  "home.contact.kicker": "Contact",
  "home.contact.title": "Talk with Nippon Heritage about a motorcycle or a targeted sourcing request.",
  "home.contact.body":
    "For a specific model, a sourcing request or a first conversation, the contact page and the dedicated form remain the clearest access points.",
  "home.contact.panel1.title": "Custom sourcing",
  "home.contact.panel1.body":
    "Share the model you want, your budget and the level of selectivity you expect from the search.",
  "home.contact.panel2.title": "Bikes for sale",
  "home.contact.panel2.body":
    "Published bikes can be complemented by ongoing searches or upcoming arrivals.",
  "home.contact.panel3.title": "Workshop and presentation",
  "home.contact.panel3.body":
    "Every listing is supported by a clear preparation process, a serious presentation and direct exchanges.",
});

Object.assign(translations.es, {
  "hero.title": "Motos japonesas raras, seleccionadas con exigencia.",
  "hero.body":
    "Nippon Heritage selecciona, importa y valoriza motos japonesas antiguas, raras y emblematicas.",
  "hero.ctaPrimary": "Saber mas",
  "hero.ctaSecondary": "Ver las motos",
  "home.nav.kicker": "Saber mas",
  "home.nav.title": "Un acceso claro y directo a las paginas esenciales del sitio.",
  "home.nav.body":
    "Acceda rapidamente a las secciones principales sin perder la atmosfera de taller y coleccion de Nippon Heritage.",
  "home.nav.about.title": "Acerca de",
  "home.nav.about.body": "Descubra el enfoque, la seleccion y el posicionamiento de Nippon Heritage.",
  "home.nav.stock.title": "Motos en venta",
  "home.nav.stock.body": "Ver las motos mostradas en stock o utilizadas como referencias de seleccion.",
  "home.nav.request.title": "Busqueda personalizada",
  "home.nav.request.body": "Encargar una busqueda precisa en Japon segun sus criterios y su presupuesto.",
  "home.nav.services.title": "Servicios",
  "home.nav.services.body": "Encontrar importacion, preparacion de taller, presentacion y venta.",
  "home.nav.workshop.title": "Taller / restauracion",
  "home.nav.workshop.body": "Comprender el metodo, la inspeccion y la puesta a punto antes de la publicacion.",
  "home.nav.contact.title": "Contacto",
  "home.nav.contact.body": "Hablar directamente sobre un modelo, una llegada o una busqueda concreta.",
  "home.about.kicker": "Acerca de",
  "home.about.title": "Un enfoque selectivo pensado para motos que merecen mas que una simple importacion.",
  "home.about.body":
    "Nippon Heritage selecciona, importa y valoriza motos japonesas antiguas, raras y emblematicas.",
  "home.about.card1.title": "Bases elegidas con exigencia",
  "home.about.card1.body":
    "Las motos retenidas priorizan la coherencia general, el interes de coleccion y un historial legible.",
  "home.about.card2.title": "Presentacion de taller antes de la venta",
  "home.about.card2.body":
    "Cada moto pasa por una puesta a punto adaptada antes de ofrecerse en Francia.",
  "home.contact.kicker": "Contacto",
  "home.contact.title": "Hable con Nippon Heritage sobre una moto o una busqueda dirigida.",
  "home.contact.body":
    "Para un modelo concreto, una solicitud de aprovisionamiento o un primer intercambio, la pagina de contacto y el formulario dedicado ofrecen el acceso mas claro.",
  "home.contact.panel1.title": "Busqueda personalizada",
  "home.contact.panel1.body":
    "Indique el modelo deseado, su presupuesto y el nivel de exigencia esperado para la seleccion.",
  "home.contact.panel2.title": "Motos en venta",
  "home.contact.panel2.body":
    "Las motos publicadas pueden completarse con busquedas en curso o proximas llegadas.",
  "home.contact.panel3.title": "Taller y presentacion",
  "home.contact.panel3.body":
    "La puesta en venta se apoya en una preparacion clara, una presentacion seria y un intercambio directo.",
});

Object.assign(translations.it, {
  "hero.title": "Moto giapponesi rare, selezionate con rigore.",
  "hero.body":
    "Nippon Heritage seleziona, importa e valorizza moto giapponesi d'epoca, rare ed emblematiche.",
  "hero.ctaPrimary": "Scoprire di piu",
  "hero.ctaSecondary": "Vedere le moto",
  "home.nav.kicker": "Scoprire di piu",
  "home.nav.title": "Un accesso chiaro e diretto alle pagine essenziali del sito.",
  "home.nav.body":
    "Raggiunga rapidamente le sezioni principali senza perdere l'atmosfera officina e heritage di Nippon Heritage.",
  "home.nav.about.title": "Chi siamo",
  "home.nav.about.body": "Scoprire l'approccio, la selezione e il posizionamento di Nippon Heritage.",
  "home.nav.stock.title": "Moto in vendita",
  "home.nav.stock.body": "Vedere le moto presenti in stock o utilizzate come riferimenti di selezione.",
  "home.nav.request.title": "Ricerca personalizzata",
  "home.nav.request.body": "Affidare una ricerca mirata in Giappone secondo i suoi criteri e il suo budget.",
  "home.nav.services.title": "Servizi",
  "home.nav.services.body": "Trovare importazione, preparazione in officina, presentazione e vendita.",
  "home.nav.workshop.title": "Officina / restauro",
  "home.nav.workshop.body": "Comprendere metodo, controllo e rimessa in ordine prima della pubblicazione.",
  "home.nav.contact.title": "Contatto",
  "home.nav.contact.body": "Parlare direttamente di un modello, di un arrivo o di una ricerca specifica.",
  "home.about.kicker": "Chi siamo",
  "home.about.title": "Un approccio selettivo pensato per moto che meritano piu di una semplice importazione.",
  "home.about.body":
    "Nippon Heritage seleziona, importa e valorizza moto giapponesi d'epoca, rare ed emblematiche.",
  "home.about.card1.title": "Basi scelte con rigore",
  "home.about.card1.body":
    "Le moto selezionate privilegiano coerenza generale, desiderabilita e una storia leggibile.",
  "home.about.card2.title": "Presentazione officina prima della vendita",
  "home.about.card2.body":
    "Ogni moto passa da una rimessa in ordine adeguata prima di essere proposta in Francia.",
  "home.contact.kicker": "Contatto",
  "home.contact.title": "Parli con Nippon Heritage di una moto o di una ricerca mirata.",
  "home.contact.body":
    "Per un modello preciso, una richiesta di approvvigionamento o un primo contatto, la pagina contatti e il modulo dedicato restano gli accessi piu chiari.",
  "home.contact.panel1.title": "Ricerca personalizzata",
  "home.contact.panel1.body":
    "Indichi il modello desiderato, il suo budget e il livello di selezione atteso per la ricerca.",
  "home.contact.panel2.title": "Moto in vendita",
  "home.contact.panel2.body":
    "Le moto pubblicate possono essere affiancate da ricerche in corso o prossimi arrivi.",
  "home.contact.panel3.title": "Officina e presentazione",
  "home.contact.panel3.body":
    "La messa in vendita si basa su una preparazione chiara, una presentazione seria e un dialogo diretto.",
});

Object.assign(translations.fr, {
  "meta.home.title": "Nippon Heritage | Import moto Japon, motos japonaises de collection et sportives 2 temps",
  "meta.home.description":
    "Nippon Heritage est spÃ©cialisÃ© dans lâ€™import moto Japon et la sÃ©lection de motos japonaises de collection, sportives 2 temps et 4 temps, rares JDM et restaurÃ©es en France.",
  "meta.stock.title": "Motos disponibles | Nippon Heritage",
  "meta.stock.description":
    "DÃ©couvrez les motos japonaises disponibles chez Nippon Heritage : 2 temps, 4 temps, sportives rares et modÃ¨les de collection.",
  "meta.request.title": "Recherche personnalisÃ©e | Nippon Heritage",
  "meta.request.description":
    "DÃ©crivez la moto japonaise recherchÃ©e et confiez Ã  Nippon Heritage une sÃ©lection ciblÃ©e au Japon selon vos critÃ¨res.",
  "meta.servicesPage.title": "Services | Nippon Heritage",
  "meta.servicesPage.description":
    "Import sÃ©lectif, prÃ©paration atelier et vente de motos japonaises 2 temps et 4 temps chez Nippon Heritage.",
  "meta.workshopPage.title": "Atelier et restauration | Nippon Heritage",
  "meta.workshopPage.description":
    "DÃ©couvrez la mÃ©thode atelier Nippon Heritage : contrÃ´le, remise en Ã©tat, prÃ©paration et prÃ©sentation avant mise en vente.",
  "meta.about.title": "Ã€ propos | Nippon Heritage",
  "meta.about.description":
    "DÃ©couvrez lâ€™approche Nippon Heritage : sÃ©lection exigeante, import ciblÃ© et valorisation de motos japonaises anciennes et rares.",
  "meta.contactPage.title": "Contact | Nippon Heritage",
  "meta.contactPage.description":
    "Contactez Nippon Heritage pour une moto disponible, une recherche personnalisÃ©e ou un Ã©change autour de votre projet.",
  "meta.thanks.title": "Merci | Demande envoyÃ©e Ã  Nippon Heritage",
  "meta.thanks.description": "Confirmation dâ€™envoi de votre demande Ã  Nippon Heritage.",
  "top.strip": "Import sÃ©lectif depuis le Japon â€¢ 2 temps & 4 temps â€¢ Atelier en France",
  "aria.quickLinks": "AccÃ¨s rapides",
  "common.logoAlt": "Logo Nippon Heritage",
  "nav.stock": "Motos disponibles",
  "nav.request": "Recherche personnalisÃ©e",
  "nav.contact": "Contact",
  "nav.cta": "Faire une demande",
  "hero.kicker": "Nippon Heritage â€¢ Sportives japonaises de collection",
  "hero.title": "Motos japonaises rares, sÃ©lectionnÃ©es avec exigence.",
  "hero.body":
    "Nippon Heritage sÃ©lectionne, importe et valorise des motos japonaises anciennes, rares et emblÃ©matiques.",
  "hero.ctaPrimary": "En savoir plus",
  "hero.ctaSecondary": "Voir les motos",
  "hero.card1.title": "SÃ©lection au Japon",
  "hero.card1.body": "Nous visons des motos cohÃ©rentes, propres et intÃ©ressantes pour la collection.",
  "hero.card2.title": "Passage atelier",
  "hero.card2.body": "ContrÃ´le, remise en Ã©tat et prÃ©sentation avant la mise en vente en France.",
  "hero.card3.title": "Positionnement clair",
  "hero.card3.body": "Import, remise en Ã©tat, vente. Aucune rubrique homologation nâ€™est proposÃ©e.",
  "band.item1": "Import de sportives japonaises",
  "band.item2": "2 temps & 4 temps",
  "band.item4": "Faible kilomÃ©trage privilÃ©giÃ©",
  "catalog.title": "Exemples dâ€™arrivages et de modÃ¨les suivis.",
  "catalog.body":
    "Cette sÃ©lection prÃ©sente des sportives japonaises 2 temps et 4 temps que nous pouvons proposer ou rechercher selon disponibilitÃ©.",
  "catalog.resultLabel": "modÃ¨les affichÃ©s",
  "catalog.toolbarNote": "Exemples de modÃ¨les suivis et rÃ©guliÃ¨rement recherchÃ©s.",
  "filters.typeLabel": "Filtrer par motorisation",
  "filters.typeAll": "Toutes les motorisations",
  "filters.sortRecent": "AnnÃ©e rÃ©cente",
  "filters.sortPriceDesc": "Prix dÃ©croissant",
  "filters.sortYearAsc": "AnnÃ©e ancienne",
  "filters.reset": "RÃ©initialiser les filtres",
  "cards.rvf.body":
    "V4 4 temps iconique, trÃ¨s recherchÃ©e pour son chÃ¢ssis compact et son identitÃ© RC45.",
  "cards.vfr.body":
    "Une 400 V4 de collection emblÃ©matique, parfaite pour une sÃ©lection sport japonaise premium.",
  "cards.cbr.body":
    "Une 400 quatre cylindres vive et lÃ©gÃ¨re, trÃ¨s cohÃ©rente pour une offre youngtimer sportive.",
  "cards.nsr.body":
    "Sportive 2 temps emblÃ©matique, base saine privilÃ©giÃ©e pour une vente collection.",
  "cards.rgv.body":
    "Machine plus pointue, destinÃ©e Ã  une clientÃ¨le qui cherche une vraie raretÃ© sportive.",
  "search.kicker": "Recherche personnalisÃ©e",
  "search.title": "Vous avez un modÃ¨le prÃ©cis en tÃªte ? Nous pouvons le rechercher au Japon pour vous.",
  "search.body":
    "Indiquez le modÃ¨le souhaitÃ©, votre budget et vos critÃ¨res. Nous revenons vers vous avec une recherche ciblÃ©e sur des motos cohÃ©rentes, saines et adaptÃ©es Ã  votre projet.",
  "form.modelLabel": "ModÃ¨le",
  "form.typeLabel": "Motorisation",
  "form.typeDefault": "2 temps, 4 temps...",
  "form.yearLabel": "AnnÃ©e minimale",
  "form.engineLabel": "CylindrÃ©e",
  "form.emailLabel": "E-mail",
  "form.phoneLabel": "TÃ©lÃ©phone",
  "form.messageLabel": "Informations complÃ©mentaires",
  "form.messagePlaceholder":
    "PrÃ©cisez la moto recherchÃ©e, lâ€™Ã©tat souhaitÃ©, les couleurs, la tolÃ©rance kilomÃ©trage ou votre objectif de collection.",
  "services.title": "Import, sÃ©lection, atelier et vente de motos japonaises 2 temps et 4 temps.",
  "services.import.title": "Import sÃ©lectif depuis le Japon",
  "services.import.body":
    "Le sourcing ne vise pas la quantitÃ©. Chaque moto est choisie pour sa cohÃ©rence, son Ã©tat de dÃ©part et sa valeur potentielle une fois remise en prÃ©sentation pour le marchÃ© franÃ§ais.",
  "services.import.bullet1": "Recherche de sportives japonaises 2 temps et 4 temps",
  "services.import.bullet2": "PrioritÃ© aux bases saines et peu kilomÃ©trÃ©es",
  "services.import.bullet3": "SÃ©lection adaptÃ©e Ã  une clientÃ¨le collection",
  "services.workshop.title": "Remise en Ã©tat atelier avant mise en vente",
  "services.workshop.body":
    "Chaque moto fait lâ€™objet dâ€™un contrÃ´le, dâ€™une remise en Ã©tat adaptÃ©e et dâ€™une prÃ©sentation soignÃ©e avant sa mise en vente.",
  "services.workshop.bullet1": "ContrÃ´le visuel et technique Ã  rÃ©ception",
  "services.workshop.bullet2": "Interventions selon lâ€™Ã©tat rÃ©el de la machine",
  "services.workshop.bullet3": "PrÃ©sentation propre et valorisante avant diffusion",
  "services.sale.title": "Vente de motos de collection Ã  forte personnalitÃ©",
  "services.sale.body":
    "Nous privilÃ©gions une prÃ©sentation claire, sÃ©rieuse et documentÃ©e, en accord avec le niveau dâ€™exigence attendu sur ce type de motos.",
  "services.sale.bullet2": "Recherche personnalisÃ©e pour demandes prÃ©cises",
  "services.sale.bullet3": "Aucune rubrique homologation intÃ©grÃ©e au site",
  "method.kicker": "Atelier & mÃ©thode",
  "method.title": "Une mÃ©thode courte, lisible et crÃ©dible.",
  "method.body":
    "Notre mÃ©thode de travail est simple : sÃ©lectionner, contrÃ´ler, remettre en Ã©tat et proposer des motos cohÃ©rentes Ã  la vente.",
  "method.step1.title": "RepÃ©rage",
  "method.step1.body": "Veille des modÃ¨les suivis, lecture de lâ€™Ã©tat rÃ©el et tri rigoureux des opportunitÃ©s.",
  "method.step2.title": "Achat ciblÃ©",
  "method.step2.body": "PrioritÃ© aux motos complÃ¨tes, dÃ©sirables et adaptÃ©es Ã  une remise en Ã©tat sÃ©rieuse.",
  "method.step3.title": "PrÃ©paration",
  "method.step3.body": "ContrÃ´le, nettoyage, intervention atelier et mise en prÃ©sentation avant publication.",
  "method.step4.body": "Diffusion soignÃ©e, Ã©change direct avec les acheteurs et recherche sur commande.",
  "footer.brand": "Nippon Heritage â€¢ Import de motos japonaises 2 temps et 4 temps de collection.",
  "thanks.kicker": "Message envoyÃ©",
  "thanks.title": "Merci, votre demande a bien Ã©tÃ© transmise.",
  "thanks.body":
    "Nous revenons vers vous sur lâ€™e-mail indiquÃ© dÃ¨s que possible. Vous pouvez maintenant retourner au site principal.",
  "thanks.cta": "Revenir Ã  lâ€™accueil",
  "home.nav.kicker": "En savoir plus",
  "home.nav.title": "Un accÃ¨s clair et direct aux pages essentielles du site.",
  "home.nav.body":
    "Lâ€™accueil reste volontairement court et met dÃ©sormais lâ€™accent sur les accÃ¨s vers les pages utiles : stock, demande, services, atelier, contact et prÃ©sentation.",
  "home.nav.about.title": "Ã€ propos",
  "home.nav.about.body": "DÃ©couvrir lâ€™approche, la sÃ©lection et le positionnement Nippon Heritage.",
  "home.nav.stock.title": "Motos disponibles",
  "home.nav.stock.body": "Voir les modÃ¨les en vente et les rÃ©fÃ©rences actuellement proposÃ©es.",
  "home.nav.request.title": "Recherche personnalisÃ©e",
  "home.nav.request.body": "Confier une recherche ciblÃ©e au Japon selon vos critÃ¨res et votre budget.",
  "home.nav.services.title": "Services",
  "home.nav.services.body": "Retrouver lâ€™import, la prÃ©paration atelier, la prÃ©sentation et la vente.",
  "home.nav.workshop.title": "Atelier / restauration",
  "home.nav.workshop.body": "Comprendre la mÃ©thode, le contrÃ´le et la remise en Ã©tat avant diffusion.",
  "home.nav.contact.title": "Contact",
  "home.nav.contact.body": "Ã‰changer directement au sujet dâ€™un modÃ¨le, dâ€™un arrivage ou dâ€™une demande.",
  "home.about.kicker": "Ã€ propos",
  "home.about.title": "Une approche sÃ©lective, pensÃ©e pour des motos qui mÃ©ritent mieux quâ€™un simple import.",
  "home.about.body":
    "Nippon Heritage sÃ©lectionne, importe et valorise des motos japonaises anciennes, rares et emblÃ©matiques.",
  "home.about.card1.body":
    "Les motos retenues privilÃ©gient la cohÃ©rence dâ€™ensemble, la dÃ©sirabilitÃ© et un historique lisible.",
  "home.about.card2.title": "PrÃ©sentation atelier avant diffusion",
  "home.about.card2.body":
    "Chaque machine passe par une remise en Ã©tat adaptÃ©e avant sa mise en vente en France.",
  "home.contact.title": "Ã‰changez avec Nippon Heritage au sujet dâ€™une moto ou dâ€™une recherche ciblÃ©e.",
  "home.contact.body":
    "Pour un modÃ¨le prÃ©cis, une demande dâ€™approvisionnement ou un premier Ã©change, la page de contact et le formulaire dÃ©diÃ© permettent un premier Ã©change simple et direct.",
  "home.contact.panel1.title": "Recherche personnalisÃ©e",
  "home.contact.panel1.body":
    "Indiquez le modÃ¨le souhaitÃ©, votre budget et le niveau dâ€™exigence attendu pour la sÃ©lection.",
  "home.contact.panel2.title": "Motos en vente",
  "home.contact.panel2.body":
    "Les motos publiÃ©es peuvent Ãªtre complÃ©tÃ©es par des recherches en cours ou des arrivages Ã  venir.",
  "home.contact.panel3.title": "Atelier et prÃ©sentation",
  "home.contact.panel3.body":
    "La mise en vente sâ€™appuie sur une prÃ©paration claire, une prÃ©sentation sÃ©rieuse et un Ã©change direct.",
});

const supportedLanguages = Object.keys(translations);
let currentLanguage = defaultLanguage;
let runtimeConfig = {
  siteUrl: defaultSiteUrl,
  googleSiteVerification: "",
};

const getSiteUrl = () => (runtimeConfig.siteUrl || defaultSiteUrl).replace(/\/+$/, "");
const getPagePath = () => {
  if (page === "thanks") return "/merci";
  if (page === "product") return window.location.pathname;
  if (page === "stock") return "/motos-disponibles";
  if (page === "request") return "/recherche-personnalisee";
  if (page === "servicesPage") return "/services";
  if (page === "workshopPage") return "/atelier-restauration";
  if (page === "about") return "/a-propos";
  if (page === "contactPage") return "/contact";
  if (page === "legalMentions") return "/mentions-legales";
  if (page === "legalPrivacy") return "/politique-confidentialite";
  if (page === "legalCookies") return "/politique-cookies";
  return "/";
};
const getPublicUrl = (language = currentLanguage, includeLanguageParam = true) => {
  const url = new URL(getPagePath(), `${getSiteUrl()}/`);
  if (includeLanguageParam && language && language !== defaultLanguage) {
    url.searchParams.set("lang", language);
  }
  return url.toString();
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizeEngineType = (value = "") => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized.startsWith("2")) {
    return { filterValue: "2t", badge: "2T" };
  }
  if (normalized.startsWith("4")) {
    return { filterValue: "4t", badge: "4T" };
  }
  return {
    filterValue: normalized || "all",
    badge: normalized ? String(value).toUpperCase() : "-",
  };
};

const buildStockSearchText = (item, engine) =>
  [
    item.title,
    item.brand,
    item.model,
    item.slug,
    item.year,
    item.displacement,
    item.origin_country,
    engine.filterValue,
    engine.badge,
    "japon",
    "japan",
    "jdm",
  ]
    .filter(Boolean)
    .join(" ");

const buildStockCardMarkup = (item) => {
  const engine = normalizeEngineType(item.engine_type);
  const country = escapeHtml(item.origin_country || translate("common.japan"));
  const title = escapeHtml(item.title || "Moto Nippon Heritage");
  const description = escapeHtml(
    item.description || "Moto japonaise de collection selectionnee par Nippon Heritage."
  );
  const image = escapeHtml(item.images?.[0] || "/assets/images/stock/vfr400.jpg");
  const price = Number(item.price || 0);
  const yearValue = Number(item.year || 0);
  const displacement = escapeHtml(item.displacement || "-");
  const brand = escapeHtml(item.brand || "");
  const searchText = escapeHtml(buildStockSearchText(item, engine));
  const href = escapeHtml(item.slug ? `/motos/${encodeURIComponent(item.slug)}` : "/#commande");

  return `
    <article
      class="stock-card"
      data-brand="${brand}"
      data-type="${engine.filterValue}"
      data-price="${price}"
      data-year="${yearValue}"
      data-search="${searchText}"
    >
      <img src="${image}" alt="${title}" width="1280" height="960" loading="lazy" decoding="async" />
      <div class="stock-card-body">
        <div class="stock-badges">
          <span>${yearValue || "-"}</span>
          <span>${displacement}</span>
          <span>${engine.badge}</span>
          <span>${country}</span>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="stock-footer">
          <strong>${formatCurrency(price)}</strong>
          <a href="${href}" data-i18n="common.viewMore">${translate("common.viewMore")}</a>
        </div>
      </div>
    </article>
  `;
};

const renderRemoteStock = (items) => {
  if (!stockGrid || !Array.isArray(items) || !items.length) return;

  stockGrid.innerHTML = items.map((item) => buildStockCardMarkup(item)).join("");
  stockCards = Array.from(stockGrid.querySelectorAll(".stock-card"));
  if (currentLanguage !== defaultLanguage) {
    updateTranslatedText();
  }
  syncBrandFilterOptions();
  updateStockPrices();
  applyStockFilters();
};

const loadRuntimeConfig = async () => {
  try {
    const response = await fetch("/api/public/config", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return;

    const config = await response.json();
    runtimeConfig = {
      ...runtimeConfig,
      ...config,
      siteUrl: config.siteUrl || runtimeConfig.siteUrl,
      googleSiteVerification: config.googleSiteVerification || "",
    };

    updateMeta();
  } catch {}
};

const loadPublishedMotorcycles = async () => {
  if (page !== "home" || !stockGrid) return;

  try {
    const response = await fetch("/api/public/motorcycles", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return;

    const payload = await response.json();
    if (Array.isArray(payload.items) && payload.items.length) {
      renderRemoteStock(payload.items);
    }
  } catch {}
};

const translate = (key) =>
  translations[currentLanguage]?.[key] ?? translations[defaultLanguage]?.[key] ?? key;

const normalizeValue = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

const formatCurrency = (value) =>
  new Intl.NumberFormat(localeMap[currentLanguage] || localeMap[defaultLanguage], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u00a0/g, " ");

const setStoredLanguage = (language) => {
  try {
    localStorage.setItem(storageKey, language);
  } catch {}
};

const getStoredLanguage = () => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
};

const getInitialLanguage = () => {
  const url = new URL(window.location.href);
  const fromQuery = url.searchParams.get("lang");
  if (supportedLanguages.includes(fromQuery)) {
    return fromQuery;
  }

  const fromStorage = getStoredLanguage();
  if (supportedLanguages.includes(fromStorage)) {
    return fromStorage;
  }

  return defaultLanguage;
};

const syncLanguageButtons = () => {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const syncLanguageInUrl = () => {
  const url = new URL(window.location.href);
  if (currentLanguage === defaultLanguage) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", currentLanguage);
  }

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
};

const updateMeta = () => {
  if (currentLanguage === defaultLanguage) {
    if (googleVerificationMeta && runtimeConfig.googleSiteVerification) {
      googleVerificationMeta.setAttribute("content", runtimeConfig.googleSiteVerification);
    }
    return;
  }

  const titleKey = `meta.${page}.title`;
  const descriptionKey = `meta.${page}.description`;
  const hasPageMeta = Boolean(
    translations[currentLanguage]?.[titleKey] || translations[defaultLanguage]?.[titleKey]
  );

  if (!hasPageMeta) {
    if (googleVerificationMeta && runtimeConfig.googleSiteVerification) {
      googleVerificationMeta.setAttribute("content", runtimeConfig.googleSiteVerification);
    }
    return;
  }

  const title = translate(titleKey);
  const description = translate(descriptionKey);
  const locale = (localeMap[currentLanguage] || localeMap[defaultLanguage] || "fr-FR").replace("-", "_");

  document.title = title;
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
  if (canonicalLink) {
    canonicalLink.setAttribute("href", getPublicUrl(defaultLanguage, false));
  }
  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }
  if (ogDescription) {
    ogDescription.setAttribute("content", description);
  }
  if (ogUrl) {
    ogUrl.setAttribute("content", getPublicUrl(currentLanguage, true));
  }
  if (ogLocale) {
    ogLocale.setAttribute("content", locale);
  }
  if (twitterTitle) {
    twitterTitle.setAttribute("content", title);
  }
  if (twitterDescription) {
    twitterDescription.setAttribute("content", description);
  }
  if (googleVerificationMeta && runtimeConfig.googleSiteVerification) {
    googleVerificationMeta.setAttribute("content", runtimeConfig.googleSiteVerification);
  }
};

const updateTranslatedText = () => {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-value]").forEach((element) => {
    element.value = translate(element.dataset.i18nValue);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", translate(element.dataset.i18nAlt));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });
};

const syncBrandFilterOptions = () => {
  if (!brandFilter) return;

  const selectedValue = brandFilter.value || "all";
  const availableBrands = Array.from(
    new Set(
      stockCards
        .map((card) => (card.dataset.brand || "").trim())
        .filter(Boolean)
    )
  ).sort((left, right) => left.localeCompare(right, localeMap[currentLanguage] || "fr-FR"));

  brandFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = translate("filters.brandAll");
  brandFilter.appendChild(allOption);

  availableBrands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });

  brandFilter.value = availableBrands.includes(selectedValue) || selectedValue === "all" ? selectedValue : "all";
};

const updateStockPrices = () => {
  stockCards.forEach((card) => {
    const priceElement = card.querySelector(".stock-footer strong");
    if (priceElement) {
      priceElement.textContent = formatCurrency(Number(card.dataset.price || 0));
    }
  });
};

const updateBudgetOutput = () => {
  if (!budgetFilter || !budgetOutput) return;
  budgetOutput.textContent = formatCurrency(Number(budgetFilter.value));
};

const updateSearchBudget = () => {
  if (!searchBudget || !searchBudgetOutput) return;
  searchBudgetOutput.textContent = formatCurrency(Number(searchBudget.value));
};

const updateFormRouting = () => {
  if (!searchForm) return;

  const nextUrl = new URL("/merci", window.location.origin);
  if (currentLanguage === defaultLanguage) {
    nextUrl.searchParams.delete("lang");
  } else {
    nextUrl.searchParams.set("lang", currentLanguage);
  }

  const currentUrl = new URL(window.location.href);
  if (currentLanguage === defaultLanguage) {
    currentUrl.searchParams.delete("lang");
  } else {
    currentUrl.searchParams.set("lang", currentLanguage);
  }

  if (formNext) {
    formNext.value = nextUrl.toString();
  }

  if (formUrl) {
    formUrl.value = currentUrl.toString();
  }
};

const updateHomeLinks = () => {
  homeLinks.forEach((link) => {
    const homeUrl = new URL("/", window.location.origin);
    if (currentLanguage === defaultLanguage) {
      homeUrl.searchParams.delete("lang");
    } else {
      homeUrl.searchParams.set("lang", currentLanguage);
    }

    link.setAttribute("href", homeUrl.pathname + homeUrl.search);
  });
};

const applyStockFilters = () => {
  if (!stockGrid || !stockCount) return;

  const searchTerm = normalizeValue(stockSearch?.value || "");
  const selectedBrand = brandFilter?.value || "all";
  const selectedType = typeFilter?.value || "all";
  const maxBudget = Number(budgetFilter?.value || "25000");
  const sortValue = sortFilter?.value || "year-desc";

  const filtered = stockCards.filter((card) => {
    const cardText = normalizeValue(
      `${card.dataset.search || ""} ${card.querySelector("h3")?.textContent || ""}`
    );
    const matchesSearch = !searchTerm || cardText.includes(searchTerm);
    const matchesBrand = selectedBrand === "all" || card.dataset.brand === selectedBrand;
    const matchesType = selectedType === "all" || card.dataset.type === selectedType;
    const matchesBudget = Number(card.dataset.price) <= maxBudget;

    const isVisible = matchesSearch && matchesBrand && matchesType && matchesBudget;
    card.hidden = !isVisible;
    return isVisible;
  });

  filtered.sort((a, b) => {
    const priceA = Number(a.dataset.price);
    const priceB = Number(b.dataset.price);
    const yearA = Number(a.dataset.year);
    const yearB = Number(b.dataset.year);

    if (sortValue === "price-asc") return priceA - priceB;
    if (sortValue === "price-desc") return priceB - priceA;
    if (sortValue === "year-asc") return yearA - yearB;
    return yearB - yearA;
  });

  filtered.forEach((card) => stockGrid.appendChild(card));
  stockCount.textContent = String(filtered.length);
};

const resetStockFilters = () => {
  if (stockSearch) stockSearch.value = "";
  if (brandFilter) brandFilter.value = "all";
  if (typeFilter) typeFilter.value = "all";
  if (budgetFilter) budgetFilter.value = "25000";
  if (sortFilter) sortFilter.value = "year-desc";

  updateBudgetOutput();
  applyStockFilters();
};

const setLanguage = (language, options = {}) => {
  const { initial = false } = options;
  if (!supportedLanguages.includes(language)) return;

  if (language === defaultLanguage) {
    currentLanguage = language;
    setStoredLanguage(language);
    syncLanguageButtons();
    syncLanguageInUrl();
    updateBudgetOutput();
    updateSearchBudget();
    updateFormRouting();
    updateHomeLinks();
    applyStockFilters();

    if (!initial && document.documentElement.lang !== defaultLanguage) {
      window.location.assign(getPublicUrl(defaultLanguage, false));
    }
    return;
  }

  currentLanguage = language;
  setStoredLanguage(language);
  syncLanguageButtons();
  syncLanguageInUrl();
  updateTranslatedText();
  syncBrandFilterOptions();
  updateMeta();
  updateStockPrices();
  updateBudgetOutput();
  updateSearchBudget();
  updateFormRouting();
  updateHomeLinks();
  applyStockFilters();
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    body.classList.toggle("nav-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    });
  });
}

const syncHeader = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

[stockSearch, brandFilter, typeFilter, budgetFilter, sortFilter].forEach((field) => {
  if (!field) return;
  field.addEventListener("input", () => {
    updateBudgetOutput();
    applyStockFilters();
  });
  field.addEventListener("change", () => {
    updateBudgetOutput();
    applyStockFilters();
  });
});

if (resetFilters) {
  resetFilters.addEventListener("click", resetStockFilters);
}

if (searchBudget) {
  searchBudget.addEventListener("input", updateSearchBudget);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

setLanguage(getInitialLanguage(), { initial: true });
loadRuntimeConfig();
loadPublishedMotorcycles();


