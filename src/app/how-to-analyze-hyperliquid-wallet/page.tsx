import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildFaqSchema, buildHowToSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/site";

const faqs = [
  {
    question: "What is a Hyperliquid wallet analyzer?",
    answer:
      "A Hyperliquid wallet analyzer turns public wallet activity into a readable report for fills, visible fees, open orders, positions, and behavior signals."
  },
  {
    question: "Does HypeLens connect to my wallet?",
    answer:
      "No. HypeLens is read-only. It does not connect wallets, request private keys, sign transactions, or place trades."
  },
  {
    question: "Can developers fork HypeLens?",
    answer:
      "Yes. HypeLens is open source and includes a typed Hyperliquid Info endpoint client, mocked tests, and a forkable Next.js app structure."
  }
];

const howToSteps = [
  "Paste a public 42-character Hyperliquid wallet address.",
  "Review account value, recent volume, visible fees, and fill count.",
  "Scan recent fills to understand markets, side, size, volume, fees, and timing.",
  "Use behavior signals to spot activity patterns, open orders, or concentration.",
  "Open the code on GitHub if you want to fork the Hyperliquid API integration."
];

export const metadata: Metadata = {
  title: "How to Analyze a Hyperliquid Wallet",
  description:
    "Learn how to analyze a public Hyperliquid wallet with HypeLens, an open-source wallet analyzer for fills, fees, positions, and behavior signals.",
  alternates: {
    canonical: "/how-to-analyze-hyperliquid-wallet"
  },
  openGraph: {
    title: "How to Analyze a Hyperliquid Wallet",
    description:
      "A practical guide to reading public Hyperliquid wallet activity with HypeLens.",
    url: absoluteUrl("/how-to-analyze-hyperliquid-wallet"),
    type: "article"
  }
};

export default function HyperliquidWalletGuidePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd data={buildHowToSchema("How to analyze a Hyperliquid wallet", howToSteps)} />

      <Link href="/" className="text-sm font-medium text-ink underline">
        Back to HypeLens
      </Link>

      <article className="mt-10">
        <p className="text-sm font-medium uppercase text-mint">Guide</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">How to analyze a Hyperliquid wallet</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 10, 2026</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          HypeLens analyzes public Hyperliquid wallet activity and turns raw exchange data into a readable report. It is
          useful for traders, researchers, and developers who want a fast view of visible fills, fees, open orders,
          positions, and behavior signals.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">What HypeLens checks</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              "Recent fills and traded markets",
              "Visible fee activity",
              "Open orders returned by Hyperliquid",
              "Account value and position fields when available",
              "Market concentration and activity signals",
              "A shareable wallet report route"
            ].map((item) => (
              <div className="border border-line bg-white p-4" key={item}>
                <p className="font-medium text-ink">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">Steps</h2>
          <ol className="mt-4 grid gap-4">
            {howToSteps.map((step, index) => (
              <li className="border-l-4 border-mint bg-white p-4" id={`step-${index + 1}`} key={step}>
                <span className="text-sm font-medium text-slate-500">Step {index + 1}</span>
                <p className="mt-1 text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">Source data</h2>
          <p className="mt-4 leading-7 text-slate-700">
            HypeLens uses the official Hyperliquid public Info endpoint. The app keeps requests server-side, caches
            reports briefly, and normalizes raw responses before rendering the wallet report.
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

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
          <div className="mt-4 grid gap-4">
            {faqs.map((item) => (
              <div className="border border-line bg-white p-4" key={item.question}>
                <h3 className="font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
