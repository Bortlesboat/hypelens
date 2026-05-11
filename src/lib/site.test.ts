import { describe, expect, it } from "vitest";
import { absoluteUrl } from "./site";

describe("absoluteUrl", () => {
  it("preserves the configured fallback repository path", () => {
    expect(absoluteUrl("/hyperliquid-export-csv")).toBe(
      "https://github.com/Bortlesboat/hypelens/hyperliquid-export-csv"
    );
  });
});
