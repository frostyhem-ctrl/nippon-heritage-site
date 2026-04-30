const fallbackMotorcycles = [
  {
    title: "Honda RVF400R NC35",
    brand: "Honda",
    year: 1994,
    displacement: "399 cc",
    engine_type: "4t",
    price: 14900,
    descriptionKey: "cards.rvf.body",
    description: "V4 4 temps iconique, très recherchée pour son châssis compact et son identité RC45.",
    image: "/assets/images/stock/rvf400.jpg",
    href: "/recherche-personnalisee",
  },
  {
    title: "Honda VFR400R NC30",
    brand: "Honda",
    year: 1991,
    displacement: "399 cc",
    engine_type: "4t",
    price: 13900,
    descriptionKey: "cards.vfr.body",
    description: "Une 400 V4 de collection emblématique, parfaite pour une sélection sport japonaise premium.",
    image: "/assets/images/stock/vfr400.jpg",
    href: "/recherche-personnalisee",
  },
  {
    title: "Honda CBR400RR NC29",
    brand: "Honda",
    year: 1992,
    displacement: "399 cc",
    engine_type: "4t",
    price: 11900,
    descriptionKey: "cards.cbr.body",
    description: "Une 400 quatre cylindres vive et légère, très cohérente pour une offre youngtimer sportive.",
    image: "/assets/images/stock/cbr400.jpg",
    href: "/recherche-personnalisee",
  },
  {
    title: "Honda NSR250R MC18",
    brand: "Honda",
    year: 1988,
    displacement: "249 cc",
    engine_type: "2t",
    price: 18900,
    descriptionKey: "cards.nsr.body",
    description: "Sportive 2 temps emblématique, base saine privilégiée pour une vente collection.",
    image: "/assets/images/stock/nsr250.jpg",
    href: "/recherche-personnalisee",
  },
  {
    title: "Suzuki RGV250 VJ22",
    brand: "Suzuki",
    year: 1994,
    displacement: "249 cc",
    engine_type: "2t",
    price: 16900,
    descriptionKey: "cards.rgv.body",
    description: "Machine plus pointue, destinée à une clientèle qui cherche une vraie rareté sportive.",
    image: "/assets/images/stock/rgv250-rj22.jpg",
    href: "/recherche-personnalisee",
  },
];

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

