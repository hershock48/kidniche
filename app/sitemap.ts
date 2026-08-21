import type { MetadataRoute } from "next";
import { site, products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/curriculum",
    "/activities",
    "/about",
    "/blog",
    "/reviews",
    "/free-sample",
    "/contact",
    "/exchange",
    "/privacy",
  ].map((r) => ({ url: `${site.domain}${r}`, changeFrequency: "monthly" as const }));
  const productRoutes = products.map((p) => ({
    url: `${site.domain}/shop/${p.slug}`,
    changeFrequency: "monthly" as const,
  }));
  return [...routes, ...productRoutes];
}
