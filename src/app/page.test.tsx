import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}));

describe("HomePage", () => {
  it("links to the wallet analysis, CSV export, and API examples guides", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "Read the wallet analysis guide" })).toHaveAttribute(
      "href",
      "/how-to-analyze-hyperliquid-wallet"
    );
    expect(screen.getByRole("link", { name: "Explore CSV export" })).toHaveAttribute("href", "/hyperliquid-export-csv");
    expect(screen.getByRole("link", { name: "View API examples" })).toHaveAttribute("href", "/hyperliquid-api-examples");
  });
});
