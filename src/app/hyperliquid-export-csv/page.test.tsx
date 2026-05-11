import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HyperliquidCsvExportPage from "./page";

describe("HyperliquidCsvExportPage", () => {
  it("explains the Hyperliquid wallet CSV export", () => {
    render(<HyperliquidCsvExportPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Hyperliquid wallet CSV export" })).toBeInTheDocument();
    expect(screen.getByText("GET /api/wallet/{address}/export")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Try HypeLens" })).toHaveAttribute("href", "/");
  });
});
