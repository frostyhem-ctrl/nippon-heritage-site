const body = document.body;
const page = body?.dataset.page || "home";
const year = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const languageButtons = Array.from(document.querySelectorAll(".lang-switch [data-lang]"));
const metaDescription = document.querySelector('meta[name="description"]');
const homeLinks = Array.from(document.querySelectorAll("[data-home-link]"));

const stockGrid = document.getElementById("stock-grid");
const stockCards = Array.from(document.querySelectorAll(".stock-card"));
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
    "top.strip": "Import selectif depuis le Japon • 2 temps de collection • Atelier en France",
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
    "hero.kicker": "Nippon Heritage • Motos japonaises de collection",
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
      "Cette maquette reprend l'esprit catalogue de tes references avec un vrai bloc de filtres, des fiches motos et un ton plus premium.",
    "catalog.resultLabel": "modeles affiches",
    "catalog.toolbarNote": "Catalogue de presentation dans le style de ta reference.",
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
    "search.title": "Une moto precise en tete ? Nous pouvons la rechercher pour toi.",
    "search.body":
      "Le formulaire reprend l'esprit de ta reference mais l'adapte a ton activite : recherche ciblee, budget, base saine, motos 2 temps de collection uniquement.",
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
      "Precise la moto recherchee, l'etat souhaite, les couleurs, la tolerance kilometrage ou ton objectif collection.",
    "form.submit": "Envoyer la demande",
    "form.helper": "Envoi direct des demandes sur frostyhem@gmail.com.",
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
      "Tu ne proposes pas une importation brute. Le site insiste donc sur le controle, la mise au propre, la presentation et la coherence mecanique avant qu'une moto n'arrive dans les mains d'un acheteur.",
    "services.workshop.bullet1": "Controle visuel et technique a reception",
    "services.workshop.bullet2": "Interventions selon l'etat reel de la machine",
    "services.workshop.bullet3": "Presentation propre et valorisante avant diffusion",
    "services.sale.title": "Vente de motos de collection a forte personnalite",
    "services.sale.body":
      "Le discours commercial est recentre sur la desirabilite, la confiance et la rarete. C'est plus premium, plus clair et plus proche du niveau de presentation que tu voulais atteindre.",
    "services.sale.bullet1": "Catalogue lisible et plus haut de gamme",
    "services.sale.bullet2": "Recherche personnalisee pour demandes precises",
    "services.sale.bullet3": "Aucune rubrique homologation integree au site",
    "method.kicker": "Atelier & methode",
    "method.title": "Une methode courte, lisible et credible.",
    "method.body":
      "Le site raconte tres clairement comment une moto arrive jusqu'a la vente, sans promettre de services que tu ne veux pas proposer.",
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
      "Diffusion plus premium, echange direct avec les acheteurs et recherche sur commande.",
    "contact.kicker": "Contact",
    "contact.title": "Un site pense pour inspirer confiance et convertir.",
    "contact.body":
      "La base est maintenant beaucoup plus proche de tes captures : noir, orange, hero photo, catalogue, recherche personnalisee et services en blocs. Le formulaire envoie maintenant les demandes directement par email.",
    "contact.panel1.title": "Positionnement",
    "contact.panel1.body":
      "Import selectif de motos 2 temps japonaises de collection, remises en etat puis revendues en France.",
    "contact.panel2.title": "Navigation",
    "contact.panel2.body":
      "Le site met en avant les modeles en stock, la recherche sur commande, l'atelier et le contact.",
    "contact.panel3.title": "Etape suivante",
    "contact.panel3.body":
      "On pourra ensuite remplacer les exemples par tes vraies motos, tes vrais textes et tes coordonnees.",
    "footer.brand": "Nippon Heritage • Import de motos japonaises 2 temps de collection.",
    "footer.visuals": "Visuels gratuits telecharges depuis Unsplash.",
    "footer.note": "Maquette de lancement orientee conversion.",
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
    "top.strip": "Selective import from Japan • Collectible 2-strokes • Workshop in France",
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
    "hero.kicker": "Nippon Heritage • Collectible Japanese motorcycles",
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
      "This mock-up keeps the catalog feel of your references with real filters, bike cards and a more premium tone.",
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
    "form.helper": "Requests are sent directly to frostyhem@gmail.com.",
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
      "You are not offering rough import only. The site therefore highlights inspection, detailing, presentation and mechanical consistency before a bike reaches a buyer.",
    "services.workshop.bullet1": "Visual and technical inspection on arrival",
    "services.workshop.bullet2": "Work carried out according to the bike's real condition",
    "services.workshop.bullet3": "Clean, valuable presentation before publication",
    "services.sale.title": "Collector bikes with real personality",
    "services.sale.body":
      "The sales message focuses on desirability, trust and rarity. It feels more premium, clearer and closer to the presentation level you wanted.",
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
      "More premium presentation, direct exchanges with buyers and custom sourcing.",
    "contact.kicker": "Contact",
    "contact.title": "A site designed to build trust and convert.",
    "contact.body":
      "The base is now much closer to your references: dark palette, orange accents, hero photo, catalog, custom sourcing and service blocks. The form now sends requests directly by email.",
    "contact.panel1.title": "Positioning",
    "contact.panel1.body":
      "Selective import of collectible Japanese 2-stroke motorcycles, refreshed and then resold in France.",
    "contact.panel2.title": "Navigation",
    "contact.panel2.body":
      "The site highlights bikes in stock, sourcing on request, the workshop and contact.",
    "contact.panel3.title": "Next step",
    "contact.panel3.body":
      "We can then replace the examples with your real bikes, real copy and real business details.",
    "footer.brand": "Nippon Heritage • Import of collectible Japanese 2-stroke motorcycles.",
    "footer.visuals": "Free visuals sourced from Unsplash.",
    "footer.note": "Launch mock-up built for conversion.",
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
    "top.strip": "Importacion selectiva desde Japon • 2 tiempos de coleccion • Taller en Francia",
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
    "hero.kicker": "Nippon Heritage • Motos japonesas de coleccion",
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
      "Esta maqueta retoma el espiritu catalogo de tus referencias con filtros reales, fichas de motos y un tono mas premium.",
    "catalog.resultLabel": "modelos mostrados",
    "catalog.toolbarNote": "Catalogo de presentacion inspirado en tu referencia.",
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
      "El formulario mantiene el espiritu de tu referencia, pero adaptado a tu actividad: busqueda dirigida, presupuesto, base sana y solo motos 2 tiempos de coleccion.",
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
    "form.namePlaceholder": "Tu apellido",
    "form.firstnameLabel": "Nombre",
    "form.firstnamePlaceholder": "Tu nombre",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "tu@email.com",
    "form.phoneLabel": "Telefono",
    "form.phonePlaceholder": "Tu numero",
    "form.messageLabel": "Informacion adicional",
    "form.messagePlaceholder":
      "Indica la moto buscada, el estado deseado, los colores, la tolerancia de kilometraje o tu objetivo de coleccion.",
    "form.submit": "Enviar solicitud",
    "form.helper": "Las solicitudes se envian directamente a frostyhem@gmail.com.",
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
      "El discurso comercial se centra en la deseabilidad, la confianza y la rareza. Se siente mas premium, mas claro y mas cerca del nivel de presentacion que querias.",
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
      "Difusion mas premium, contacto directo con los compradores y busqueda por encargo.",
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
    "footer.brand": "Nippon Heritage • Importacion de motos japonesas 2 tiempos de coleccion.",
    "footer.visuals": "Imagenes gratuitas obtenidas desde Unsplash.",
    "footer.note": "Maqueta de lanzamiento orientada a la conversion.",
    "thanks.kicker": "Mensaje enviado",
    "thanks.title": "Gracias, tu solicitud se ha enviado correctamente.",
    "thanks.body":
      "Te responderemos al email indicado lo antes posible. Ya puedes volver al sitio principal.",
    "thanks.cta": "Volver al inicio",
  },
  it: {
    "meta.home.title": "Nippon Heritage | Importazione di moto giapponesi 2 tempi",
    "meta.home.description":
      "Nippon Heritage seleziona in Giappone moto giapponesi 2 tempi da collezione, le rimette in ordine in Francia e poi le propone in vendita.",
    "meta.thanks.title": "Grazie | Nippon Heritage",
    "meta.thanks.description": "Pagina di conferma del modulo Nippon Heritage.",
    "top.strip": "Import selettivo dal Giappone • 2 tempi da collezione • Officina in Francia",
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
    "hero.kicker": "Nippon Heritage • Moto giapponesi da collezione",
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
      "Questa maquette riprende lo spirito catalogo dei tuoi riferimenti con veri filtri, schede moto e un tono piu premium.",
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
    "form.helper": "Le richieste vengono inviate direttamente a frostyhem@gmail.com.",
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
      "Il messaggio commerciale si concentra su desiderabilita, fiducia e rarita. Risulta piu premium, piu chiaro e piu vicino al livello di presentazione che volevi raggiungere.",
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
      "Presentazione piu premium, contatto diretto con gli acquirenti e ricerca su richiesta.",
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
    "footer.brand": "Nippon Heritage • Importazione di moto giapponesi 2 tempi da collezione.",
    "footer.visuals": "Visual gratuiti scaricati da Unsplash.",
    "footer.note": "Maquette di lancio pensata per la conversione.",
    "thanks.kicker": "Messaggio inviato",
    "thanks.title": "Grazie, la tua richiesta e stata inviata correttamente.",
    "thanks.body":
      "Ti risponderemo il prima possibile all'indirizzo email indicato. Ora puoi tornare al sito principale.",
    "thanks.cta": "Torna alla home",
  },
};

