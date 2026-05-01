import { createAnonClient } from "./supabase.js";

export const adminStatuses = ["draft", "available", "reserved", "sold"];
export const publicStatuses = ["available", "reserved", "sold"];

const legacyPublicStatuses = new Set(["published"]);
const publicStatusSet = new Set(publicStatuses);
const adminStatusSet = new Set([...adminStatuses, ...legacyPublicStatuses]);

const publicFields = [
  "id",
  "title",
  "brand",
  "model",
  "year",
  "mileage",
  "displacement",
  "engine_type",
  "motorcycle_type",
  "price",
  "description",
  "condition",
  "origin_country",
  "import_details",
  "location",
  "status",
  "slug",
  "images",
  "image_paths",
  "published_at",
  "created_at",
  "updated_at",
].join(", ");

export const adminFields = publicFields;

function normalizeNullableString(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function normalizeNullableInteger(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.trunc(parsed) : null;
}

export function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function normalizeStatus(value) {
  const normalized = String(value || "draft").trim().toLowerCase();
  if (normalized === "published") {
    return "available";
  }

  return adminStatusSet.has(normalized) ? normalized : "draft";
}

export function getStatusLabel(status) {
  switch (normalizeStatus(status)) {
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

export function isPublicStatus(status) {
  return publicStatusSet.has(normalizeStatus(status));
}

function normalizeGalleryItem(item, index) {
  if (typeof item === "string") {
    const url = item.trim();
    if (!url) {
      return null;
    }

    return {
      id: `legacy-${index}`,
      url,
      path: "",
      position: index,
      isPrimary: index === 0,
    };
  }

  if (!item || typeof item !== "object") {
    return null;
  }

  const url = normalizeNullableString(item.url || item.image || item.src);
  if (!url) {
    return null;
  }

  return {
    id: normalizeNullableString(item.id) || `image-${index}`,
    url,
    path: normalizeNullableString(item.path) || "",
    position: Number.isFinite(Number(item.position)) ? Number(item.position) : index,
    isPrimary: Boolean(item.isPrimary),
  };
}

export function normalizeGalleryItems(value, fallbackPaths = []) {
  const rawItems = Array.isArray(value) ? value : [];
  const normalized = rawItems
    .map((item, index) => {
      const galleryItem = normalizeGalleryItem(item, index);
      if (!galleryItem) {
        return null;
      }

      if (!galleryItem.path && Array.isArray(fallbackPaths) && fallbackPaths[index]) {
        galleryItem.path = String(fallbackPaths[index]).trim();
      }

      return galleryItem;
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.isPrimary && !right.isPrimary) {
        return -1;
      }
      if (!left.isPrimary && right.isPrimary) {
        return 1;
      }
      return left.position - right.position;
    })
    .map((item, index) => ({
      ...item,
      position: index,
      isPrimary: index === 0,
    }));

  return normalized;
}

export function galleryFromRecord(record) {
  const urls = Array.isArray(record?.images) ? record.images : [];
  const paths = Array.isArray(record?.image_paths) ? record.image_paths : [];
  return normalizeGalleryItems(
    urls.map((url, index) => ({
      id: `${record?.id || "image"}-${index}`,
      url,
      path: paths[index] || "",
      position: index,
      isPrimary: index === 0,
    }))
  );
}

export function getPrimaryImage(record) {
  return galleryFromRecord(record)[0]?.url || "/assets/images/stock/vfr400.jpg";
}

export function hydrateMotorcycleRecord(record) {
  if (!record) {
    return null;
  }

  const gallery = galleryFromRecord(record);
  const status = normalizeStatus(record.status);

  return {
    ...record,
    status,
    status_label: getStatusLabel(status),
    gallery,
    main_image: gallery[0]?.url || null,
  };
}

export function hydrateMotorcycleRecords(records) {
  return Array.isArray(records) ? records.map((item) => hydrateMotorcycleRecord(item)).filter(Boolean) : [];
}

export function normalizeMotorcyclePayload(payload, currentRecord = null) {
  const title = normalizeNullableString(payload.title);
  if (!title) {
    throw new Error("Le titre de l'annonce est obligatoire.");
  }

  const status = normalizeStatus(payload.status);
  if (!adminStatusSet.has(status)) {
    throw new Error("Statut d'annonce invalide.");
  }

  const slugSource =
    normalizeNullableString(payload.slug) ||
    normalizeNullableString(`${payload.brand || ""} ${payload.model || ""}`) ||
    title;

  const gallery = normalizeGalleryItems(payload.gallery || payload.images || [], payload.image_paths);
  const publishedAt =
    status === "draft"
      ? null
      : normalizeNullableString(payload.published_at) ||
        normalizeNullableString(currentRecord?.published_at) ||
        new Date().toISOString();

  return {
    title,
    brand: normalizeNullableString(payload.brand),
    model: normalizeNullableString(payload.model),
    year: normalizeNullableInteger(payload.year),
    mileage: normalizeNullableInteger(payload.mileage),
    displacement: normalizeNullableString(payload.displacement),
    engine_type: normalizeNullableString(payload.engine_type),
    motorcycle_type: normalizeNullableString(payload.motorcycle_type),
    price: normalizeNullableInteger(payload.price),
    description: normalizeNullableString(payload.description),
    condition: normalizeNullableString(payload.condition),
    origin_country: normalizeNullableString(payload.origin_country),
    import_details: normalizeNullableString(payload.import_details),
    location: normalizeNullableString(payload.location),
    status,
    slug: slugify(slugSource),
    images: gallery.map((item) => item.url),
    image_paths: gallery.map((item) => item.path || ""),
    published_at: publishedAt,
    updated_at: new Date().toISOString(),
  };
}

export async function getPublicMotorcycles() {
  const client = createAnonClient();
  const { data, error } = await client
    .from("motorcycles")
    .select(publicFields)
    .in("status", [...publicStatuses, "published"])
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return hydrateMotorcycleRecords(data).filter((item) => isPublicStatus(item.status));
}

export async function getPublicMotorcycleBySlug(slug) {
  const client = createAnonClient();
  const { data, error } = await client
    .from("motorcycles")
    .select(publicFields)
    .eq("slug", slug)
    .in("status", [...publicStatuses, "published"])
    .maybeSingle();

  if (error) {
    throw error;
  }

  const item = hydrateMotorcycleRecord(data);
  if (!item || !isPublicStatus(item.status)) {
    return null;
  }

  return item;
}

export async function getAdminMotorcycles(serviceClient) {
  const { data, error } = await serviceClient
    .from("motorcycles")
    .select(adminFields)
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return hydrateMotorcycleRecords(data);
}

export async function getAdminMotorcycleById(serviceClient, id) {
  const { data, error } = await serviceClient.from("motorcycles").select(adminFields).eq("id", id).maybeSingle();

  if (error) {
    throw error;
  }

  return hydrateMotorcycleRecord(data);
}

export async function getPublishedMotorcycles() {
  return getPublicMotorcycles();
}

export async function getPublishedMotorcycleBySlug(slug) {
  return getPublicMotorcycleBySlug(slug);
}

export async function getPublishedMotorcyclesSafe() {
  try {
    return await getPublicMotorcycles();
  } catch {
    return [];
  }
}
