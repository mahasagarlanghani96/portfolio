import type { MetadataRoute } from "next";
import { caseStudies } from "@/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mahasagar.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/quality-engineering",
    "/project-delivery",
    "/case-studies",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: "2026-11-20" as unknown as Date,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudyRoutes = caseStudies
    .filter((cs) => !cs.draft)
    .map((cs) => ({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: "2026-11-20" as unknown as Date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...caseStudyRoutes];
}
