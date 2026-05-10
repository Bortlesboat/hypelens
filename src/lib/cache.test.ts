import { afterEach, describe, expect, it, vi } from "vitest";
import { TtlCache } from "./cache";

afterEach(() => {
  vi.useRealTimers();
});

describe("TtlCache", () => {
  it("returns cached values before expiry", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-10T12:00:00Z"));
    const cache = new TtlCache<string>(1000);

    cache.set("wallet", "report");

    expect(cache.get("wallet")).toBe("report");
  });

  it("expires old values", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-10T12:00:00Z"));
    const cache = new TtlCache<string>(1000);

    cache.set("wallet", "report");
    vi.setSystemTime(new Date("2026-05-10T12:00:02Z"));

    expect(cache.get("wallet")).toBeNull();
  });
});
