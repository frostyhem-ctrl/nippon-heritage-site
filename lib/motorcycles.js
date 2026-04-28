import { createAnonClient } from "./supabase";

export const allowedStatuses = new Set(["draft", "published", "sold"]);

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

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeImages(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeMotorcyclePayload(payload) {
  const title = normalizeNullableString(payload.title);
  if (!title) {
    throw new Error("Le titre est obligatoire.");
  }

  const status = normalizeNullableString(payload.status) || "draft";
  if (!allowedStatuses.has(status)) {
    throw new Error("Statut invalide.");
  }

  const slugSource =
    normalizeNullableString(payload.slug) ||
    normalizeNullableString(`${payload.brand || ""} ${payload.model || ""}`) ||
    title;

  return {
    title,
    brand: normalizeNullableString(payload.brand),
    model: normalizeNullableString(payload.model),
    year: normalizeNullableInteger(payload.year),
    displacement: normalizeNullableString(payload.displacement),
    engine_type: normalizeNullableString(payload.engine_type),
    origin_country: normalizeNullableString(payload.origin_country),
    mileage: normalizeNullableInteger(payload.mileage),
    price: normalizeNullableInteger(payload.price),
    description: normalizeNullableString(payload.description),
    status,
    slug: slugify(slugSource),
    images: normalizeImages(payload.images),
    updated_at: new Date().toISOString(),
  };
}

export async function getPublishedMotorcycles() {
  const client = createAnonClient();
  const { data, error } = await client
    .from("motorcycles")
    .select(
      "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at"
    )
    .eq("status", "published")
    .order("year", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return Array.isArray(data) ? data : [];
}

export async function getPublishedMotorcycleBySlug(slug) {
  const client = createAnonClient();
  const { data, error } = await client
    .from("motorcycles")
    .select(
      "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data || null;
}

export async function getPublishedMotorcyclesSafe() {
  try {
    return await getPublishedMotorcycles();
  } catch {
    return [];
  }
}
