import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const distDirectory = join(process.cwd(), "dist");
const html = await readFile(join(distDirectory, "index.html"), "utf8");
const failures = [];

const sourceStylesDirectory = join(process.cwd(), "src", "styles");
const sourceStyleFiles = await readdir(sourceStylesDirectory);
const legacyStyles = ["home.css", "responsive.css", "navigation.css", "footer.css"];
for (const legacyStyle of legacyStyles) {
  if (sourceStyleFiles.includes(legacyStyle)) failures.push(`Legacy stylesheet must be removed: src/styles/${legacyStyle}.`);
}

const globalCss = await readFile(join(sourceStylesDirectory, "global.css"), "utf8");
const globalImports = [...globalCss.matchAll(/@import\s+["']\.\/([^"']+)["']\s*;/g)].map((match) => match[1]);
const expectedGlobalImports = ["tokens.css", "foundations.css", "primitives.css"];
if (JSON.stringify(globalImports) !== JSON.stringify(expectedGlobalImports)) {
  failures.push(`global.css imports must be exactly ${expectedGlobalImports.join(", ")}; found ${globalImports.join(", ") || "none"}.`);
}

const matches = (expression) => [...html.matchAll(expression)];
const renderedClasses = matches(/\sclass=["']([^"']*)["']/gi).flatMap((match) => match[1].split(/\s+/).filter(Boolean));
const classCount = (className) => renderedClasses.filter((value) => value === className).length;
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

const configuredBase = (process.env.BASE_URL ?? "/").replace(/^\/+|\/+$/g, "");

