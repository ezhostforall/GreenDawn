import { defineConfig, devices } from "@playwright/test";

const configuredBase = process.env.BASE_URL ?? "/";
const basePath = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}/`;
const testServerUrl = `http://127.0.0.1:4321${basePath}`;
const narrowChromium = {
  ...devices["Pixel 5"],
  viewport: { width: 320, height: 568 },
  screen: { width: 320, height: 568 },
};

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
    {
      name: "narrow",
      use: {
        ...narrowChromium,
        browserName: "chromium",
      },
    },
    { name: "mobile", use: { ...devices["Pixel 5"], browserName: "chromium", viewport: { width: 390, height: 844 } } },
    { name: "tablet", use: { ...devices["iPad Pro 11"], browserName: "chromium" } },
    { name: "short", use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 1280, height: 640 } } },
    { name: "wide", use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 1920, height: 1080 } } },
    { name: "ultrawide", use: { ...devices["Desktop Chrome"], browserName: "chromium", viewport: { width: 2560, height: 1440 } } },
  ],
});
