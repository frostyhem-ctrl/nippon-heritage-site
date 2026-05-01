import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import {
  createAdminMotorcycle,
  getAdminMotorcycleById,
  getAdminMotorcycles,
  normalizeMotorcyclePayload,
  updateAdminMotorcycle,
} from "../../../../lib/motorcycles";
import { getStorageBucket } from "../../../../lib/env";

export const runtime = "nodejs";

async function removeStoredImages(serviceClient, imagePaths = []) {
  const paths = Array.isArray(imagePaths) ? imagePaths.map((value) => String(value || "").trim()).filter(Boolean) : [];
  if (!paths.length) {
    return;
  }

  await serviceClient.storage.from(getStorageBucket()).remove(paths);
}

export async function GET(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const items = await getAdminMotorcycles(authResult.serviceClient);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const payload = normalizeMotorcyclePayload(await request.json());
    const data = await createAdminMotorcycle(authResult.serviceClient, payload);

    const item = await getAdminMotorcycleById(authResult.serviceClient, data.id);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
    }

    const currentItem = await getAdminMotorcycleById(authResult.serviceClient, body.id);
    if (!currentItem) {
      return NextResponse.json({ error: "Annonce introuvable." }, { status: 404 });
    }

    const payload = normalizeMotorcyclePayload(body, currentItem);
    const data = await updateAdminMotorcycle(authResult.serviceClient, body.id, payload);

    const item = await getAdminMotorcycleById(authResult.serviceClient, data.id);
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
    }

    const currentItem = await getAdminMotorcycleById(authResult.serviceClient, body.id);
    if (!currentItem) {
      return NextResponse.json({ error: "Annonce introuvable." }, { status: 404 });
    }

    await removeStoredImages(authResult.serviceClient, currentItem.image_paths);

    const { error } = await authResult.serviceClient.from("motorcycles").delete().eq("id", body.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}
