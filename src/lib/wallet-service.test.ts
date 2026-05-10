import { describe, expect, it, vi } from "vitest";
import { sampleAddress, sampleWalletData } from "@/test/fixtures/hyperliquid";
import { getWalletReport } from "./wallet-service";

describe("getWalletReport", () => {
  it("fetches raw wallet data and returns a normalized report", async () => {
    const info = vi
      .fn()
      .mockResolvedValueOnce(sampleWalletData.mids)
      .mockResolvedValueOnce(sampleWalletData.clearinghouseState)
      .mockResolvedValueOnce(sampleWalletData.openOrders)
      .mockResolvedValueOnce(sampleWalletData.fills)
      .mockResolvedValueOnce(sampleWalletData.historicalOrders)
      .mockResolvedValueOnce(sampleWalletData.portfolio)
      .mockResolvedValueOnce(sampleWalletData.fees);

    const report = await getWalletReport(sampleAddress, {
      client: { info },
      now: new Date("2026-05-10T12:00:00Z"),
      cache: null
    });

    expect(report.address).toBe(sampleAddress);
    expect(report.totalVolumeUsd).toBe(12970);
    expect(info).toHaveBeenCalledTimes(7);
  });

  it("rejects invalid addresses before calling Hyperliquid", async () => {
    const info = vi.fn();

    await expect(getWalletReport("bad", { client: { info }, cache: null })).rejects.toThrow(
      "Invalid Hyperliquid address"
    );
    expect(info).not.toHaveBeenCalled();
  });
});
