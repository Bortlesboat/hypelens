import Link from "next/link";

export default function WalletNotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-12">
      <p className="text-sm font-medium uppercase text-amber">No report</p>
      <h1 className="mt-3 text-4xl font-semibold text-ink">This wallet report could not be loaded.</h1>
      <p className="mt-4 text-slate-600">
        Check that the address is a 42-character Hyperliquid address and try again.
      </p>
      <Link href="/" className="mt-8 inline-flex w-fit bg-ink px-4 py-2 text-sm font-medium text-white">
        Search another wallet
      </Link>
    </main>
  );
}
