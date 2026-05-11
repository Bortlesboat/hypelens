import { NextResponse } from "next/server";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function GET() {
  return new NextResponse(
    `# HypeLens

HypeLens is an open-source, read-only Hyperliquid wallet analyzer for traders, researchers, and builders.

## Public Pages

- Home: ${absoluteUrl("/")}
- Hyperliquid wallet analysis guide: ${absoluteUrl("/how-to-analyze-hyperliquid-wallet")}
- Hyperliquid wallet CSV export: ${absoluteUrl("/hyperliquid-export-csv")}
- GitHub repository: ${siteConfig.githubUrl}

## Public API

- JSON wallet report: GET /api/wallet/{address}
- CSV wallet export: GET /api/wallet/{address}/export

HypeLens does not connect wallets, request private keys, sign transactions, or place trades. It reads public Hyperliquid data and surfaces partial-data warnings when non-critical endpoints are unavailable.
`,
    {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }
  );
}
