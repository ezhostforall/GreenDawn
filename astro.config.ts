import { defineConfig } from "astro/config";

const site = process.env.SITE_URL;
const base = process.env.BASE_URL ?? "/";

export default defineConfig({
  output: "static",
  site,
  base,
  build: {
    inlineStylesheets: "auto",
  },
});
