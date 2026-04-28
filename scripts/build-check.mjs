import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "index.html",
  "merci.html",
  "robots.txt",
  "sitemap.xml",
  "404.html",
  "admin/index.html",
  "admin/login/index.html",
  "api/public/config.js",
  "api/public/motorcycles.js",
  "api/admin/me.js",
  "api/admin/motorcycles.js",
  "supabase/migrations/20260428193000_init.sql",
];

for (const relativeFile of requiredFiles) {
  if (!existsSync(path.join(root, relativeFile))) {
    throw new Error(`Missing required file: ${relativeFile}`);
  }
}

const indexHtml = readFileSync(path.join(root, "index.html"), "utf8");
const thankYouHtml = readFileSync(path.join(root, "merci.html"), "utf8");
const robots = readFileSync(path.join(root, "robots.txt"), "utf8");
const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");

const checks = [
  [indexHtml.includes('rel="canonical" href="https://www.nipponheritage.fr/"'), "Canonical home missing"],
  [indexHtml.includes("application/ld+json"), "JSON-LD missing on home"],
  [thankYouHtml.includes('name="robots" content="noindex, follow"'), "Merci page should be noindex"],
  [robots.includes("Sitemap: https://www.nipponheritage.fr/sitemap.xml"), "robots.txt sitemap missing"],
  [sitemap.includes("<loc>https://www.nipponheritage.fr/</loc>"), "sitemap home URL missing"],
];

for (const [condition, message] of checks) {
  if (!condition) {
    throw new Error(String(message));
  }
}

console.log("Validation statique OK.");
