const { requireAdmin } = require("../_lib/auth");
const { sendJson } = require("../_lib/http");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const authResult = await requireAdmin(req);
    if (!authResult.ok) {
      return sendJson(res, authResult.status, { error: authResult.error });
    }

    return sendJson(res, 200, {
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
      },
      profile: authResult.profile,
    });
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Erreur interne." });
  }
};
