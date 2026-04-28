import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const authResult = await requireAdmin(request);
    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    return NextResponse.json({
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
      },
      profile: authResult.profile,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}