Object.assign(translations.fr, {
  "meta.home.title": "Nippon Heritage | Import de motos japonaises 2 temps et 4 temps",
  "meta.home.description":
    "Nippon Heritage importe du Japon des motos japonaises de collection 2 temps et 4 temps, les remet en état en France et les propose à la vente.",
  "meta.thanks.title": "Merci | Nippon Heritage",
  "meta.thanks.description": "Confirmation d’envoi du formulaire Nippon Heritage.",
  "top.strip": "Import sélectif depuis le Japon • 2 temps & 4 temps • Atelier en France",
  "aria.quickLinks": "Accès rapides",
  "common.logoAlt": "Logo Nippon Heritage",
  "nav.request": "Recherche personnalisée",
  "hero.kicker": "Nippon Heritage • Sportives japonaises de collection",
  "hero.title": "Spécialiste de l’import de motos japonaises 2 temps et 4 temps.",
  "hero.body":
    "Nous sourçons au Japon des motos saines, peu kilométrées et désirables, puis nous les remettons en état en France avant la revente. Pas d’homologation, pas de volume inutile, uniquement des bases choisies.",
  "hero.ctaPrimary": "Voir les modèles",
  "hero.card1.title": "Sélection au Japon",
  "hero.card1.body":
    "Nous visons des motos cohérentes, propres et intéressantes pour la collection.",
  "hero.card2.body":
    "Contrôle, remise en état et présentation avant la mise en vente en France.",
  "hero.card3.body":
    "Import, remise en état, vente. Aucune rubrique homologation n’est proposée.",
  "band.item1": "Import de sportives japonaises",
  "band.item2": "2 temps & 4 temps",
  "band.item4": "Faible kilométrage privilégié",
  "band.item6": "Sélection rigoureuse",
  "catalog.title": "Une vitrine mêlant 2 temps iconiques et 4 temps collectors.",
  "catalog.body":
    "La sélection d’exemple met maintenant en avant des RVF 400, VFR 400, CBR 400, NSR 250 et RGV 250, avec des visuels de modèles correspondants et un rendu plus crédible pour la vente.",
  "catalog.resultLabel": "modèles affichés",
  "catalog.toolbarNote": "Catalogue de présentation dans un esprit plus premium et plus ciblé.",
  "filters.searchPlaceholder": "RVF 400, NSR 250, VFR 400...",
  "filters.typeLabel": "Filtrer par motorisation",
  "filters.typeAll": "Toutes les motorisations",
  "filters.type2t": "2 temps",
  "filters.type4t": "4 temps",
  "filters.sortRecent": "Année récente",
  "filters.sortPriceDesc": "Prix décroissant",
  "filters.sortYearAsc": "Année ancienne",
  "filters.reset": "Réinitialiser les filtres",
  "cards.rvf.body":
    "V4 4 temps iconique, très recherché pour son châssis compact et son identité RC45.",
  "cards.vfr.body":
    "Une 400 V4 de collection emblématique, parfaite pour une sélection sport japonaise premium.",
  "cards.cbr.body":
    "Une 400 quatre cylindres vive et légère, très cohérente pour une offre youngtimer sportive.",
  "cards.nsr.body":
    "Une vraie sportive 2 temps de collection, emblématique du marché japonais des années 80-90.",
  "cards.rgv.body":
    "Une base 2 temps très désirable, nerveuse et légère, idéale pour une vitrine plus racing.",
  "search.kicker": "Recherche personnalisée",
  "search.title": "Une RVF 400, une NSR 250 ou une RGV 250 en tête ? Nous pouvons la rechercher pour toi.",
  "search.body":
    "Le formulaire reprend l’esprit de ta référence mais l’adapte à ton activité : recherche ciblée, budget, base saine, 2 temps et 4 temps japonais sélectionnés avec cohérence.",
  "form.modelLabel": "Modèle",
  "form.modelPlaceholder": "RVF400, VFR400, CBR400RR, NSR250, RGV250...",
  "form.typeLabel": "Motorisation",
  "form.typeDefault": "2 temps, 4 temps...",
  "form.yearLabel": "Année minimale",
  "form.yearPlaceholder": "Ex. : 1988",
  "form.engineLabel": "Cylindrée",
  "form.enginePlaceholder": "250 cc, 400 cc...",
  "form.firstnameLabel": "Prénom",
  "form.firstnamePlaceholder": "Votre prénom",
  "form.phoneLabel": "Téléphone",
  "form.phonePlaceholder": "Votre numéro",
  "form.messageLabel": "Informations complémentaires",
  "form.messagePlaceholder":
    "Précise la moto recherchée, l’état souhaité, les couleurs, la tolérance kilométrage ou ton objectif collection.",
  "services.title": "Import, sélection, atelier et vente de motos japonaises 2 temps et 4 temps.",
  "services.import.title": "Import sélectif depuis le Japon",
  "services.import.body":
    "Le sourcing ne vise pas la quantité. Chaque moto est choisie pour sa cohérence, son état de départ et sa valeur potentielle une fois remise en présentation pour le marché français.",
  "services.import.bullet1": "Recherche de sportives japonaises 2 temps et 4 temps",
  "services.import.bullet2": "Priorité aux bases saines et peu kilométrées",
  "services.import.bullet3": "Sélection adaptée à une clientèle collection",
  "services.workshop.title": "Remise en état atelier avant mise en vente",
  "services.workshop.body":
    "Tu ne proposes pas une importation brute. Le site insiste donc sur le contrôle, la mise au propre, la présentation et la cohérence mécanique avant qu’une moto n’arrive dans les mains d’un acheteur.",
  "services.workshop.bullet1": "Contrôle visuel et technique à réception",
  "services.workshop.bullet3": "Présentation propre et valorisante avant diffusion",
  "services.sale.title": "Vente de motos de collection à forte personnalité",
  "services.sale.body":
    "Le discours commercial est recentré sur la désirabilité, la confiance et la rareté. C’est plus premium, plus clair et plus proche du niveau de présentation que tu voulais atteindre.",
  "services.sale.bullet2": "Recherche personnalisée pour demandes précises",
  "services.sale.bullet3": "Aucune rubrique homologation intégrée au site",
  "method.kicker": "Atelier & méthode",
  "method.title": "Une méthode courte, lisible et crédible.",
  "method.body":
    "Le site raconte très clairement comment une moto arrive jusqu’à la vente, sans promettre de services que tu ne veux pas proposer.",
  "method.step1.title": "Repérage",
  "method.step1.body":
    "Veille des modèles suivis, lecture de l’état réel et tri rigoureux des opportunités.",
  "method.step2.title": "Achat ciblé",
  "method.step2.body":
    "Priorité aux motos complètes, désirables et adaptées à une remise en état sérieuse.",
  "method.step3.title": "Préparation",
  "method.step4.body":
    "Diffusion plus premium, échange direct avec les acheteurs et recherche sur commande.",
  "contact.title": "Un site pensé pour inspirer confiance et convertir.",
  "contact.body":
    "La base est maintenant beaucoup plus proche de tes captures : noir, orange, hero photo, catalogue, recherche personnalisée et services en blocs. Le formulaire envoie maintenant les demandes directement par email.",
  "contact.panel1.body":
    "Import sélectif de motos japonaises 2 temps et 4 temps de collection, remises en état puis revendues en France.",
  "contact.panel2.body":
    "Le site met en avant les modèles en stock, la recherche sur commande, l’atelier et le contact.",
  "contact.panel3.title": "Étape suivante",
  "contact.panel3.body":
    "On pourra ensuite remplacer les annonces d’exemple par tes vraies motos, tes vrais textes et tes coordonnées.",
  "footer.brand": "Nippon Heritage • Import de motos japonaises 2 temps et 4 temps de collection.",
  "footer.visuals": "Photos de modèles issues de Wikimedia Commons.",
  "footer.note": "Maquette de lancement orientée conversion.",
  "thanks.kicker": "Message envoyé",
  "thanks.title": "Merci, votre demande a bien été transmise.",
  "thanks.body":
    "Nous revenons vers vous sur l’email indiqué dès que possible. Vous pouvez maintenant retourner au site principal.",
  "thanks.cta": "Revenir à l’accueil",
});

