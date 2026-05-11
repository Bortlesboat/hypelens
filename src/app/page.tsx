import { AddressSearch } from "@/components/address-search";
import { JsonLd } from "@/components/json-ld";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
      <JsonLd data={buildSoftwareApplicationSchema()} />
      <p className="text-sm font-medium uppercase text-mint">HypeLens</p>
      <h1 className="mt-3 max-w-3xl text-5xl font-semibold text-ink">
        Hyperliquid wallet intelligence, built in public.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Analyze public Hyperliquid addresses with a read-only report for activity, fees, positions, and behavior signals.
      </p>
      <AddressSearch />
      <div className="mt-6 flex flex-wrap gap-4">
        <a className="w-fit text-sm font-medium text-ink underline" href="/how-to-analyze-hyperliquid-wallet">
          Read the wallet analysis guide
        </a>
        <a className="w-fit text-sm font-medium text-ink underline" href="/hyperliquid-export-csv">
          Explore CSV export
        </a>
        <a className="w-fit text-sm font-medium text-ink underline" href="/hyperliquid-api-examples">
          View API examples
        </a>
      </div>
    </main>
  );
}
