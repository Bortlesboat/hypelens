import { describe, expect, it } from "vitest";
import { buildWalletReport } from "@/lib/analytics/wallet-report";
import { sampleAddress, sampleWalletData } from "@/test/fixtures/hyperliquid";
import { buildWalletCsv } from "./wallet-csv";

describe("buildWalletCsv", () => {
  it("exports recent Hyperliquid fills with report metadata", () => {
    const report = buildWalletReport(sampleAddress, sampleWalletData, new Date("2026-05-10T12:00:00Z"));

    const csv = buildWalletCsv(report);

    expect(csv.split("\n")[0]).toBe(
      "address,generated_at,data_completeness_score,data_warnings,coin,side,price,size,volume_usd,fee_usd,timestamp_ms,timestamp_iso"
    );
    expect(csv).toContain(
      "0x0000000000000000000000000000000000000000,2026-05-10T12:00:00.000Z,100,,BTC,B,100000,0.05,5000,2.5,1710000000000,2024-03-09T16:00:00.000Z"
    );
  });

  it("escapes CSV cells that contain separators or spreadsheet formulas", () => {
    const report = buildWalletReport(
      sampleAddress,
      {
        ...sampleWalletData,
        fills: [{ coin: "=BTC,USD", px: "100000", sz: "0.05", side: "B", time: 1710000000000, fee: "2.50" }],
        dataWarnings: [{ source: "userFees", message: "fees, unavailable" }]
      },
      new Date("2026-05-10T12:00:00Z")
    );

    const csv = buildWalletCsv(report);

    expect(csv).toContain("\"'=BTC,USD\"");
    expect(csv).toContain("\"fees, unavailable\"");
  });
});
