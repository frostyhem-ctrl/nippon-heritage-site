export const DEFAULT_SITE_URL = "https://www.nipponheritage.fr";

export function trimTrailingSlash(value = "") {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
}

export function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getGoogleSiteVerification() {
  return process.env.GOOGLE_SITE_VERIFICATION || undefined;
}
