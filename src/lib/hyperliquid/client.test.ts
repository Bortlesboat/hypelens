import { describe, expect, it, vi } from "vitest";
import { HyperliquidClient } from "./client";

describe("HyperliquidClient", () => {
  it("posts Info endpoint requests as JSON", async () => {
    const fetcher = vi.fn(
      async () => new Response(JSON.stringify([{ coin: "BTC", px: "100", sz: "1" }]), { status: 200 })
    );
    const client = new HyperliquidClient("https://example.test/info", fetcher);

    const fills = await client.info({
      type: "userFills",
      user: "0x0000000000000000000000000000000000000000"
    });

    expect(fills).toEqual([{ coin: "BTC", px: "100", sz: "1" }]);
    expect(fetcher).toHaveBeenCalledWith("https://example.test/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "userFills", user: "0x0000000000000000000000000000000000000000" })
    });
  });

  it("throws a structured error for non-OK responses", async () => {
    const fetcher = vi.fn(async () => new Response("rate limited", { status: 429 }));
    const client = new HyperliquidClient("https://example.test/info", fetcher);

    await expect(client.info({ type: "allMids" })).rejects.toMatchObject({
      name: "HyperliquidApiError",
      status: 429
    });
  });
});
