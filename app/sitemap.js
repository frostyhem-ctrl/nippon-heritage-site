import { getPublishedMotorcyclesSafe } from "../lib/motorcycles";
import { getSiteUrl } from "../lib/env";

export const revalidate = 300;

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const motorcycles = await getPublishedMotorcyclesSafe();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...motorcycles.map((item) => ({
      url: `${siteUrl}/motos/${item.slug}`,
      lastModified: item.updated_at || item.created_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