function buildSearchText(item, engine) {
  return [
    item.title,
    item.brand,
    item.model,
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

function getDisplayMotorcycles(motorcycles = []) {
  if (Array.isArray(motorcycles) && motorcycles.length) {
    return motorcycles;
  }

  return fallbackMotorcycles;
}

export function StockSection({ motorcycles = [], pageTitle = "Motos disponibles", pageBody }) {
  const items = getDisplayMotorcycles(motorcycles);

  return (
    <section className="catalog-section">
      <div className="container">
        <div className="section-heading centered">
          <p className="section-kicker" data-i18n="catalog.kicker">
            Motos en stock
          </p>
          <h2>{pageTitle}</h2>
          <div className="accent-line" aria-hidden="true"></div>
          <p data-i18n="catalog.body">
            {pageBody ||
              "Cette sélection présente des sportives japonaises 2 temps et 4 temps que nous pouvons proposer ou rechercher selon disponibilité."}
          </p>
        </div>

        <div className="catalog-layout">
          <aside className="filters-card">
            <div className="filter-block">
              <label className="filter-label" htmlFor="stock-search" data-i18n="filters.searchLabel">
                Rechercher
              </label>
              <input
                id="stock-search"
                className="filter-input"
                type="search"
                data-i18n-placeholder="filters.searchPlaceholder"
                placeholder="NSR, TZR, RGV..."
              />
            </div>

            <div className="filter-block">
              <label className="filter-label" htmlFor="brand-filter" data-i18n="filters.brandLabel">
                Filtrer par marque
              </label>
              <select id="brand-filter" className="filter-input" defaultValue="all">
                <option value="all" data-i18n="filters.brandAll">
                  Toutes les marques
                </option>
                {Array.from(new Set(items.map((item) => item.brand).filter(Boolean))).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-block">
              <label className="filter-label" htmlFor="type-filter" data-i18n="filters.typeLabel">
                Filtrer par motorisation
              </label>
              <select id="type-filter" className="filter-input" defaultValue="all">
                <option value="all" data-i18n="filters.typeAll">
                  Toutes les motorisations
                </option>
                <option value="2t" data-i18n="filters.type2t">
                  2 temps
                </option>
                <option value="4t" data-i18n="filters.type4t">
                  4 temps
                </option>
              </select>
            </div>

            <div className="filter-block">
              <div className="range-heading">
                <label className="filter-label" htmlFor="budget-filter" data-i18n="filters.budgetLabel">
                  Budget maximum
                </label>
                <strong id="budget-output">25 000 €</strong>
              </div>
              <input id="budget-filter" type="range" min="5000" max="25000" step="500" defaultValue="25000" />
            </div>

            <div className="filter-block">
              <label className="filter-label" htmlFor="sort-filter" data-i18n="filters.sortLabel">
                Trier
              </label>
              <select id="sort-filter" className="filter-input" defaultValue="year-desc">
                <option value="year-desc" data-i18n="filters.sortRecent">
                  Année récente
                </option>
                <option value="price-asc" data-i18n="filters.sortPriceAsc">
                  Prix croissant
                </option>
                <option value="price-desc" data-i18n="filters.sortPriceDesc">
                  Prix décroissant
                </option>
                <option value="year-asc" data-i18n="filters.sortYearAsc">
                  Année ancienne
                </option>
              </select>
            </div>

            <button id="reset-filters" className="button button-secondary button-full" type="button" data-i18n="filters.reset">
              Réinitialiser les filtres
            </button>
          </aside>

          <div className="catalog-main">
            <div className="catalog-toolbar">
              <div className="result-pill">
                <span id="stock-count">{items.length}</span>
                <strong data-i18n="catalog.resultLabel">modèles affichés</strong>
              </div>
              <p className="toolbar-note" data-i18n="catalog.toolbarNote">
                Exemples de modèles suivis et régulièrement recherchés.
              </p>
            </div>

            <div className="stock-grid" id="stock-grid">
              {items.map((item) => {
                const engine = normalizeEngineType(item.engine_type);
                const image = item.images?.[0] || item.image || "/assets/images/stock/vfr400.jpg";
                const href = item.slug ? `/motos/${encodeURIComponent(item.slug)}` : item.href || "/recherche-personnalisee";

                return (
                  <article
                    key={`${item.title}-${item.year}-${item.price}`}
                    className="stock-card"
                    data-brand={item.brand || ""}
                    data-type={engine.filterValue}
                    data-price={Number(item.price || 0)}
                    data-year={Number(item.year || 0)}
                    data-search={buildSearchText(item, engine)}
                  >
                    <img src={image} alt={item.title || "Moto Nippon Heritage"} width="1280" height="960" loading="lazy" decoding="async" />
                    <div className="stock-card-body">
                      <div className="stock-badges">
                        <span>{item.year || "-"}</span>
                        <span>{item.displacement || "-"}</span>
                        <span>{engine.badge}</span>
                        <span data-i18n="common.japan">{item.origin_country || "Japon"}</span>
                      </div>
                      <h3>{item.title}</h3>
                      {item.descriptionKey ? (
                        <p data-i18n={item.descriptionKey}>{item.description}</p>
                      ) : (
                        <p>{item.description}</p>
                      )}
                      <div className="stock-footer">
                        <strong>{formatVisiblePrice(item.price)}</strong>
                        <a href={href} data-i18n="common.viewMore">
                          Voir plus
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SearchSection() {
  return (
    <section className="search-section">
      <div className="container">
        <div className="section-heading centered on-dark">
          <p className="section-kicker" data-i18n="search.kicker">
            Recherche personnalisée
          </p>
          <h2 data-i18n="search.title">Vous avez un modèle précis en tête ? Nous pouvons le rechercher au Japon pour vous.</h2>
          <div className="accent-line" aria-hidden="true"></div>
          <p data-i18n="search.body">
            Indiquez le modèle souhaité, votre budget et vos critères. Nous revenons vers vous avec une recherche ciblée
            sur des motos cohérentes, saines et adaptées à votre projet.
          </p>
        </div>

        <form className="search-form" id="search-form" action="/api/contact" method="POST">
          <input id="form-subject" type="hidden" name="_subject" value="Nouvelle demande depuis Nippon Heritage" data-i18n-value="form.subject" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" id="form-next" value="" />
          <input type="hidden" name="_url" id="form-url" value="" />
          <input type="text" name="_honey" className="form-hidden" tabIndex="-1" autoComplete="off" />

          <label>
            <span data-i18n="form.brandLabel">Marque</span>
            <input type="text" name="brand" data-i18n-placeholder="form.brandPlaceholder" placeholder="Honda, Yamaha, Suzuki..." />
          </label>
          <label>
            <span data-i18n="form.modelLabel">Modèle</span>
            <input type="text" name="model" data-i18n-placeholder="form.modelPlaceholder" placeholder="NSR250R, TZR250, RGV250..." />
          </label>
          <label>
            <span data-i18n="form.typeLabel">Motorisation</span>
            <select name="type" defaultValue="">
              <option value="" data-i18n="form.typeDefault">
                2 temps, 4 temps...
              </option>
              <option value="2t" data-i18n="filters.type2t">
                2 temps
              </option>
              <option value="4t" data-i18n="filters.type4t">
                4 temps
              </option>
            </select>
          </label>
          <label>
            <span data-i18n="form.yearLabel">Année minimale</span>
            <input type="number" name="year" min="1970" max="1999" data-i18n-placeholder="form.yearPlaceholder" placeholder="Ex. : 1988" />
          </label>
          <label>
            <span data-i18n="form.engineLabel">Cylindrée</span>
            <input type="text" name="engine" data-i18n-placeholder="form.enginePlaceholder" placeholder="250 cc, 400 cc..." />
          </label>
          <label className="range-box">
            <span data-i18n="form.budgetLabel">Budget cible</span>
            <div className="range-shell">
              <input id="search-budget" type="range" name="budget" min="7000" max="30000" step="500" defaultValue="18000" />
              <strong id="search-budget-output">18 000 €</strong>
            </div>
          </label>
          <label>
            <span data-i18n="form.nameLabel">Nom</span>
            <input type="text" name="name" data-i18n-placeholder="form.namePlaceholder" placeholder="Votre nom" required />
          </label>
          <label>
            <span data-i18n="form.firstnameLabel">Prénom</span>
            <input type="text" name="firstname" data-i18n-placeholder="form.firstnamePlaceholder" placeholder="Votre prénom" />
          </label>
          <label>
            <span data-i18n="form.emailLabel">E-mail</span>
            <input type="email" name="email" data-i18n-placeholder="form.emailPlaceholder" placeholder="votre@email.fr" required />
          </label>
          <label>
            <span data-i18n="form.phoneLabel">Téléphone</span>
            <input type="tel" name="phone" data-i18n-placeholder="form.phonePlaceholder" placeholder="Votre numéro" />
          </label>
          <label className="full-width">
            <span data-i18n="form.messageLabel">Informations complémentaires</span>
            <textarea
              name="message"
              rows="5"
              data-i18n-placeholder="form.messagePlaceholder"
              placeholder="Précisez la moto recherchée, l’état souhaité, les couleurs, la tolérance kilométrage ou votre objectif de collection."
              required
            ></textarea>
          </label>
          <div className="form-actions full-width">
            <button className="button button-primary" type="submit" data-i18n="form.submit">
              Envoyer la demande
            </button>
            <p className="form-feedback" data-i18n="form.helper">
              Les demandes sont traitées via le formulaire du site.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="section-heading centered">
          <p className="section-kicker" data-i18n="services.kicker">
            Nos services
          </p>
          <h2 data-i18n="services.title">Import, sélection, atelier et vente de motos japonaises 2 temps et 4 temps.</h2>
          <div className="accent-line" aria-hidden="true"></div>
        </div>

        <div className="service-stack">
          <article className="service-row">
            <div className="service-copy">
              <h3 data-i18n="services.import.title">Import sélectif depuis le Japon</h3>
              <p data-i18n="services.import.body">
                Le sourcing ne vise pas la quantité. Chaque moto est choisie pour sa cohérence, son état de départ et sa
                valeur potentielle une fois remise en présentation pour le marché français.
              </p>
              <ul>
                <li data-i18n="services.import.bullet1">Recherche de sportives japonaises 2 temps et 4 temps</li>
                <li data-i18n="services.import.bullet2">Priorité aux bases saines et peu kilométrées</li>
                <li data-i18n="services.import.bullet3">Sélection adaptée à une clientèle collection</li>
              </ul>
            </div>
            <div className="service-visual">
              <img src="/assets/images/stock/rvf400.jpg" alt="Honda RVF400R NC35 rouge et blanche" width="1280" height="960" loading="lazy" decoding="async" />
            </div>
          </article>

          <article className="service-row reverse">
            <div className="service-copy">
              <h3 data-i18n="services.workshop.title">Remise en état atelier avant mise en vente</h3>
              <p data-i18n="services.workshop.body">
                Chaque moto fait l’objet d’un contrôle, d’une remise en état adaptée et d’une présentation soignée avant
                sa mise en vente.
              </p>
              <ul>
                <li data-i18n="services.workshop.bullet1">Contrôle visuel et technique à réception</li>
                <li data-i18n="services.workshop.bullet2">Interventions selon l’état réel de la machine</li>
                <li data-i18n="services.workshop.bullet3">Présentation propre et valorisante avant diffusion</li>
              </ul>
            </div>
            <div className="service-visual">
              <img src="/assets/images/stock/nsr250.jpg" alt="Honda NSR250R bleue et blanche" width="2000" height="1335" loading="lazy" decoding="async" />
            </div>
          </article>

          <article className="service-row">
            <div className="service-copy">
              <h3 data-i18n="services.sale.title">Vente de motos de collection à forte personnalité</h3>
              <p data-i18n="services.sale.body">
                Nous privilégions une présentation claire, sérieuse et documentée, en accord avec le niveau d’exigence
                attendu sur ce type de motos.
              </p>
              <ul>
                <li data-i18n="services.sale.bullet1">Catalogue lisible et plus haut de gamme</li>
                <li data-i18n="services.sale.bullet2">Recherche personnalisée pour demandes précises</li>
                <li data-i18n="services.sale.bullet3">Aucune rubrique homologation intégrée au site</li>
              </ul>
            </div>
            <div className="service-visual">
              <img src="/assets/images/stock/rgv250-rj22.jpg" alt="Suzuki RGV250 VJ22 bleue et blanche" width="2000" height="1595" loading="lazy" decoding="async" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WorkshopSection() {
  return (
    <section className="atelier-section">
      <div className="container">
        <div className="section-heading centered on-dark">
          <p className="section-kicker" data-i18n="method.kicker">
            Atelier & méthode
          </p>
          <h2 data-i18n="method.title">Une méthode courte, lisible et crédible.</h2>
          <div className="accent-line" aria-hidden="true"></div>
          <p data-i18n="method.body">
            Notre méthode de travail est simple : sélectionner, contrôler, remettre en état et proposer des motos
            cohérentes à la vente.
          </p>
        </div>

        <div className="method-grid">
          <article>
            <span>01</span>
            <h3 data-i18n="method.step1.title">Repérage</h3>
            <p data-i18n="method.step1.body">Veille des modèles suivis, lecture de l’état réel et tri rigoureux des opportunités.</p>
          </article>
          <article>
            <span>02</span>
            <h3 data-i18n="method.step2.title">Achat ciblé</h3>
            <p data-i18n="method.step2.body">Priorité aux motos complètes, désirables et adaptées à une remise en état sérieuse.</p>
          </article>
          <article>
            <span>03</span>
            <h3 data-i18n="method.step3.title">Préparation</h3>
            <p data-i18n="method.step3.body">Contrôle, nettoyage, intervention atelier et mise en présentation avant publication.</p>
          </article>
          <article>
            <span>04</span>
            <h3 data-i18n="method.step4.title">Vente</h3>
            <p data-i18n="method.step4.body">Diffusion soignée, échange direct avec les acheteurs et recherche sur commande.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="home-about page-section-spaced">
      <div className="container">
        <div className="home-about-panel home-surface">
          <div className="home-about-copy">
            <p className="section-kicker" data-i18n="home.about.kicker">
              À propos
            </p>
            <h2 data-i18n="home.about.title">Une approche sélective, pensée pour des motos qui méritent mieux qu’un simple import.</h2>
            <div className="accent-line" aria-hidden="true"></div>
            <p className="hero-text" data-i18n="home.about.body">
              Nippon Heritage sélectionne, importe et valorise des motos japonaises anciennes, rares et emblématiques.
            </p>
          </div>

          <div className="home-about-aside">
            <article className="home-about-card">
              <strong data-i18n="home.about.card1.title">Bases choisies avec exigence</strong>
              <p data-i18n="home.about.card1.body">
                Les motos retenues privilégient la cohérence d’ensemble, la désirabilité et un historique lisible.
              </p>
            </article>
            <article className="home-about-card">
              <strong data-i18n="home.about.card2.title">Présentation atelier avant diffusion</strong>
              <p data-i18n="home.about.card2.body">
                Chaque machine passe par une remise en état adaptée avant sa mise en vente en France.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="section-kicker" data-i18n="home.contact.kicker">
            Contact
          </p>
          <h2 data-i18n="home.contact.title">Échangez avec Nippon Heritage au sujet d’une moto ou d’une recherche ciblée.</h2>
          <div className="accent-line" aria-hidden="true"></div>
          <p data-i18n="home.contact.body">
            Pour un modèle précis, une demande d’approvisionnement ou un premier échange, la page de contact et le
            formulaire dédié permettent un premier échange simple et direct.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/recherche-personnalisee" data-i18n="nav.cta">
              Faire une demande
            </a>
            <a className="button button-secondary" href="/contact">
              Formulaire de contact
            </a>
          </div>
        </div>

        <div className="contact-panels">
          <article>
            <strong data-i18n="home.contact.panel1.title">Recherche personnalisée</strong>
            <p data-i18n="home.contact.panel1.body">
              Indiquez le modèle souhaité, votre budget et le niveau d’exigence attendu pour la sélection.
            </p>
          </article>
          <article>
            <strong data-i18n="home.contact.panel2.title">Motos en vente</strong>
            <p data-i18n="home.contact.panel2.body">
              Les motos publiées peuvent être complétées par des recherches en cours ou des arrivages à venir.
            </p>
          </article>
          <article>
            <strong data-i18n="home.contact.panel3.title">Atelier et présentation</strong>
            <p data-i18n="home.contact.panel3.body">
              La mise en vente s’appuie sur une préparation claire, une présentation sérieuse et un échange direct.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
