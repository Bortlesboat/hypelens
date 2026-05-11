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

type EndpointResult<T> = {
  source: string;
  value: T;
  warning?: string;
};

function cacheTtlMs(): number {
  const configured = Number(process.env.HYPELENS_CACHE_TTL_MS ?? 60_000);
  return Number.isFinite(configured) && configured > 0 ? configured : 60_000;
}

const defaultCache = new TtlCache<WalletReport>(cacheTtlMs());

async function readEndpoint<T>(source: string, fallback: T, request: Promise<T>): Promise<EndpointResult<T>> {
  try {
    const value = await request;
    return { source, value: value ?? fallback };
  } catch {
    return {
      source,
      value: fallback,
      warning: `Hyperliquid ${source} data was unavailable, so this report may be partial.`
    };
  }
}

export async function getWalletReport(address: string, options: WalletServiceOptions = {}): Promise<WalletReport> {
  const normalizedAddress = normalizeAddress(address);
  const cache = options.cache === undefined ? defaultCache : options.cache;
  const cached = cache?.get(normalizedAddress);
  if (cached) return cached;

  const client = options.client ?? new HyperliquidClient();

  const [mids, clearinghouseState, openOrders, fills, historicalOrders, portfolio, fees] = await Promise.all([
    readEndpoint("allMids", {}, client.info<Record<string, string>>({ type: "allMids" })),
    readEndpoint(
      "clearinghouseState",
      null,
      client.info<HyperliquidClearinghouseState>({ type: "clearinghouseState", user: normalizedAddress })
    ),
    readEndpoint(
      "frontendOpenOrders",
      [],
      client.info<HyperliquidOpenOrder[]>({ type: "frontendOpenOrders", user: normalizedAddress })
    ),
    readEndpoint(
      "userFills",
      [],
      client.info<HyperliquidFill[]>({ type: "userFills", user: normalizedAddress, aggregateByTime: true })
    ),
    readEndpoint("historicalOrders", [], client.info<unknown[]>({ type: "historicalOrders", user: normalizedAddress })),
    readEndpoint("portfolio", null, client.info<unknown>({ type: "portfolio", user: normalizedAddress })),
    readEndpoint("userFees", null, client.info<unknown>({ type: "userFees", user: normalizedAddress }))
  ]);

  const raw: RawWalletData = {
    mids: mids.value,
    clearinghouseState: clearinghouseState.value,
    openOrders: Array.isArray(openOrders.value) ? openOrders.value : [],
    fills: Array.isArray(fills.value) ? fills.value : [],
    historicalOrders: Array.isArray(historicalOrders.value) ? historicalOrders.value : [],
    portfolio: portfolio.value,
    fees: fees.value,
    dataWarnings: [mids, clearinghouseState, openOrders, fills, historicalOrders, portfolio, fees]
      .filter((result): result is EndpointResult<unknown> & { warning: string } => Boolean(result.warning))
      .map((result) => ({ source: result.source, message: result.warning }))
  };

  const report = buildWalletReport(normalizedAddress, raw, options.now ?? new Date());
  cache?.set(normalizedAddress, report);
  return report;
}
