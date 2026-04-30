import { DEFAULT_SITE_URL, getSiteUrl } from "./env.js";
import { homeTemplate, thanksTemplate } from "./template-strings.js";

export const DEFAULT_LANGUAGE = "fr";
export const SUPPORTED_LANGUAGES = ["fr", "en", "es", "it"];

const pageMeta = {
  home: {
    fr: {
      title: "Nippon Heritage | Import moto Japon, motos japonaises de collection et sportives 2 temps",
      description:
        "Nippon Heritage est spécialisé dans l'import moto Japon et la sélection de motos japonaises de collection, sportives 2 temps et 4 temps, rares JDM et restaurées en France.",
    },
    en: {
      title: "Nippon Heritage | Japan motorcycle imports and collectible JDM sport bikes",
      description:
        "Nippon Heritage sources collectible Japanese motorcycles from Japan, including rare JDM two-strokes and four-strokes, then refreshes them in France before sale.",
    },
    es: {
      title: "Nippon Heritage | Importacion de motos japonesas y deportivas JDM de coleccion",
      description:
        "Nippon Heritage selecciona en Japon motos japonesas de coleccion, 2 tiempos y 4 tiempos, y las prepara en Francia antes de venderlas.",
    },
    it: {
      title: "Nippon Heritage | Importazione di moto giapponesi e sportive JDM da collezione",
      description:
        "Nippon Heritage seleziona in Giappone moto giapponesi da collezione, 2 tempi e 4 tempi, e le prepara in Francia prima della vendita.",
    },
  },
  thanks: {
    fr: {
      title: "Merci | Demande envoyée à Nippon Heritage",
      description: "Confirmation d'envoi de votre demande à Nippon Heritage.",
    },
    en: {
      title: "Thank you | Request sent to Nippon Heritage",
      description: "Your request has been sent to Nippon Heritage.",
    },
    es: {
      title: "Gracias | Solicitud enviada a Nippon Heritage",
      description: "Su solicitud ha sido enviada a Nippon Heritage.",
    },
    it: {
      title: "Grazie | Richiesta inviata a Nippon Heritage",
      description: "La richiesta e stata inviata a Nippon Heritage.",
    },
  },
};

function readTemplate(relativePath) {
  if (relativePath === "index.html") {
    return homeTemplate;
  }

  if (relativePath === "merci.html") {
    return thanksTemplate;
  }

  throw new Error(`Template introuvable: ${relativePath}`);
}

function extractBody(content) {
  const match = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : content;
}

function stripScripts(content) {
  return content.replace(/<script\b[\s\S]*?<\/script>/gi, "");
}

