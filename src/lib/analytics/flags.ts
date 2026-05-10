import type { WalletFlag, WalletReport } from "@/lib/hyperliquid/types";

type FlagInput = Pick<WalletReport, "fillCount" | "openOrderCount" | "topMarkets" | "totalVolumeUsd">;

export function deriveWalletFlags(input: FlagInput): WalletFlag[] {
  const flags: WalletFlag[] = [];

  if (input.fillCount === 0) {
    flags.push({
      kind: "empty",
      label: "No recent trading activity",
      detail: "No recent fills were returned for this address."
    });
  }

  const topMarket = input.topMarkets[0];
  if (topMarket && topMarket.share >= 0.6 && input.totalVolumeUsd > 0) {
    flags.push({
      kind: "concentration",
      label: "Concentrated market activity",
      detail: `${topMarket.coin} represents ${(topMarket.share * 100).toFixed(0)}% of recent visible volume.`
    });
  }

  if (input.openOrderCount > 0) {
    flags.push({
      kind: "open-orders",
      label: "Open orders visible",
      detail: `${input.openOrderCount} open order${input.openOrderCount === 1 ? "" : "s"} returned by Hyperliquid.`
    });
  }

  if (input.fillCount >= 25) {
    flags.push({
      kind: "active",
      label: "Active recent trader",
      detail: `${input.fillCount} recent fills are visible for this wallet.`
    });
  }

  return flags;
}
