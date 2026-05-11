import type { WalletReport } from "@/lib/hyperliquid/types";

const columns = [
  "address",
  "generated_at",
  "data_completeness_score",
  "data_warnings",
  "coin",
  "side",
  "price",
  "size",
  "volume_usd",
  "fee_usd",
  "timestamp_ms",
  "timestamp_iso"
];

function escapeCell(value: number | string | null): string {
  if (value === null) return "";

  const text = String(value);
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;

  if (!/[",\r\n]/.test(safeText)) return safeText;

  return `"${safeText.replaceAll('"', '""')}"`;
}

function timestampIso(timestamp: number | null): string {
  return timestamp === null ? "" : new Date(timestamp).toISOString();
}

export function buildWalletCsv(report: WalletReport): string {
  const warnings = report.dataWarnings.map((warning) => warning.message).join("; ");
  const fills = report.recentFills.length > 0 ? report.recentFills : [null];

  const rows = fills.map((fill) =>
    [
      report.address,
      report.generatedAt,
      report.dataCompleteness.score,
      warnings,
      fill?.coin ?? null,
      fill?.side ?? null,
      fill?.price ?? null,
      fill?.size ?? null,
      fill?.volumeUsd ?? null,
      fill?.feeUsd ?? null,
      fill?.timestamp ?? null,
      timestampIso(fill?.timestamp ?? null)
    ]
      .map(escapeCell)
      .join(",")
  );

  return [columns.join(","), ...rows].join("\n");
}
