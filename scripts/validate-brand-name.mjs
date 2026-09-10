import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const incorrectBrandName = `Green${"Dawn"}`;
const checkedExtensions = new Set([".astro", ".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".yml", ".yaml"]);
const ignoredDirectories = new Set([".git", ".astro", "dist", "node_modules"]);
const failures = [];

async function inspectDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      await inspectDirectory(path);
      continue;
    }

    if (!checkedExtensions.has(extname(entry.name))) continue;

    const contents = await readFile(path, "utf8");
    if (contents.includes(incorrectBrandName)) failures.push(relative(root, path));
  }
}

await inspectDirectory(root);

if (failures.length > 0) {
  console.error(`Incorrect Greendawn capitalisation found in:\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("Greendawn naming validation passed.");
}
