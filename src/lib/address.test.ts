import { describe, expect, it } from "vitest";
import { formatShortAddress, isHyperliquidAddress, normalizeAddress } from "./address";

describe("address helpers", () => {
  it("accepts 42-character hex addresses", () => {
    expect(isHyperliquidAddress("0x0000000000000000000000000000000000000000")).toBe(true);
    expect(isHyperliquidAddress("0xABCDEFabcdef1234567890123456789012345678")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isHyperliquidAddress("")).toBe(false);
    expect(isHyperliquidAddress("0x123")).toBe(false);
    expect(isHyperliquidAddress("not-an-address")).toBe(false);
  });

  it("normalizes and shortens valid addresses", () => {
    const address = "0xABCDEFabcdef1234567890123456789012345678";
    expect(normalizeAddress(address)).toBe("0xabcdefabcdef1234567890123456789012345678");
    expect(formatShortAddress(address)).toBe("0xABCD...5678");
  });
});
