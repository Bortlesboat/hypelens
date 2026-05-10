import { deriveWalletFlags } from "./flags";
import type { RawWalletData, WalletReport } from "@/lib/hyperliquid/types";

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function buildWalletReport(address: string, raw: RawWalletData, now = new Date()): WalletReport {
  const recentFills = raw.fills.map((fill) => {
    const price = toNumber(fill.px);
    const size = toNumber(fill.sz);
    const feeUsd = toNumber(fill.fee) ?? 0;
    const volumeUsd = price !== null && size !== null ? Math.abs(price * size) : 0;

    return {
      coin: fill.coin,
      side: fill.side ?? null,
      price,
      size,
      volumeUsd: round(volumeUsd, 2),
      feeUsd: round(feeUsd, 2),
      timestamp: fill.time ?? null
    };
  });

  const totalVolumeUsd = round(
    recentFills.reduce((sum, fill) => sum + fill.volumeUsd, 0),
    2
  );
  const totalFeesUsd = round(
    recentFills.reduce((sum, fill) => sum + fill.feeUsd, 0),
    2
  );

  const markets = new Map<string, { volumeUsd: number; fillCount: number }>();
  for (const fill of recentFills) {
    const current = markets.get(fill.coin) ?? { volumeUsd: 0, fillCount: 0 };
    current.volumeUsd += fill.volumeUsd;
    current.fillCount += 1;
    markets.set(fill.coin, current);
  }

  const topMarkets = [...markets.entries()]
    .map(([coin, value]) => ({
      coin,
      volumeUsd: round(value.volumeUsd, 2),
      fillCount: value.fillCount,
      share: totalVolumeUsd > 0 ? round(value.volumeUsd / totalVolumeUsd, 4) : 0
    }))
    .sort((a, b) => b.volumeUsd - a.volumeUsd);

  const positions =
    raw.clearinghouseState?.assetPositions?.map((asset) => {
      const position = asset.position ?? {};
      const leverageValue = position.leverage?.value;

      return {
        coin: position.coin ?? "Unknown",
        size: toNumber(position.szi),
        entryPrice: toNumber(position.entryPx),
        unrealizedPnlUsd: toNumber(position.unrealizedPnl),
        marginUsedUsd: toNumber(position.marginUsed),
        leverage: position.leverage?.type
          ? `${position.leverage.type}${typeof leverageValue === "number" ? ` ${leverageValue}x` : ""}`
          : null
      };
    }) ?? [];

  const reportWithoutFlags = {
    address,
    generatedAt: now.toISOString(),
    accountValueUsd: toNumber(raw.clearinghouseState?.marginSummary?.accountValue),
    totalMarginUsedUsd: toNumber(raw.clearinghouseState?.marginSummary?.totalMarginUsed),
    totalNotionalPositionUsd: toNumber(raw.clearinghouseState?.marginSummary?.totalNtlPos),
    totalVolumeUsd,
    totalFeesUsd,
    fillCount: recentFills.length,
    openOrderCount: raw.openOrders.length,
    topMarkets,
    positions,
    recentFills
  };

  return {
    ...reportWithoutFlags,
    flags: deriveWalletFlags(reportWithoutFlags)
  };
}