Object.assign(translations.en, {
  "meta.home.title": "Nippon Heritage | Japanese 2-stroke and 4-stroke motorcycle imports",
  "meta.home.description":
    "Nippon Heritage sources collectible Japanese 2-stroke and 4-stroke motorcycles, refreshes them in France, and offers them for sale.",
  "top.strip": "Selective import from Japan • 2-stroke & 4-stroke • Workshop in France",
  "hero.kicker": "Nippon Heritage • Collectible Japanese sport bikes",
  "hero.title": "Specialist in imported Japanese 2-stroke and 4-stroke motorcycles.",
  "hero.body":
    "We source sound, low-mileage and desirable motorcycles in Japan, then refresh them in France before resale. No homologation, no unnecessary volume, only carefully chosen bikes.",
  "band.item1": "Import of Japanese sport bikes",
  "band.item2": "2-stroke & 4-stroke",
  "catalog.title": "A showcase mixing iconic 2-strokes and collectible 4-strokes.",
  "catalog.body":
    "The sample selection now highlights RVF 400, VFR 400, CBR 400, NSR 250 and RGV 250 models with matching visuals and a more credible sales presentation.",
  "catalog.toolbarNote": "Presentation catalog with a sharper and more premium focus.",
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
  "footer.brand": "Nippon Heritage • Import of collectible Japanese 2-stroke and 4-stroke motorcycles.",
  "footer.visuals": "Model photos sourced from Wikimedia Commons.",
});

