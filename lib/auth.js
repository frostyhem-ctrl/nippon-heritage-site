import { createAnonClient, createServiceClient } from "./supabase.js";

function getBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length);
}

export async function requireAdmin(request) {
  const token = getBearerToken(request);
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
}
