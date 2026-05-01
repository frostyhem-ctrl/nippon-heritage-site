import { cookies } from "next/headers";
import { createAnonClient, createServiceClient } from "./supabase.js";

export const ADMIN_SESSION_COOKIE = "nh-admin-session-v2";
export const LEGACY_ADMIN_SESSION_COOKIE = "nh-admin-session";

function getBearerToken(request) {
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length).trim() || null;
}

async function findAdminProfile(serviceClient, userId) {
  const { data: profile, error } = await serviceClient
    .from("admin_profiles")
    .select("id, email, role, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (error || !profile || profile.role !== "admin") {
    return null;
  }

  return profile;
}

export async function verifyAdminAccessToken(token) {
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
      error: "Session Supabase invalide ou expirée.",
    };
  }

  const profile = await findAdminProfile(serviceClient, user.id);
  if (!profile) {
    return {
      ok: false,
      status: 403,
      error: "Compte non autorisé sur l'administration.",
    };
  }

  return {
    ok: true,
    token,
    user,
    profile,
    serviceClient,
  };
}

function getCookieTokenFromRequest(request) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value || null;
}

export async function requireAdmin(request) {
  const token = getBearerToken(request) || getCookieTokenFromRequest(request);
  return verifyAdminAccessToken(token);
}

export async function requireAdminFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value || null;
  return verifyAdminAccessToken(token);
}

function buildCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export function applyAdminSessionCookie(response, token) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, buildCookieOptions());
  response.cookies.set(LEGACY_ADMIN_SESSION_COOKIE, "", {
    ...buildCookieOptions(),
    maxAge: 0,
  });
  return response;
}

export function clearAdminSessionCookie(response) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...buildCookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(LEGACY_ADMIN_SESSION_COOKIE, "", {
    ...buildCookieOptions(),
    maxAge: 0,
  });
  return response;
}
