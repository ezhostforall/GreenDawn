import { defineConfig, devices } from "@playwright/test";

const configuredBase = process.env.BASE_URL ?? "/";
const basePath = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}/`;
const testServerUrl = `http://127.0.0.1:4321${basePath}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: testServerUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "ASTRO_TELEMETRY_DISABLED=1 pnpm run build && ASTRO_PREVIEW_BACKGROUND=0 pnpm exec astro preview --ignore-lock --host 127.0.0.1 --port 4321",
    url: testServerUrl,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 5"], browserName: "chromium" } },
    { name: "tablet", use: { ...devices["iPad Pro 11"], browserName: "chromium" } },
    { name: "short", use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 1280, height: 640 } } },
  ],
});
