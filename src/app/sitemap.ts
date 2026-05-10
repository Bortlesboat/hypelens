import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-10");

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/how-to-analyze-hyperliquid-wallet"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
