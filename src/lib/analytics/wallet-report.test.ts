import { describe, expect, it } from "vitest";
import { sampleAddress, sampleWalletData } from "@/test/fixtures/hyperliquid";
import { buildWalletReport } from "./wallet-report";

describe("buildWalletReport", () => {
  it("normalizes raw Hyperliquid data into report metrics", () => {
    const report = buildWalletReport(sampleAddress, sampleWalletData, new Date("2026-05-10T12:00:00Z"));

    expect(report.address).toBe(sampleAddress);
    expect(report.accountValueUsd).toBe(25000.5);
    expect(report.totalVolumeUsd).toBe(12970);
    expect(report.totalFeesUsd).toBe(4.75);
    expect(report.openOrderCount).toBe(1);
    expect(report.topMarkets[0]).toEqual({ coin: "BTC", volumeUsd: 7970, fillCount: 2, share: 0.6145 });
    expect(report.positions[0].coin).toBe("BTC");
    expect(report.flags.map((flag) => flag.kind)).toContain("concentration");
  });
});
