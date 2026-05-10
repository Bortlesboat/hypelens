import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypeLens | Hyperliquid Wallet Analyzer",
  description: "Open-source Hyperliquid wallet analytics for traders, researchers, and builders."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
