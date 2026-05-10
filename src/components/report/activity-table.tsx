import { formatCurrency, formatDateTime, formatNumber } from "@/lib/formatting";
import type { WalletReport } from "@/lib/hyperliquid/types";

export function ActivityTable({ fills }: { fills: WalletReport["recentFills"] }) {
  if (fills.length === 0) {
    return <p className="text-sm text-slate-500">No recent fills returned for this address.</p>;
  }

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-panel text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Market</th>
            <th className="px-4 py-3 font-medium">Side</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Size</th>
            <th className="px-4 py-3 font-medium">Volume</th>
            <th className="px-4 py-3 font-medium">Fee</th>
            <th className="px-4 py-3 font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {fills.slice(0, 25).map((fill, index) => (
            <tr key={`${fill.coin}-${fill.timestamp ?? index}-${index}`} className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">{fill.coin}</td>
              <td className="px-4 py-3 text-slate-600">{fill.side ?? "Unknown"}</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(fill.price)}</td>
              <td className="px-4 py-3 text-slate-600">{formatNumber(fill.size)}</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(fill.volumeUsd)}</td>
              <td className="px-4 py-3 text-slate-600">{formatCurrency(fill.feeUsd)}</td>
              <td className="px-4 py-3 text-slate-600">{formatDateTime(fill.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
