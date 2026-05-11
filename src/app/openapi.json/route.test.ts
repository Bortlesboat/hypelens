import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("openapi.json route", () => {
  it("serves the public OpenAPI document as JSON", async () => {
    const response = await GET();
    const document = await response.json();

    expect(response.headers.get("content-type")).toContain("application/json");
    expect(document.openapi).toBe("3.1.0");
    expect(document.paths).toHaveProperty("/api/wallet/{address}");
    expect(document.paths).toHaveProperty("/api/wallet/{address}/export");
  });
});
