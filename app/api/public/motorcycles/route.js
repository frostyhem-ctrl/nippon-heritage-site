import { NextResponse } from "next/server";
import { getPublishedMotorcycles } from "../../../../lib/motorcycles";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await getPublishedMotorcycles();
    return NextResponse.json(
      { items },
      {
        headers: {
          "Cache-Control": "public, max-age=120, s-maxage=120, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Catalogue public Supabase indisponible.",
        details: error.message,
      },
      { status: 503 }
    );
  }
}
