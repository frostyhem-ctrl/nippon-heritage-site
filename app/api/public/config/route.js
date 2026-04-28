import { NextResponse } from "next/server";
import { DEFAULT_SITE_URL, getSiteUrl } from "../../../../lib/env";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      siteUrl: getSiteUrl(),
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null,
      googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || null,
      defaultSiteUrl: DEFAULT_SITE_URL,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    }
  );
}
