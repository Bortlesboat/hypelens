# Contributing

Thanks for checking out HypeLens.

## Local Development

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

## Project Boundaries

- Hyperliquid API access lives in `src/lib/hyperliquid`.
- Report calculations live in `src/lib/analytics`.
- Route orchestration lives in `src/lib/wallet-service.ts`.
- UI components live in `src/components`.

Please keep v1 read-only. Do not add private key handling, order signing, or trading execution.

## Before Opening A PR

```powershell
npm test
npm run typecheck
npm run build
```
