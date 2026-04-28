const { defaultSiteUrl, getSiteUrl } = require("../_lib/env");
const { sendJson } = require("../_lib/http");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");

  return sendJson(res, 200, {
    siteUrl: getSiteUrl(),
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null,
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || null,
    defaultSiteUrl,
  });
};
