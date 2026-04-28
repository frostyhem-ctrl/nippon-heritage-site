import Script from "next/script";
import { notFound } from "next/navigation";
import { getPublishedMotorcycleBySlug } from "../../../lib/motorcycles";
import {
  buildProductJsonLd,
  buildProductMetadata,
  getAbsoluteImageUrl,
  getDetailChrome,
  getFallbackProductDescription,
} from "../../../lib/site";

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  let motorcycle = null;

  try {
    motorcycle = await getPublishedMotorcycleBySlug(resolvedParams.slug);
  } catch {
    motorcycle = null;
  }

  if (!motorcycle) {
    return {
      title: "Moto introuvable | Nippon Heritage",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const meta = buildProductMetadata(motorcycle);
  const image = motorcycle.images?.[0] || "/assets/images/stock/vfr400.jpg";

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/motos/${motorcycle.slug}`,
    },
    openGraph: {
      type: "product",
      siteName: "Nippon Heritage",
      locale: "fr_FR",
      url: `/motos/${motorcycle.slug}`,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: getAbsoluteImageUrl(image.startsWith("/") ? image : `/${image}`),
          alt: motorcycle.title || "Moto Nippon Heritage",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [getAbsoluteImageUrl(image.startsWith("/") ? image : `/${image}`)],
    },
  };
}

export default async function MotorcyclePage({ params }) {
  const resolvedParams = await params;
  let motorcycle = null;

  try {
    motorcycle = await getPublishedMotorcycleBySlug(resolvedParams.slug);
  } catch {
    motorcycle = null;
  }

  if (!motorcycle) {
    notFound();
  }

  const { prefix, suffix } = getDetailChrome();
  const image = motorcycle.images?.[0] || "/assets/images/stock/vfr400.jpg";
  const jsonLd = buildProductJsonLd(motorcycle);
  const fallbackDescription = getFallbackProductDescription(motorcycle);
  const price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
    .format(Number(motorcycle.price || 0))
    .replace(/\u00a0/g, " ");

  return (
    <>
      <Script id="page-context-product" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="product";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: prefix }} />
      <main className="product-page">
        <section className="product-section">
          <div className="container">
            <div className="section-heading centered on-dark">
              <p className="section-kicker">Moto disponible</p>
              <h1>{motorcycle.title}</h1>
              <div className="accent-line" aria-hidden="true"></div>
              <p>{motorcycle.description || fallbackDescription}</p>
            </div>

            <div className="product-layout">
              <div className="product-visual">
                <img
                  src={image}
                  alt={motorcycle.title || "Moto japonaise de collection"}
                  width="1280"
                  height="960"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <aside className="product-panel">
                <div className="stock-badges">
                  {motorcycle.year ? <span>{motorcycle.year}</span> : null}
                  {motorcycle.displacement ? <span>{motorcycle.displacement}</span> : null}
                  {motorcycle.engine_type ? <span>{String(motorcycle.engine_type).toUpperCase()}</span> : null}
                  <span>{motorcycle.origin_country || "Japon"}</span>
                </div>

                <p className="product-price">{price}</p>

                <dl className="product-specs">
                  {motorcycle.brand ? (
                    <>
                      <dt>Marque</dt>
                      <dd>{motorcycle.brand}</dd>
                    </>
                  ) : null}
                  {motorcycle.model ? (
                    <>
                      <dt>Modele</dt>
                      <dd>{motorcycle.model}</dd>
                    </>
                  ) : null}
                  {motorcycle.mileage ? (
                    <>
                      <dt>Kilometrage</dt>
                      <dd>{new Intl.NumberFormat("fr-FR").format(motorcycle.mileage)} km</dd>
                    </>
                  ) : null}
                  {motorcycle.slug ? (
                    <>
                      <dt>Reference</dt>
                      <dd>{motorcycle.slug}</dd>
                    </>
                  ) : null}
                </dl>

                <div className="product-actions">
                  <a className="button" href="/#commande">
                    Faire une demande
                  </a>
                  <a className="button button-secondary" href="/#stock">
                    Retour au stock
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <div dangerouslySetInnerHTML={{ __html: suffix }} />
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
