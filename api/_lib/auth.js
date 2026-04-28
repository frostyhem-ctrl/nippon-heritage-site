const { createAnonClient, createServiceClient } = require("./supabase");

const getBearerToken = (req) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    return null;
  }
  return header.slice("Bearer ".length);
};

const requireAdmin = async (req) => {
  const token = getBearerToken(req);
  if (!token) {
    return {
      ok: false,
      status: 401,
      error: "Session admin requise.",
    };
  }

  const anonClient = createAnonClient();
  const serviceClient = createServiceClient();

  const {
    data: { user },
    error: userError,
  } = await anonClient.auth.getUser(token);

  if (userError || !user) {
    return {
      ok: false,
      status: 401,
      error: "Session Supabase invalide ou expiree.",
    };
  }

  const { data: profile, error: profileError } = await serviceClient
    .from("admin_profiles")
    .select("id, email, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== "admin") {
    return {
      ok: false,
      status: 403,
      error: "Compte non autorise sur l'administration.",
    };
  }

  return {
    ok: true,
    user,
    profile,
    serviceClient,
  };
};

module.exports = {
  requireAdmin,
};
