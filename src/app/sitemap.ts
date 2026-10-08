import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPostSlugs } from "@/data/blog-posts";
import { getAllPortfolioSlugs } from "@/data/portfolio-details";

// Required for `output: "export"`: generate this file once at build time.
export const dynamic = "force-static";

/** Route prefixes kept out of the sitemap (the /tools portal is not public yet). */
const EXCLUDED_PREFIXES = ["/tools"];

const APP_DIR = path.join(process.cwd(), "src", "app");

/** Finds every static route by looking for page.tsx files under src/app at build time. */
function findStaticRoutes(dir: string, route = ""): string[] {
  const routes: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(route || "/");
    } else if (entry.isDirectory()) {
      // Dynamic [segments] are added from data below; _private folders aren't routes; (groups) add no URL segment.
      if (entry.name.startsWith("[") || entry.name.startsWith("_")) continue;
      const segment = entry.name.startsWith("(") ? "" : `/${entry.name}`;
      routes.push(...findStaticRoutes(path.join(dir, entry.name), route + segment));
    }
  }
  return routes;
}

/** Matches next.config.ts `trailingSlash: true`, so sitemap URLs equal canonical URLs. */
function toUrl(route: string): string {
  return route === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${route}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...findStaticRoutes(APP_DIR),
    ...getAllPostSlugs().map((slug) => `/resources/blog/${slug}`),
    ...getAllPortfolioSlugs().map((slug) => `/portfolio/${slug}`),
  ].filter((route) => !EXCLUDED_PREFIXES.some((p) => route === p || route.startsWith(`${p}/`)));

  return [...new Set(routes)].sort().map((route) => ({ url: toUrl(route) }));
}
