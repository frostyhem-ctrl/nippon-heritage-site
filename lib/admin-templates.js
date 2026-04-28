import { adminLoginTemplate, adminTemplate } from "./template-strings.js";

function readTemplate(relativePath) {
  if (relativePath === "admin/index.html") {
    return adminTemplate;
  }

  if (relativePath === "admin/login/index.html") {
    return adminLoginTemplate;
  }

  throw new Error(`Template introuvable: ${relativePath}`);
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
