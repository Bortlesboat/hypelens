import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HyperliquidApiExamplesPage from "./page";

describe("HyperliquidApiExamplesPage", () => {
  it("shows builder examples for the HypeLens Hyperliquid API", () => {
    render(<HyperliquidApiExamplesPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Hyperliquid API examples" })).toBeInTheDocument();
    expect(screen.getByText("GET /api/wallet/{address}")).toBeInTheDocument();
    expect(screen.getByText("GET /api/wallet/{address}/export")).toBeInTheDocument();
    expect(
      screen.getByText('curl "/api/wallet/0x0000000000000000000000000000000000000000"')
    ).toBeInTheDocument();
    expect(
      screen.getByText('curl -L "/api/wallet/0x0000000000000000000000000000000000000000/export" -o hypelens-wallet.csv')
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download OpenAPI JSON" })).toHaveAttribute("href", "/openapi.json");
  });
});
