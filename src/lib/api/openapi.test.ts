import { describe, expect, it } from "vitest";
import { buildOpenApiDocument } from "./openapi";

describe("buildOpenApiDocument", () => {
  it("describes the public HypeLens wallet APIs", () => {
    const document = buildOpenApiDocument();

    expect(document.openapi).toBe("3.1.0");
    expect(document.info.title).toBe("HypeLens Public API");
    expect(document.servers[0].url).toBe("/");
    expect(document.paths["/api/wallet/{address}"].get.summary).toBe("Get a Hyperliquid wallet report");
    expect(document.paths["/api/wallet/{address}/export"].get.summary).toBe("Export a Hyperliquid wallet report as CSV");
  });

  it("documents report data-completeness fields", () => {
    const document = buildOpenApiDocument();
    const walletReport = document.components.schemas.WalletReport;

    expect(walletReport.properties.dataCompleteness.properties.score).toMatchObject({
      type: "integer",
      minimum: 0,
      maximum: 100
    });
    expect(walletReport.properties.dataWarnings.items.properties.source).toMatchObject({ type: "string" });
  });
});
