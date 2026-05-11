import type { DataWarning } from "@/lib/hyperliquid/types";

export function DataWarnings({ warnings }: { warnings: DataWarning[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 border border-amber bg-white p-4">
      <h2 className="text-sm font-semibold uppercase text-ink">Partial Hyperliquid data</h2>
      <div className="mt-3 grid gap-2">
        {warnings.map((warning) => (
          <p className="text-sm leading-6 text-slate-700" key={`${warning.source}-${warning.message}`}>
            {warning.message}
          </p>
        ))}
      </div>
    </section>
  );
}
