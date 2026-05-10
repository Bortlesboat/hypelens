import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("wallet API route", () => {
  it("returns a 400 for invalid addresses", async () => {
    const response = await GET(new Request("http://localhost/api/wallet/bad"), {
      params: Promise.resolve({ address: "bad" })
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "Invalid Hyperliquid address" });
  });
});
