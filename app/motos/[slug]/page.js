import Script from "next/script";
import { notFound } from "next/navigation";
import { PublicShell } from "../../../components/public-ui";
import { MotorcyclePublicGallery } from "../../../components/motorcycle-public-gallery";
import { getPublishedMotorcycleBySlug } from "../../../lib/motorcycles";
import { buildProductJsonLd, buildProductMetadata, getAbsoluteImageUrl, getFallbackProductDescription } from "../../../lib/site";

export const revalidate = 120;

function formatStatusLabel(status) {
  switch (status) {
    case "available":
      return "Disponible";
    case "reserved":
      return "Réservée";
    case "sold":
      return "Vendue";
    default:
      return "Brouillon";
  }
}

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

  const jsonLd = buildProductJsonLd(motorcycle);
  const fallbackDescription = getFallbackProductDescription(motorcycle);
  const price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
    .format(Number(motorcycle.price || 0))
    .replace(/\u00a0/g, " ");

  const statusLabel = formatStatusLabel(motorcycle.status);
  const galleryImages = motorcycle.gallery?.map((item) => item.url) || motorcycle.images || [];

  return (
    <>
      <Script id="page-context-product" strategy="beforeInteractive">
        {`document.documentElement.dataset.page="product";`}
      </Script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublicShell activePath="/motos-disponibles">
        <main className="product-page">
          <section className="product-section">
            <div className="container">
              <div className="section-heading centered on-dark">
                <p className="section-kicker">Moto en vente</p>
                <h1>{motorcycle.title}</h1>
                <div className="accent-line" aria-hidden="true"></div>
                <p>{motorcycle.description || fallbackDescription}</p>
              </div>

              <div className="product-layout">
                <MotorcyclePublicGallery title={motorcycle.title} images={galleryImages} />

                <aside className="product-panel">
                  <div className="stock-badges">
                    {motorcycle.year ? <span>{motorcycle.year}</span> : null}
                    {motorcycle.displacement ? <span>{motorcycle.displacement}</span> : null}
                    {motorcycle.engine_type ? <span>{String(motorcycle.engine_type).toUpperCase()}</span> : null}
                    <span>{motorcycle.origin_country || "Japon"}</span>
                    {motorcycle.status !== "available" ? <span>{statusLabel}</span> : null}
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
                        <dt>Modèle</dt>
                        <dd>{motorcycle.model}</dd>
                      </>
                    ) : null}
                    {motorcycle.motorcycle_type ? (
                      <>
                        <dt>Type</dt>
                        <dd>{motorcycle.motorcycle_type}</dd>
                      </>
                    ) : null}
                    {motorcycle.condition ? (
                      <>
                        <dt>État</dt>
                        <dd>{motorcycle.condition}</dd>
                      </>
                    ) : null}
                    {motorcycle.mileage ? (
                      <>
                        <dt>Kilométrage</dt>
                        <dd>{new Intl.NumberFormat("fr-FR").format(motorcycle.mileage)} km</dd>
                      </>
                    ) : null}
                    {motorcycle.location ? (
                      <>
                        <dt>Localisation</dt>
                        <dd>{motorcycle.location}</dd>
                      </>
                    ) : null}
                    {motorcycle.import_details ? (
                      <>
                        <dt>Importation</dt>
                        <dd>{motorcycle.import_details}</dd>
                      </>
                    ) : null}
                    {motorcycle.slug ? (
                      <>
                        <dt>Référence</dt>
                        <dd>{motorcycle.slug}</dd>
                      </>
                    ) : null}
                  </dl>

                  <div className="product-actions">
                    <a className="button" href="/recherche-personnalisee">
                      Faire une demande
                    </a>
                    <a className="button button-secondary" href="/motos-disponibles">
                      Retour aux motos
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>
      </PublicShell>
      <Script src="/site-script.js" strategy="afterInteractive" />
    </>
  );
}
