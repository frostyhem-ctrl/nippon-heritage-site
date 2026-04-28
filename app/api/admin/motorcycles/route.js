import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { normalizeMotorcyclePayload } from "../../../../lib/motorcycles";

export const runtime = "nodejs";

const fields =
  "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at";

export async function GET(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { data, error } = await authResult.serviceClient
      .from("motorcycles")
      .select(fields)
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data || [] });
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
    const { data, error } = await authResult.serviceClient
      .from("motorcycles")
      .insert(payload)
      .select(fields)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
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

    const payload = normalizeMotorcyclePayload(body);
    const { data, error } = await authResult.serviceClient
      .from("motorcycles")
      .update(payload)
      .eq("id", body.id)
      .select(fields)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
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

    const { error } = await authResult.serviceClient.from("motorcycles").delete().eq("id", body.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}
