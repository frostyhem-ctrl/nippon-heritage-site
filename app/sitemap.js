import { getPublishedMotorcyclesSafe } from "../lib/motorcycles";
import { getSiteUrl } from "../lib/env";

export const revalidate = 300;

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const motorcycles = await getPublishedMotorcyclesSafe();
  const staticRoutes = [
    "/",
    "/a-propos",
    "/motos-disponibles",
    "/recherche-personnalisee",
    "/services",
    "/atelier-restauration",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    "/politique-cookies",
  ];

  return [
    ...staticRoutes.map((path, index) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: index === 0 ? 1 : 0.8,
    })),
    ...motorcycles.map((item) => ({
      url: `${siteUrl}/motos/${item.slug}`,
      lastModified: item.updated_at || item.created_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
