import { readFileSync } from "node:fs";
import path from "node:path";

const templatePaths = {
  "admin/index.html": path.join(process.cwd(), "admin", "index.html"),
  "admin/login/index.html": path.join(process.cwd(), "admin", "login", "index.html"),
};

function readTemplate(relativePath) {
  const fullPath = templatePaths[relativePath];
  if (!fullPath) {
    throw new Error(`Template introuvable: ${relativePath}`);
  }

  return readFileSync(fullPath, "utf8");
}

function extractBody(content) {
  const match = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : content;
}

function stripScripts(content) {
  return content.replace(/<script\b[\s\S]*?<\/script>/gi, "");
}

function normalizePublicPaths(content) {
  return content.replace(/(src|href)=["']assets\//gi, '$1="/assets/');
}

export function buildAdminHtml() {
  return normalizePublicPaths(stripScripts(extractBody(readTemplate("admin/index.html"))));
}

export function buildAdminLoginHtml() {
  return normalizePublicPaths(stripScripts(extractBody(readTemplate("admin/login/index.html"))));
}
