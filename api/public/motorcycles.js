const { createAnonClient } = require("../_lib/supabase");
const { sendJson } = require("../_lib/http");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
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

    res.setHeader("Cache-Control", "public, max-age=120, s-maxage=120, stale-while-revalidate=600");

    return sendJson(res, 200, {
      items: Array.isArray(data) ? data : [],
    });
  } catch (error) {
    return sendJson(res, 503, {
      error: "Catalogue public Supabase indisponible.",
      details: error.message,
    });
  }
};
