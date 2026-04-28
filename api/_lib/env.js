const defaultSiteUrl = "https://www.nipponheritage.fr";

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const getSiteUrl = () => {
  const value = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
  return trimTrailingSlash(value);
};

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

module.exports = {
  defaultSiteUrl,
  getRequiredEnv,
  getSiteUrl,
};
