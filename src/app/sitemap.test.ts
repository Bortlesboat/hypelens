import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes the Hyperliquid builder discovery pages", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain("https://github.com/Bortlesboat/hypelens/hyperliquid-export-csv");
    expect(urls).toContain("https://github.com/Bortlesboat/hypelens/hyperliquid-api-examples");
  });
});
