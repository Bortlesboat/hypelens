import { ActivityTable } from "./activity-table";
import { FlagsList } from "./flags-list";
import { MetricCard } from "./metric-card";
import { formatShortAddress } from "@/lib/address";
import { formatCurrency, formatNumber } from "@/lib/formatting";
import type { WalletReport } from "@/lib/hyperliquid/types";

export function WalletReportView({ report }: { report: WalletReport }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <p className="text-sm font-medium uppercase text-mint">HypeLens report</p>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-ink">{formatShortAddress(report.address)}</h1>
          <p className="mt-2 text-sm text-slate-500">Generated {new Date(report.generatedAt).toLocaleString()}</p>
        </div>
        <a className="text-sm font-medium text-ink underline" href="https://app.hyperliquid.xyz/" target="_blank" rel="noreferrer">
          Open Hyperliquid
        </a>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        <MetricCard label="Account value" value={formatCurrency(report.accountValueUsd)} />
        <MetricCard label="Recent volume" value={formatCurrency(report.totalVolumeUsd)} />
        <MetricCard label="Visible fees" value={formatCurrency(report.totalFeesUsd)} />
        <MetricCard label="Recent fills" value={formatNumber(report.fillCount)} />
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="text-xl font-semibold text-ink">Recent activity</h2>
          <div className="mt-4">
            <ActivityTable fills={report.recentFills} />
          </div>
        </div>
        <aside>
          <h2 className="text-xl font-semibold text-ink">Behavior signals</h2>
          <div className="mt-4">
            <FlagsList flags={report.flags} />
          </div>
        </aside>
      </section>
    </main>
  );
}
