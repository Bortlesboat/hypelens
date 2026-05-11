import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildFaqSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

const faqs = [
  {
    question: "What can builders do with the HypeLens Hyperliquid API?",
    answer:
      "Builders can fetch a normalized JSON wallet report or download a CSV export for public Hyperliquid wallet activity."
  },
  {
    question: "Does the HypeLens API place trades?",
    answer:
      "No. HypeLens is read-only. It does not connect wallets, request private keys, sign transactions, or place trades."
  },
  {
    question: "Where is the OpenAPI document?",
    answer:
      "The HypeLens OpenAPI document is available at /openapi.json and describes the JSON report and CSV export endpoints."
  }
];

const walletAddress = "0x0000000000000000000000000000000000000000";

export const metadata: Metadata = {
  title: "Hyperliquid API Examples",
  description:
    "Use HypeLens public API examples to fetch read-only Hyperliquid wallet reports and CSV exports for builders, agents, and research workflows.",
  alternates: {
    canonical: "/hyperliquid-api-examples"
  },
  openGraph: {
    title: "Hyperliquid API Examples",
    description:
      "Copy-paste examples for read-only Hyperliquid wallet reports and CSV exports.",
    url: absoluteUrl("/hyperliquid-api-examples"),
    type: "article"
  }
};

export default function HyperliquidApiExamplesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <JsonLd data={buildFaqSchema(faqs)} />

      <div className="flex flex-wrap gap-4">
        <Link href="/" className="text-sm font-medium text-ink underline">
          Try HypeLens
        </Link>
        <a className="text-sm font-medium text-ink underline" href="/openapi.json">
          Download OpenAPI JSON
        </a>
      </div>

      <article className="mt-10">
        <p className="text-sm font-medium uppercase text-mint">Builders</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Hyperliquid API examples</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 11, 2026</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          HypeLens exposes read-only endpoints for public Hyperliquid wallet intelligence. Use these examples when
          building dashboards, research notebooks, agent tools, or reconciliation workflows that need normalized wallet
          data without connecting a wallet.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">JSON wallet report</h2>
          <div className="mt-4 border border-line bg-white p-4">
            <p className="font-medium text-ink">GET /api/wallet/{"{address}"}</p>
            <pre className="mt-4 overflow-x-auto bg-panel p-4 text-sm text-ink">
              <code>{`curl "/api/wallet/${walletAddress}"`}</code>
            </pre>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">CSV wallet export</h2>
          <div className="mt-4 border border-line bg-white p-4">
            <p className="font-medium text-ink">GET /api/wallet/{"{address}"}/export</p>
            <pre className="mt-4 overflow-x-auto bg-panel p-4 text-sm text-ink">
              <code>{`curl -L "/api/wallet/${walletAddress}/export" -o hypelens-wallet.csv`}</code>
            </pre>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">What the report includes</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "recent fills and visible fees",
              "top markets and behavior flags",
              "positions and open-order counts when available",
              "data-completeness score",
              "partial-data warnings",
              "spreadsheet-safe CSV export"
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
            HypeLens uses the official Hyperliquid public Info endpoint, normalizes the response shape, and keeps the
            API read-only. Treat the output as research data, not tax, legal, or financial advice.
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
