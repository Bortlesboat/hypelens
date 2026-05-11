import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopMarkets } from "./top-markets";

describe("TopMarkets", () => {
  it("renders top market concentration", () => {
    render(
      <TopMarkets
        markets={[
          { coin: "BTC", volumeUsd: 10000, fillCount: 8, share: 0.625 },
          { coin: "ETH", volumeUsd: 6000, fillCount: 3, share: 0.375 }
        ]}
      />
    );

    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("$10,000.00")).toBeInTheDocument();
    expect(screen.getByText("62.5% of recent volume")).toBeInTheDocument();
  });

  it("renders an empty state without market data", () => {
    render(<TopMarkets markets={[]} />);

    expect(screen.getByText("No market concentration data is available for this wallet.")).toBeInTheDocument();
  });
});
