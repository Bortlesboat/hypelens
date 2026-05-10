import { describe, expect, it } from "vitest";
import { buildFaqSchema, buildHowToSchema, buildSoftwareApplicationSchema } from "./schema";

describe("schema builders", () => {
  it("builds software application schema for HypeLens", () => {
    const schema = buildSoftwareApplicationSchema();

    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.name).toBe("HypeLens");
    expect(schema.applicationCategory).toBe("FinanceApplication");
    expect(schema.offers.price).toBe("0");
  });

  it("builds FAQ schema with visible questions", () => {
    const schema = buildFaqSchema([
      {
        question: "What is a Hyperliquid wallet analyzer?",
        answer: "A Hyperliquid wallet analyzer turns public wallet activity into a readable report."
      }
    ]);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity[0].name).toBe("What is a Hyperliquid wallet analyzer?");
  });

  it("builds HowTo schema from ordered steps", () => {
    const schema = buildHowToSchema("How to analyze a Hyperliquid wallet", ["Paste an address", "Read the report"]);

    expect(schema["@type"]).toBe("HowTo");
    expect(schema.step[1]).toMatchObject({ position: 2, name: "Read the report" });
  });
});
