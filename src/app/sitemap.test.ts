import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes the Hyperliquid CSV export guide", () => {
    expect(sitemap().map((entry) => entry.url)).toContain("https://github.com/Bortlesboat/hypelens/hyperliquid-export-csv");
  });
});
