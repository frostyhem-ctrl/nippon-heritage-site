import { NextResponse } from "next/server";
import { applyAdminSessionCookie, clearAdminSessionCookie, verifyAdminAccessToken } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const accessToken = typeof body?.accessToken === "string" ? body.accessToken.trim() : "";
    const authResult = await verifyAdminAccessToken(accessToken);

    if (!authResult.ok) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const response = NextResponse.json({
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
      },
      profile: authResult.profile,
    });

    return applyAdminSessionCookie(response, accessToken);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Erreur interne." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  return clearAdminSessionCookie(response);
}
