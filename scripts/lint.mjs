import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const filesToCheck = [];

const walk = (directory) => {
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === ".git") {
        continue;
      }
      walk(fullPath);
      continue;
    }

    if (fullPath.endsWith(".js") || fullPath.endsWith(".mjs")) {
      filesToCheck.push(fullPath);
    }
  }
};

walk(root);

for (const file of filesToCheck) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}

JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));

console.log(`Syntaxe JavaScript valide sur ${filesToCheck.length} fichier(s).`);
