"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { isHyperliquidAddress, normalizeAddress } from "@/lib/address";

export function AddressSearch() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isHyperliquidAddress(address)) {
      setError("Enter a 42-character Hyperliquid wallet address.");
      return;
    }

    router.push(`/wallet/${normalizeAddress(address)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 w-full max-w-2xl">
      <div className="flex min-h-14 items-center gap-3 border border-line bg-white px-4 shadow-sm">
        <Search aria-hidden="true" className="size-5 text-slate-500" />
        <input
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
            setError(null);
          }}
          placeholder="0x..."
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none"
          aria-label="Hyperliquid wallet address"
        />
        <button className="shrink-0 bg-ink px-4 py-2 text-sm font-medium text-white" type="submit">
          Analyze
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
