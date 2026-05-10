import { describe, expect, it } from "vitest";
import { formatCurrency, formatDateTime, formatNumber } from "./formatting";

describe("formatting", () => {
  it("formats report numbers", () => {
    expect(formatCurrency(25000.5)).toBe("$25,000.50");
    expect(formatCurrency(null)).toBe("Unavailable");
    expect(formatNumber(12970)).toBe("12,970");
  });

  it("formats timestamps", () => {
    expect(formatDateTime(1710000000000)).toContain("2024");
    expect(formatDateTime(null)).toBe("Unavailable");
  });
});
