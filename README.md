# HypeLens

Open-source Hyperliquid wallet intelligence.

HypeLens is a read-only wallet analyzer for public Hyperliquid addresses. Enter an address and get a report for recent fills, visible fees, open orders, positions, and behavior signals.

## Why This Exists

Hyperliquid exposes useful public API data, but builders and traders still need a clean reference app that turns those responses into a practical report. HypeLens is designed to be useful as a public tool and as example code for Hyperliquid API integrations.

## Features

- Read-only wallet reports
- Hyperliquid Info endpoint adapter
- Recent fills and fee summary
- Open order and position overview
- Behavior flags
- Shareable `/wallet/[address]` routes
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

## Project Map

- `src/lib/hyperliquid`: Hyperliquid Info endpoint client and raw API types.
- `src/lib/analytics`: wallet report metrics and behavior flags.
- `src/lib/wallet-service.ts`: cached orchestration for report generation.
- `src/components`: search and report UI components.
- `src/app/api/wallet/[address]`: public JSON wallet report endpoint.
- `src/app/wallet/[address]`: shareable wallet report page.

## Safety

HypeLens does not connect wallets, request private keys, sign transactions, or place trades. It only reads public Hyperliquid data.

## License

MIT
