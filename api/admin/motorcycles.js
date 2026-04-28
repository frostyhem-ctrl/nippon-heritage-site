const { requireAdmin } = require("../_lib/auth");
const { normalizeMotorcyclePayload } = require("../_lib/motorcycles");
const { readJsonBody, sendJson } = require("../_lib/http");

module.exports = async (req, res) => {
  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return sendJson(res, authResult.status, { error: authResult.error });
    }

    const { serviceClient } = authResult;

    if (req.method === "GET") {
      const { data, error } = await serviceClient
        .from("motorcycles")
        .select(
          "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at"
        )
        .order("updated_at", { ascending: false });

      if (error) {
        return sendJson(res, 500, { error: error.message });
      }

      return sendJson(res, 200, { items: data || [] });
    }

    if (req.method === "POST") {
      const payload = normalizeMotorcyclePayload(await readJsonBody(req));

      const { data, error } = await serviceClient
        .from("motorcycles")
        .insert(payload)
        .select(
          "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at"
        )
        .single();

      if (error) {
        return sendJson(res, 400, { error: error.message });
      }

      return sendJson(res, 201, { item: data });
    }

    if (req.method === "PUT") {
      const body = await readJsonBody(req);
      if (!body.id) {
        return sendJson(res, 400, { error: "Identifiant manquant." });
      }

      const payload = normalizeMotorcyclePayload(body);
      const { data, error } = await serviceClient
        .from("motorcycles")
        .update(payload)
        .eq("id", body.id)
        .select(
          "id, title, brand, model, year, displacement, engine_type, origin_country, mileage, price, description, status, slug, images, created_at, updated_at"
        )
        .single();

      if (error) {
        return sendJson(res, 400, { error: error.message });
      }

      return sendJson(res, 200, { item: data });
    }

    if (req.method === "DELETE") {
      const body = await readJsonBody(req);
      if (!body.id) {
        return sendJson(res, 400, { error: "Identifiant manquant." });
      }

      const { error } = await serviceClient.from("motorcycles").delete().eq("id", body.id);
      if (error) {
        return sendJson(res, 400, { error: error.message });
      }

      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 405, { error: "Method not allowed." });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Erreur interne." });
  }
};
