export const siteConfig = {
  name: "HypeLens",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/Bortlesboat/hypelens",
  description:
    "Open-source Hyperliquid wallet analyzer for public wallet activity, fills, fees, positions, and behavior signals.",
  githubUrl: "https://github.com/Bortlesboat/hypelens"
};

export function absoluteUrl(path = "/"): string {
  const base = new URL(siteConfig.url);
  const basePath = base.pathname === "/" ? "" : base.pathname.replace(/\/$/, "");
  const nextPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(`${basePath}${nextPath}`, base.origin).toString();
}
