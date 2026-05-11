export type HyperliquidInfoRequest =
  | { type: "allMids"; dex?: string }
  | { type: "clearinghouseState"; user: string; dex?: string }
  | { type: "frontendOpenOrders"; user: string; dex?: string }
  | { type: "historicalOrders"; user: string }
  | { type: "portfolio"; user: string }
  | { type: "userFees"; user: string }
  | { type: "userFills"; user: string; aggregateByTime?: boolean };

export type HyperliquidFill = {
  coin: string;
  px: string;
  sz: string;
  side?: string;
  time?: number;
  fee?: string;
};

export type HyperliquidOpenOrder = {
  coin?: string;
  limitPx?: string;
  sz?: string;
  side?: string;
  timestamp?: number;
};

export type HyperliquidPosition = {
  position?: {
    coin?: string;
    szi?: string;
    entryPx?: string;
    unrealizedPnl?: string;
    marginUsed?: string;
    leverage?: { type?: string; value?: number };
  };
};

export type HyperliquidClearinghouseState = {
  marginSummary?: {
    accountValue?: string;
    totalMarginUsed?: string;
    totalNtlPos?: string;
  };
  crossMaintenanceMarginUsed?: string;
  assetPositions?: HyperliquidPosition[];
};

export type RawWalletData = {
  mids: Record<string, string>;
  clearinghouseState: HyperliquidClearinghouseState | null;
  openOrders: HyperliquidOpenOrder[];
  fills: HyperliquidFill[];
  historicalOrders: unknown[];
  portfolio: unknown;
  fees: unknown;
  dataWarnings?: DataWarning[];
};

export type DataWarning = {
  source: string;
  message: string;
};

export type WalletFlag = {
  kind: "concentration" | "open-orders" | "inactive" | "active" | "empty";
  label: string;
  detail: string;
};

export type WalletReport = {
  address: string;
  generatedAt: string;
  accountValueUsd: number | null;
  totalMarginUsedUsd: number | null;
  totalNotionalPositionUsd: number | null;
  totalVolumeUsd: number;
  totalFeesUsd: number;
  fillCount: number;
  openOrderCount: number;
  topMarkets: Array<{ coin: string; volumeUsd: number; fillCount: number; share: number }>;
  positions: Array<{
    coin: string;
    size: number | null;
    entryPrice: number | null;
    unrealizedPnlUsd: number | null;
    marginUsedUsd: number | null;
    leverage: string | null;
  }>;
  recentFills: Array<{
    coin: string;
    side: string | null;
    price: number | null;
    size: number | null;
    volumeUsd: number;
    feeUsd: number;
    timestamp: number | null;
  }>;
  flags: WalletFlag[];
  dataWarnings: DataWarning[];
};
