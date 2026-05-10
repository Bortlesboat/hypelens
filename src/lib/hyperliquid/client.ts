import type { HyperliquidInfoRequest } from "./types";

export const DEFAULT_HYPERLIQUID_INFO_URL = "https://api.hyperliquid.xyz/info";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

export class HyperliquidApiError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`Hyperliquid API request failed with status ${status}`);
    this.name = "HyperliquidApiError";
    this.status = status;
    this.body = body;
  }
}

export class HyperliquidClient {
  constructor(
    private readonly infoUrl = process.env.HYPERLIQUID_INFO_URL ?? DEFAULT_HYPERLIQUID_INFO_URL,
    private readonly fetcher: Fetcher = fetch
  ) {}

  async info<T>(body: HyperliquidInfoRequest): Promise<T> {
    const response = await this.fetcher(this.infoUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new HyperliquidApiError(response.status, await response.text());
    }

    return (await response.json()) as T;
  }
}
