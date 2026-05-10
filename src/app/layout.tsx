import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "HypeLens | Hyperliquid Wallet Analyzer",
    template: "%s | HypeLens"
  },
  description: siteConfig.description,
  keywords: [
    "Hyperliquid wallet analyzer",
    "Hyperliquid analytics",
    "Hyperliquid wallet tracker",
    "crypto wallet analyzer",
    "open-source trading analytics"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "HypeLens | Hyperliquid Wallet Analyzer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "HypeLens",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "HypeLens | Hyperliquid Wallet Analyzer",
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
