import { buildWalletReport } from "./analytics/wallet-report";
import { normalizeAddress } from "./address";
import { TtlCache } from "./cache";
import { HyperliquidClient } from "./hyperliquid/client";
import type {
  HyperliquidClearinghouseState,
  HyperliquidFill,
  HyperliquidInfoRequest,
  HyperliquidOpenOrder,
  RawWalletData,
  WalletReport
} from "./hyperliquid/types";

type InfoClient = {
  info<T>(body: HyperliquidInfoRequest): Promise<T>;
};

type WalletServiceOptions = {
  client?: InfoClient;
  cache?: TtlCache<WalletReport> | null;
  now?: Date;
};

function cacheTtlMs(): number {
  const configured = Number(process.env.HYPELENS_CACHE_TTL_MS ?? 60_000);
  return Number.isFinite(configured) && configured > 0 ? configured : 60_000;
}

const defaultCache = new TtlCache<WalletReport>(cacheTtlMs());

export async function getWalletReport(address: string, options: WalletServiceOptions = {}): Promise<WalletReport> {
  const normalizedAddress = normalizeAddress(address);
  const cache = options.cache === undefined ? defaultCache : options.cache;
  const cached = cache?.get(normalizedAddress);
  if (cached) return cached;

  const client = options.client ?? new HyperliquidClient();

  const [mids, clearinghouseState, openOrders, fills, historicalOrders, portfolio, fees] = await Promise.all([
    client.info<Record<string, string>>({ type: "allMids" }),
    client.info<HyperliquidClearinghouseState>({ type: "clearinghouseState", user: normalizedAddress }),
    client.info<HyperliquidOpenOrder[]>({ type: "frontendOpenOrders", user: normalizedAddress }),
    client.info<HyperliquidFill[]>({ type: "userFills", user: normalizedAddress, aggregateByTime: true }),
    client.info<unknown[]>({ type: "historicalOrders", user: normalizedAddress }),
    client.info<unknown>({ type: "portfolio", user: normalizedAddress }),
    client.info<unknown>({ type: "userFees", user: normalizedAddress })
  ]);

  const raw: RawWalletData = {
    mids: mids ?? {},
    clearinghouseState: clearinghouseState ?? null,
    openOrders: Array.isArray(openOrders) ? openOrders : [],
    fills: Array.isArray(fills) ? fills : [],
    historicalOrders: Array.isArray(historicalOrders) ? historicalOrders : [],
    portfolio: portfolio ?? null,
    fees: fees ?? null
  };

  const report = buildWalletReport(normalizedAddress, raw, options.now ?? new Date());
  cache?.set(normalizedAddress, report);
  return report;
}
