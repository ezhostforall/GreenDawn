import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const distDirectory = join(process.cwd(), "dist");
const html = await readFile(join(distDirectory, "index.html"), "utf8");
const failures = [];

const matches = (expression) => [...html.matchAll(expression)];
const h1Count = matches(/<h1(?:\s|>)/gi).length;
if (h1Count !== 1) failures.push(`Expected one h1, found ${h1Count}.`);

const ids = matches(/\sid=["']([^"']+)["']/gi).map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length > 0) failures.push(`Duplicate IDs: ${duplicateIds.join(", ")}.`);

for (const match of matches(/<img\b[^>]*>/gi)) {
  const image = match[0];
  if (!/\salt(?:=["'][^"']*["'])?(?:\s|>)/i.test(image)) failures.push(`Image without alt text: ${image}`);
  if (!/\swidth=["']\d+["']/i.test(image) || !/\sheight=["']\d+["']/i.test(image)) {
    failures.push(`Image without intrinsic dimensions: ${image}`);
  }
}

const fragmentLinks = matches(/\shref=["']#([^"']+)["']/gi).map((match) => match[1]);
for (const fragment of fragmentLinks) {
  if (!ids.includes(fragment)) failures.push(`Fragment link has no target: #${fragment}.`);
}

const localAssets = new Set();
for (const match of matches(/\s(?:src|href)=["'](\/(?!\/)[^"'?#]+)["']/gi)) {
  localAssets.add(match[1]);
}
for (const match of matches(/\ssrcset=["']([^"']+)["']/gi)) {
  for (const candidate of match[1].split(",")) {
    const path = candidate.trim().split(/\s+/)[0];
    if (path.startsWith("/")) localAssets.add(path);
  }
}

for (const asset of localAssets) {
  try {
    await access(join(distDirectory, asset.replace(/^\//, "")));
  } catch {
    failures.push(`Missing generated asset: ${asset}.`);
  }
}

const assetDirectory = join(distDirectory, "_astro");
const stylesheetFiles = (await readdir(assetDirectory)).filter((file) => file.endsWith(".css"));
const stylesheets = await Promise.all(stylesheetFiles.map((file) => readFile(join(assetDirectory, file), "utf8")));
const compiledCss = stylesheets.join("\n");

const socialPreviewPath = join(distDirectory, "brand", "greendawn-social-preview.jpg");
try {
  await access(socialPreviewPath);
} catch {
  failures.push("The dedicated 1200 × 630 social-preview image is missing.");
}
if (!html.includes('property="og:image:width" content="1200"') || !html.includes('property="og:image:height" content="630"')) {
  failures.push("Open Graph image dimensions are missing or incorrect.");
}
if (/fonts\.(?:googleapis|gstatic)\.com/i.test(html)) failures.push("Production HTML must not depend on render-blocking Google Font requests.");

if (!/prefers-reduced-motion\s*:\s*reduce/i.test(`${html}\n${compiledCss}`)) {
  failures.push("Reduced-motion rules are missing from the production output.");
}
if (/data-counter/i.test(html)) failures.push("Survey prices must not use count-up animation hooks.");
if (!html.includes("£200") || !html.includes("£1,500")) failures.push("Expected static survey prices are missing.");
if (/\.js\s+\[data-reveal\][^{]*\{[^}]*visibility\s*:\s*hidden/i.test(compiledCss)) {
  failures.push("Reveal content is hidden by CSS before JavaScript runs.");
}
if (!/--focus-ring\s*:/.test(compiledCss)) failures.push("The shared focus-ring token is missing.");
if (!/(?:max-height\s*:\s*44rem|height\s*<=\s*44rem)/.test(compiledCss)) failures.push("Short-viewport responsive rules are missing.");

const animationFiles = ["reveals.ts", "problem.ts", "solutions.ts", "system.ts"];
for (const animationFile of animationFiles) {
  const animationSource = await readFile(join(process.cwd(), "src", "scripts", "animations", animationFile), "utf8");
  if (/\bopacity\s*:|\bautoAlpha\s*:/.test(animationSource)) {
    failures.push(`${animationFile} must not animate readable content opacity.`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Production validation passed: 1 h1, ${ids.length} unique IDs and ${localAssets.size} local assets checked.`);
}