Object.assign(translations.es, {
  "meta.home.title": "Nippon Heritage | Importación de motos japonesas 2 tiempos y 4 tiempos",
  "meta.home.description":
    "Nippon Heritage selecciona en Japón motos japonesas de colección 2 tiempos y 4 tiempos, las pone al día en Francia y luego las ofrece a la venta.",
  "top.strip": "Importación selectiva desde Japón • 2 tiempos y 4 tiempos • Taller en Francia",
  "hero.title": "Especialista en importación de motos japonesas 2 tiempos y 4 tiempos.",
  "band.item2": "2 tiempos y 4 tiempos",
  "filters.typeLabel": "Filtrar por motor",
  "filters.typeAll": "Todos los motores",
  "filters.type2t": "2 tiempos",
  "filters.type4t": "4 tiempos",
  "cards.rvf.body":
    "Una V4 de 4 tiempos icónica, muy buscada por su chasis compacto y su carácter inspirado en la RC45.",
  "cards.vfr.body":
    "Una 400 V4 de colección emblemática, perfecta para una selección sport japonesa premium.",
  "cards.cbr.body":
    "Una 400 de cuatro cilindros viva y ligera, ideal para una oferta youngtimer deportiva.",
  "search.title": "¿Tienes una RVF 400, una NSR 250 o una RGV 250 en mente? Podemos buscarla por ti.",
  "form.typeLabel": "Motorización",
  "form.typeDefault": "2 tiempos, 4 tiempos...",
  "services.title": "Importación, selección, taller y venta de motos japonesas 2 tiempos y 4 tiempos.",
  "footer.brand": "Nippon Heritage • Importación de motos japonesas 2 tiempos y 4 tiempos de colección.",
  "footer.visuals": "Fotos de modelos procedentes de Wikimedia Commons.",
});