async function resolveGeneratedAsset(asset) {
  const relativeAsset = asset.replace(/^\//, "");
  const candidates = [relativeAsset];

  if (configuredBase && relativeAsset.startsWith(`${configuredBase}/`)) {
    candidates.unshift(relativeAsset.slice(configuredBase.length + 1));
  } else if (relativeAsset.includes("/")) {
    // A validation step may run after an Astro project-site build without the
    // original BASE_URL in its environment. Try the physical dist path after
    // a single URL base segment as a compatibility fallback.
    candidates.push(relativeAsset.slice(relativeAsset.indexOf("/") + 1));
  }

  for (const candidate of [...new Set(candidates)]) {
    try {
      await access(join(distDirectory, candidate));
      return;
    } catch {
      // Try the next candidate.
    }
  }

  failures.push(`Missing generated asset: ${asset}.`);
}

for (const asset of localAssets) {
  await resolveGeneratedAsset(asset);
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
if (!/<html\b[^>]*class=["'][^"']*\bno-js\b/i.test(html)) failures.push("The document must advertise its no-JavaScript baseline state.");
if (!/classList\.replace\(["']no-js["'],\s*["']js["']\)/.test(html)) failures.push("The early JavaScript capability switch is missing.");
if (!/<noscript>[\s\S]*aria-label=["']Primary navigation without JavaScript["']/i.test(html)) {
  failures.push("The responsive no-JavaScript navigation fallback is missing.");
}
if (!/--focus-ring\s*:/.test(compiledCss)) failures.push("The shared focus-ring token is missing.");
if (!/(?:max-height\s*:\s*44rem|height\s*<=\s*44rem)/.test(compiledCss)) failures.push("Short-viewport responsive rules are missing.");
if (!/html\.no-js\s+\.lead-capture\s*\{[^}]*display\s*:\s*none/i.test(compiledCss)) {
  failures.push("The lead-capture enhancement must stay hidden in the no-JavaScript baseline.");
}

const leadDialogCount = matches(/<dialog\b[^>]*\bdata-lead-dialog(?:\s|=|>)/gi).length;
if (leadDialogCount !== 1) failures.push(`Expected one shared lead-capture dialog, found ${leadDialogCount}.`);
const leadTriggerCount = matches(/\bdata-lead-capture-open(?:\s|=|>)/gi).length;
if (leadTriggerCount !== 3) failures.push(`Expected three lead-capture entry points, found ${leadTriggerCount}.`);
const leadFormTag = html.match(/<form\b[^>]*\bdata-lead-form(?:\s|=|>)[^>]*>/i)?.[0] ?? "";
if (!leadFormTag) failures.push("The lead-capture form is missing from the static output.");
if (/\saction\s*=/.test(leadFormTag)) failures.push("The prototype lead form must not declare a live submission action.");
const companyInputTag = html.match(/<input\b(?=[^>]*\bname=["']company["'])[^>]*>/i)?.[0] ?? "";
if (!companyInputTag || !/\srequired(?:\s|=|>)/i.test(companyInputTag)) {
  failures.push("The lead-capture company field must be present and required.");
}

const componentContracts = [
  ["trust-client", 2],
  ["trust-client--johnsons", 1],
  ["trust-client--salvation-army", 1],
  ["trust-client__logo--johnsons", 1],
  ["trust-client__logo--salvation-army", 1],
  ["system-card", 3],
  ["system-card--violet", 1],
  ["system-card--cream", 1],
  ["process-step", 4],
  ["process-step--first", 1],
  ["process-step--fourth", 1],
  ["process-step--odd", 2],
  ["survey-tier", 4],
  ["survey-tier--even", 2],
  ["survey-tier--second", 1],
  ["survey-tier--last", 1],
  ["survey-tier--first-row", 2],
  ["survey-tier--last-row", 2],
  ["survey-tier-mobile--last", 1],
  ["survey-tier__cta--mobile", 4],
  ["solution-image", 5],
  ["solution-row", 5],
  ["proof-card", 3],
  ["proof-card--tablet-wide", 2],
  ["proof-card--mobile-default", 1],
  ["insight-card", 3],
  ["insight-card--tablet-wide", 1],
  ["insight-card--mobile-default", 1],
];
for (const [className, expected] of componentContracts) {
  const actual = classCount(className);
  if (actual !== expected) failures.push(`Expected ${expected} .${className} elements, found ${actual}.`);
}

const animationFiles = ["reveals.ts", "problem.ts", "solutions.ts", "system.ts"];
for (const animationFile of animationFiles) {
  const animationSource = await readFile(join(process.cwd(), "src", "scripts", "animations", animationFile), "utf8");
  if (/\bopacity\s*:|\bautoAlpha\s*:/.test(animationSource)) {
    failures.push(`${animationFile} must not animate readable content opacity.`);
  }
}

const sourceContracts = [
  ["src/styles/foundations.css", /\.section-intro\b/, "Problem intro selectors must remain with ProblemSection.astro."],
  ["src/components/home/SurveySection.astro", /\.survey-tier__(?:label|cta)\b/, "Survey child selectors must remain with their child components."],
  ["src/components/home/SurveyTier.astro", /\.survey-tier__details\b/, "Survey descriptions must own their desktop detail selectors."],
  ["src/components/home/SurveyTierMobile.astro", /\.survey-tier-mobile__details\b|\.survey-tier__cta\b/, "Survey children must own their mobile detail and CTA selectors."],
  ["src/components/home/SystemSection.astro", /\.system__evidence\b/, "Dormant System evidence selectors must not return without matching markup."],
  ["src/components/home/SolutionRow.astro", /\.solution-row__media\b/, "Dormant solution-row media selectors must not return without matching markup."],
];
for (const [sourcePath, forbiddenPattern, message] of sourceContracts) {
  const source = await readFile(join(process.cwd(), sourcePath), "utf8");
  if (forbiddenPattern.test(source)) failures.push(message);
}

const leadSubmitSource = await readFile(join(process.cwd(), "src", "scripts", "lead-capture", "submit.ts"), "utf8");
if (!/export\s+async\s+function\s+submitLead\b/.test(leadSubmitSource)) {
  failures.push("Lead submission must remain isolated behind the typed submitLead boundary.");
}
if (!/console\.(?:log|info)\s*\(/.test(leadSubmitSource)) failures.push("The Stage 3 mock submission must log its payload locally.");
if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon|hooks\.zapier\.com|webhook/i.test(leadSubmitSource.replace(/\/\*[\s\S]*?\*\//g, ""))) {
  failures.push("The Stage 3 prototype must not contain a live network or webhook submission.");
}

const leadEventSource = await readFile(join(process.cwd(), "src", "scripts", "lead-capture", "events.ts"), "utf8");
if (!/greendawn:lead-funnel/.test(leadEventSource)) failures.push("The PII-safe lead analytics boundary is missing.");
if (/detail\s*:\s*\{[^}]*(?:name|phone|email|company|notes)/s.test(leadEventSource)) {
  failures.push("Lead funnel events must not include personally identifiable or free-text fields.");
}

const leadTypesSource = await readFile(join(process.cwd(), "src", "types", "lead.ts"), "utf8");
if (!/interface\s+LeadSubmission\s*\{[\s\S]*?\bcompany\s*:\s*string\s*;/m.test(leadTypesSource)) {
  failures.push("LeadSubmission must require a company name for commercial-enquiry qualification.");
}
if (/interface\s+LeadSubmission\s*\{[\s\S]*?\bcompany\s*\?\s*:/m.test(leadTypesSource)) {
  failures.push("LeadSubmission company must not be optional.");
}

const motionRuntime = await readFile(join(process.cwd(), "src", "scripts", "motion", "runtime.ts"), "utf8");
if (!/registerPlugin\(ScrollTrigger\)/.test(motionRuntime)) failures.push("The shared motion runtime must register ScrollTrigger.");
const allAnimationFiles = (await readdir(join(process.cwd(), "src", "scripts", "animations"))).filter((file) => file.endsWith(".ts"));
for (const animationFile of allAnimationFiles) {
  const animationSource = await readFile(join(process.cwd(), "src", "scripts", "animations", animationFile), "utf8");
  if (/from\s+["']gsap(?:\/ScrollTrigger)?["']/.test(animationSource)) {
    failures.push(`${animationFile} must consume GSAP through the shared motion runtime.`);
  }
}

const snapshotDirectory = join(process.cwd(), "tests", "home.visual.spec.ts-snapshots");
const snapshotWidths = new Map([
  ["homepage-desktop-linux.png", 1440],
  ["homepage-narrow-linux.png", 320],
  ["homepage-mobile-linux.png", 390],
  ["homepage-tablet-linux.png", 834],
  ["homepage-short-linux.png", 1280],
  ["homepage-wide-linux.png", 1920],
  ["homepage-ultrawide-linux.png", 2560],
]);
for (const [snapshotName, expectedWidth] of snapshotWidths) {
  try {
    const snapshot = await readFile(join(snapshotDirectory, snapshotName));
    const isPng = snapshot.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const actualWidth = isPng && snapshot.length >= 24 ? snapshot.readUInt32BE(16) : 0;
    if (!isPng || actualWidth !== expectedWidth) {
      failures.push(`Visual baseline ${snapshotName} must be a ${expectedWidth}px-wide PNG; found ${actualWidth || "an invalid file"}.`);
    }
  } catch {
    failures.push(`Visual baseline is missing: ${snapshotName}.`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Production validation passed: 1 h1, ${ids.length} unique IDs and ${localAssets.size} local assets checked.`);
}
