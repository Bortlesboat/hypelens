# HypeLens

Open-source Hyperliquid wallet intelligence.

HypeLens is a read-only wallet analyzer for public Hyperliquid addresses. Enter an address and get a report for recent fills, visible fees, open orders, positions, and behavior signals.

**Primary use case:** Hyperliquid wallet analyzer for traders, researchers, and builders.

## Why This Exists

Hyperliquid exposes useful public API data, but builders and traders still need a clean reference app that turns those responses into a practical report. HypeLens is designed to be useful as a public tool and as example code for Hyperliquid API integrations.

## Features

- Read-only wallet reports
- Hyperliquid Info endpoint adapter
- Recent fills and fee summary
- Open order and position overview
- Behavior flags
- Shareable `/wallet/[address]` routes
- SEO guide page at `/how-to-analyze-hyperliquid-wallet`
- Robots, sitemap, and JSON-LD structured data
- TypeScript tests with mocked API responses

## Quick Start

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

For macOS or Linux:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `HYPERLIQUID_INFO_URL` | `https://api.hyperliquid.xyz/info` | Hyperliquid Info endpoint URL. |
| `HYPELENS_CACHE_TTL_MS` | `60000` | Server-side wallet report cache TTL. |

## Scripts

```powershell
npm test
npm run typecheck
npm run build
```

`npm run typecheck` runs `next typegen` before `tsc` so clean clones do not need a prior build.

## Project Map

- `src/lib/hyperliquid`: Hyperliquid Info endpoint client and raw API types.
- `src/lib/analytics`: wallet report metrics and behavior flags.
- `src/lib/wallet-service.ts`: cached orchestration for report generation.
- `src/lib/seo`: schema.org JSON-LD builders for search and AI answer extraction.
- `src/components`: search and report UI components.
- `src/app/api/wallet/[address]`: public JSON wallet report endpoint.
- `src/app/wallet/[address]`: shareable wallet report page.
- `src/app/how-to-analyze-hyperliquid-wallet`: indexable guide page.

## Discovery Targets

HypeLens is built to be discoverable for:

- Hyperliquid wallet analyzer
- Hyperliquid wallet tracker
- Hyperliquid trading analytics
- open-source Hyperliquid API example
- crypto wallet analyzer

## Safety

HypeLens does not connect wallets, request private keys, sign transactions, or place trades. It only reads public Hyperliquid data.

## License

MIT
