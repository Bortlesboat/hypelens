export const siteConfig = {
  name: "HypeLens",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/Bortlesboat/hypelens",
  description:
    "Open-source Hyperliquid wallet analyzer for public wallet activity, fills, fees, positions, and behavior signals.",
  githubUrl: "https://github.com/Bortlesboat/hypelens"
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
