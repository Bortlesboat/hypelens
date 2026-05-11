import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataWarnings } from "./data-warnings";

describe("DataWarnings", () => {
  it("renders partial data warnings", () => {
    render(
      <DataWarnings
        warnings={[
          {
            source: "userFees",
            message: "Hyperliquid userFees data was unavailable, so this report may be partial."
          }
        ]}
      />
    );

    expect(screen.getByText("Partial Hyperliquid data")).toBeInTheDocument();
    expect(screen.getByText("Hyperliquid userFees data was unavailable, so this report may be partial.")).toBeInTheDocument();
  });

  it("renders nothing without warnings", () => {
    const { container } = render(<DataWarnings warnings={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
