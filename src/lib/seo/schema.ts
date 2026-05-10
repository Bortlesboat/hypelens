import { absoluteUrl, siteConfig } from "@/lib/site";

type FaqEntry = {
  question: string;
  answer: string;
};

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    codeRepository: siteConfig.githubUrl,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function buildFaqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer
      }
    }))
  };
}

export function buildHowToSchema(name: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description: "Analyze a public Hyperliquid wallet with HypeLens.",
    totalTime: "PT2M",
    tool: [
      {
        "@type": "HowToTool",
        name: siteConfig.name
      }
    ],
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
      url: absoluteUrl(`/how-to-analyze-hyperliquid-wallet#step-${index + 1}`)
    }))
  };
}
