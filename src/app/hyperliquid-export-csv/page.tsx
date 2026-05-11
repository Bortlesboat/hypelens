import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildFaqSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

const faqs = [
  {
    question: "What does the HypeLens Hyperliquid CSV export include?",
    answer:
      "The export includes visible recent fills with report metadata, data-completeness score, endpoint warnings, market, side, price, size, volume, fee, and timestamps."
  },
  {
    question: "Is the Hyperliquid CSV export read-only?",
    answer:
      "Yes. HypeLens only reads public Hyperliquid data. It does not connect wallets, request private keys, sign messages, or place trades."
  },
  {
    question: "Can developers use the export endpoint?",
    answer:
      "Yes. Developers can call GET /api/wallet/{address}/export for a CSV export or GET /api/wallet/{address} for the JSON wallet report."
  }
];

export const metadata: Metadata = {
  title: "Hyperliquid Wallet CSV Export",
  description:
    "Export public Hyperliquid wallet activity to CSV with HypeLens, including recent fills, visible fees, timestamps, and data-completeness warnings.",
  alternates: {
    canonical: "/hyperliquid-export-csv"
  },
  openGraph: {
    title: "Hyperliquid Wallet CSV Export",
    description:
      "Download public Hyperliquid wallet activity as CSV with a read-only, open-source analyzer.",
    url: absoluteUrl("/hyperliquid-export-csv"),
    type: "article"
  }
};

export default function HyperliquidCsvExportPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <JsonLd data={buildFaqSchema(faqs)} />

      <Link href="/" className="text-sm font-medium text-ink underline">
        Try HypeLens
      </Link>

      <article className="mt-10">
        <p className="text-sm font-medium uppercase text-mint">Export</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Hyperliquid wallet CSV export</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 11, 2026</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          HypeLens turns public Hyperliquid wallet activity into a downloadable CSV for lightweight research,
          reconciliation, and builder workflows. The export is intentionally read-only and includes data-completeness
          warnings when a non-critical Hyperliquid endpoint is unavailable.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">Endpoint</h2>
          <div className="mt-4 border border-line bg-white p-4">
            <p className="font-medium text-ink">GET /api/wallet/{"{address}"}/export</p>
            <p className="mt-2 leading-7 text-slate-700">
              Replace <code className="bg-panel px-1 py-0.5 text-sm">{"{address}"}</code> with a public 42-character
              Hyperliquid wallet address. The response is served as <code className="bg-panel px-1 py-0.5 text-sm">text/csv</code>.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">Included columns</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "address and generated_at",
              "data_completeness_score and data_warnings",
              "coin, side, price, and size",
              "volume_usd and fee_usd",
              "timestamp_ms and timestamp_iso",
              "spreadsheet-safe escaping"
            ].map((item) => (
              <div className="border border-line bg-white p-4" key={item}>
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">Source data</h2>
          <p className="mt-4 leading-7 text-slate-700">
            HypeLens uses the official Hyperliquid public Info endpoint and preserves warnings when parts of the report
            are partial. CSV exports are useful for research and lightweight analysis, but they are not tax, legal, or
            financial advice.
          </p>
          <a
            className="mt-4 inline-flex text-sm font-medium text-ink underline"
            href="https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint"
            rel="noreferrer"
            target="_blank"
          >
            Read the official Hyperliquid Info endpoint docs
          </a>
        </section>
      </article>
    </main>
  );
}
