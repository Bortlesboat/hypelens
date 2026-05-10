import type { WalletFlag } from "@/lib/hyperliquid/types";

export function FlagsList({ flags }: { flags: WalletFlag[] }) {
  if (flags.length === 0) {
    return <p className="text-sm text-slate-500">No behavior flags were generated from the visible data.</p>;
  }

  return (
    <div className="grid gap-3">
      {flags.map((flag) => (
        <div key={`${flag.kind}-${flag.label}`} className="border border-line bg-panel p-4">
          <p className="font-medium text-ink">{flag.label}</p>
          <p className="mt-1 text-sm text-slate-600">{flag.detail}</p>
        </div>
      ))}
    </div>
  );
}