Object.assign(translations.it, {
  "meta.home.title": "Nippon Heritage | Importazione di moto giapponesi 2 tempi e 4 tempi",
  "meta.home.description":
    "Nippon Heritage seleziona in Giappone moto giapponesi da collezione 2 tempi e 4 tempi, le rimette in ordine in Francia e poi le propone in vendita.",
  "top.strip": "Import selettivo dal Giappone • 2 tempi e 4 tempi • Officina in Francia",
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
  "footer.brand": "Nippon Heritage • Importazione di moto giapponesi 2 tempi e 4 tempi da collezione.",
  "footer.visuals": "Foto dei modelli da Wikimedia Commons.",
});

const supportedLanguages = Object.keys(translations);
let currentLanguage = defaultLanguage;

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
  document.title = translate(`meta.${page}.title`);
  if (metaDescription) {
    metaDescription.setAttribute("content", translate(`meta.${page}.description`));
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

  const nextUrl = new URL("merci.html", window.location.href);
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
    const homeUrl = new URL("index.html", window.location.href);
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

const setLanguage = (language) => {
  if (!supportedLanguages.includes(language)) return;

  currentLanguage = language;
  setStoredLanguage(language);
  syncLanguageButtons();
  syncLanguageInUrl();
  updateTranslatedText();
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

setLanguage(getInitialLanguage());
