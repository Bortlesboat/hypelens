import { describe, expect, it, vi } from "vitest";
import { buildWalletReport } from "@/lib/analytics/wallet-report";
import { getWalletReport } from "@/lib/wallet-service";
import { sampleAddress, sampleWalletData } from "@/test/fixtures/hyperliquid";
import { GET } from "./route";

vi.mock("@/lib/wallet-service", () => ({
  getWalletReport: vi.fn()
}));

const mockedGetWalletReport = vi.mocked(getWalletReport);

describe("wallet CSV export route", () => {
  it("returns a downloadable CSV wallet report", async () => {
    mockedGetWalletReport.mockResolvedValueOnce(
      buildWalletReport(sampleAddress, sampleWalletData, new Date("2026-05-10T12:00:00Z"))
    );

    const response = await GET(new Request(`http://localhost/api/wallet/${sampleAddress}/export`), {
      params: Promise.resolve({ address: sampleAddress })
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("content-disposition")).toContain("hypelens-0x0000000000000000000000000000000000000000.csv");
    expect(await response.text()).toContain("data_completeness_score");
  });

  it("returns a 400 for invalid addresses", async () => {
    mockedGetWalletReport.mockRejectedValueOnce(new Error("Invalid Hyperliquid address"));

    const response = await GET(new Request("http://localhost/api/wallet/bad/export"), {
      params: Promise.resolve({ address: "bad" })
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: "Invalid Hyperliquid address" });
  });
});
