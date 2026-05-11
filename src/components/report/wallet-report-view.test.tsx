import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildWalletReport } from "@/lib/analytics/wallet-report";
import { sampleAddress, sampleWalletData } from "@/test/fixtures/hyperliquid";
import { WalletReportView } from "./wallet-report-view";

describe("WalletReportView", () => {
  it("links to the CSV export for the wallet report", () => {
    const report = buildWalletReport(sampleAddress, sampleWalletData, new Date("2026-05-10T12:00:00Z"));

    render(<WalletReportView report={report} />);

    expect(screen.getByRole("link", { name: "Download CSV" })).toHaveAttribute(
      "href",
      `/api/wallet/${sampleAddress}/export`
    );
    expect(screen.getByText("100% data completeness")).toBeInTheDocument();
  });
});
