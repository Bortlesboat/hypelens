import { formatCurrency } from "@/lib/formatting";
import type { WalletReport } from "@/lib/hyperliquid/types";

export function TopMarkets({ markets }: { markets: WalletReport["topMarkets"] }) {
  if (markets.length === 0) {
    return <p className="text-sm text-slate-500">No market concentration data is available for this wallet.</p>;
  }

  return (
    <div className="grid gap-3">
      {markets.slice(0, 5).map((market) => (
        <div className="border border-line bg-white p-4" key={market.coin}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-ink">{market.coin}</p>
              <p className="mt-1 text-sm text-slate-600">{market.fillCount} recent fills</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">{formatCurrency(market.volumeUsd)}</p>
              <p className="mt-1 text-sm text-slate-600">{(market.share * 100).toFixed(1)}% of recent volume</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
