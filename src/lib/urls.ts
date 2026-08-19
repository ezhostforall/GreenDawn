import { siteConfig } from "../config/site";

const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function assetPath(path: string): string {
  return `${base}${path.replace(/^\//, "")}`;
}

export function liveSitePath(path: string): string {
  return new URL(path, siteConfig.liveUrl).toString();
}
