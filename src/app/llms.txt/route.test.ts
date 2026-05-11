import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("llms.txt route", () => {
  it("describes HypeLens and its public Hyperliquid export surfaces", async () => {
    const response = await GET();
    const body = await response.text();

    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(body).toContain("# HypeLens");
    expect(body).toContain("Hyperliquid API examples");
    expect(body).toContain("/openapi.json");
    expect(body).toContain("/api/wallet/{address}/export");
    expect(body).toContain("Hyperliquid wallet CSV export");
  });
});