function normalizePublicPaths(content) {
  return content
    .replace(/(src|href)=["']assets\//gi, '$1="/assets/')
    .replace(/(src|href)=["']\/?script\.js["']/gi, '$1="/site-script.js"')
    .replace(/(src|href)=["']styles\.css["']/gi, '$1="/styles.css"');
}

function getNormalizedBody(relativePath) {
  return normalizePublicPaths(stripScripts(extractBody(readTemplate(relativePath))));
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatVisiblePrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
    .format(Number(value || 0))
    .replace(/\u00a0/g, " ");
}

function normalizeEngineType(value = "") {
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
}

function buildStockSearchText(item, engine) {
  return [
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
}

function getMotorcycleHref(item) {
  return item.slug ? `/motos/${encodeURIComponent(item.slug)}` : "/#commande";
}

export function resolveLanguage(searchParams) {
  const raw = Array.isArray(searchParams?.lang) ? searchParams.lang[0] : searchParams?.lang;
  return SUPPORTED_LANGUAGES.includes(raw) ? raw : DEFAULT_LANGUAGE;
}

export async function resolveLanguageAsync(searchParams) {
  const params = await searchParams;
  return resolveLanguage(params);
}

export function getLocalizedMeta(page, language) {
  return pageMeta[page]?.[language] || pageMeta[page]?.[DEFAULT_LANGUAGE] || pageMeta.home.fr;
}

export function getLanguageAlternates(pathname) {
  const siteUrl = getSiteUrl();
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonical = `${siteUrl}${cleanPath === "/" ? "/" : cleanPath}`;

  return {
    canonical,
    languages: {
      "fr-FR": canonical,
      en: `${canonical}?lang=en`,
      es: `${canonical}?lang=es`,
      it: `${canonical}?lang=it`,
      "x-default": canonical,
    },
  };
}

export function getAbsoluteUrl(pathname = "/") {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}

export function getAbsoluteImageUrl(pathname = "/assets/images/stock/vfr400.jpg") {
  return getAbsoluteUrl(pathname.startsWith("/") ? pathname : `/${pathname}`);
}

export function buildStockCardMarkup(item) {
  const engine = normalizeEngineType(item.engine_type);
  const country = escapeHtml(item.origin_country || "Japon");
  const title = escapeHtml(item.title || "Moto Nippon Heritage");
  const description = escapeHtml(
    item.description || "Moto japonaise de collection sélectionnée par Nippon Heritage."
  );
  const image = escapeHtml(item.images?.[0] || "/assets/images/stock/vfr400.jpg");
  const price = Number(item.price || 0);
  const yearValue = Number(item.year || 0);
  const displacement = escapeHtml(item.displacement || "-");
  const brand = escapeHtml(item.brand || "");
  const searchText = escapeHtml(buildStockSearchText(item, engine));
  const href = escapeHtml(getMotorcycleHref(item));

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
          <span>Japon</span>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="stock-footer">
          <strong>${formatVisiblePrice(price)}</strong>
          <a href="${href}" data-i18n="common.viewMore">Voir plus</a>
        </div>
      </div>
    </article>
  `;
}

export function buildHomeHtml(motorcycles = []) {
  let content = getNormalizedBody("index.html");

  if (motorcycles.length) {
    const cards = motorcycles.map((item) => buildStockCardMarkup(item)).join("");
    content = content.replace(
      /(<div class="stock-grid" id="stock-grid">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/i,
      `$1${cards}$3`
    );
    content = content.replace(/(<span id="stock-count">)(.*?)(<\/span>)/i, `$1${motorcycles.length}$3`);
  }

  return content;
}

export function buildHomeLegacySections(motorcycles = []) {
  const content = buildHomeHtml(motorcycles);
  const mainMatch = content.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const mainContent = mainMatch ? mainMatch[1] : content;
  const sectionsMatch = mainContent.match(/(<section class="catalog-section" id="stock">[\s\S]*)$/i);

  return sectionsMatch ? sectionsMatch[1] : mainContent;
}

export function buildThanksHtml() {
  return getNormalizedBody("merci.html");
}

function rewriteChromeAnchors(content) {
  return content.replace(/href="#([^"]+)"/gi, (_match, anchor) => {
    if (anchor === "accueil") {
      return 'href="/"';
    }
    return `href="/#${anchor}"`;
  });
}

export function getDetailChrome() {
  const content = getNormalizedBody("index.html");
  const mainMatch = content.match(/([\s\S]*?)<main\b[^>]*>[\s\S]*<\/main>([\s\S]*)/i);

  if (!mainMatch) {
    return { prefix: "", suffix: "" };
  }

  return {
    prefix: rewriteChromeAnchors(mainMatch[1]),
    suffix: rewriteChromeAnchors(mainMatch[2]),
  };
}

export function buildHomeJsonLd(motorcycles = []) {
  const siteUrl = getSiteUrl();
  const itemList = motorcycles.slice(0, 10).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: getAbsoluteUrl(`/motos/${item.slug}`),
    name: item.title,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Nippon Heritage",
        inLanguage: "fr-FR",
        description: pageMeta.home.fr.description,
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Nippon Heritage",
        url: `${siteUrl}/`,
        logo: getAbsoluteImageUrl("/assets/images/nippon-heritage-logo.png"),
      },
      {
        "@type": "AutomotiveBusiness",
        "@id": `${siteUrl}/#business`,
        name: "Nippon Heritage",
        url: `${siteUrl}/`,
        image: getAbsoluteImageUrl("/assets/images/stock/vfr400.jpg"),
        description:
          "Import moto Japon, motos japonaises de collection, sportives 2 temps et 4 temps, remise en état et vente en France.",
        areaServed: "FR",
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      ...(itemList.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${siteUrl}/#motorcycles`,
              name: "Motos japonaises disponibles",
              itemListElement: itemList,
            },
          ]
        : []),
    ],
  };
}

export function buildThanksJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/merci#webpage`,
        url: `${siteUrl}/merci`,
        name: pageMeta.thanks.fr.title,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/merci#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Merci",
            item: `${siteUrl}/merci`,
          },
        ],
      },
    ],
  };
}

export function buildProductMetadata(item) {
  const motorcycleName = item.title || [item.brand, item.model].filter(Boolean).join(" ");
  const keywordBits = [
    motorcycleName,
    item.year ? String(item.year) : null,
    "import moto Japon",
    "moto japonaise de collection",
  ].filter(Boolean);

  return {
    title: `${keywordBits.join(" | ")} | Nippon Heritage`,
    description:
      item.description ||
      `${motorcycleName} disponible chez Nippon Heritage, importée du Japon, sélectionnée pour une clientèle passionnée de motos japonaises de collection.`,
  };
}

export function buildProductJsonLd(item) {
  const productUrl = getAbsoluteUrl(`/motos/${item.slug}`);
  const image = item.images?.[0] || "/assets/images/stock/vfr400.jpg";
  const motorcycleName = item.title || [item.brand, item.model].filter(Boolean).join(" ");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: motorcycleName,
        description:
          item.description ||
          `${motorcycleName} importée du Japon par Nippon Heritage et proposée à la vente en France.`,
        image: [getAbsoluteUrl(image.startsWith("/") ? image : `/${image}`)],
        brand: item.brand
          ? {
              "@type": "Brand",
              name: item.brand,
            }
          : undefined,
        category: "Moto japonaise de collection",
        sku: item.slug,
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "EUR",
          price: Number(item.price || 0),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: {
            "@type": "Organization",
            name: "Nippon Heritage",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${getSiteUrl()}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: motorcycleName,
            item: productUrl,
          },
        ],
      },
    ],
  };
}

export function getFallbackProductDescription(item) {
  const bits = [
    item.brand,
    item.model,
    item.year ? String(item.year) : null,
    item.displacement,
    item.engine_type ? String(item.engine_type).toUpperCase() : null,
  ].filter(Boolean);

  return bits.length
    ? bits.join(" • ")
    : "Moto japonaise de collection selectionnee par Nippon Heritage.";
}

export function getDefaultSiteUrl() {
  return DEFAULT_SITE_URL;
}
