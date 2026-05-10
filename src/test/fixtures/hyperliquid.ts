import type { RawWalletData } from "@/lib/hyperliquid/types";

export const sampleAddress = "0x0000000000000000000000000000000000000000";

export const sampleWalletData: RawWalletData = {
  mids: { BTC: "100000", ETH: "5000" },
  clearinghouseState: {
    marginSummary: {
      accountValue: "25000.50",
      totalMarginUsed: "5000",
      totalNtlPos: "10000"
    },
    assetPositions: [
      {
        position: {
          coin: "BTC",
          szi: "0.10",
          entryPx: "95000",
          unrealizedPnl: "500",
          marginUsed: "2500",
          leverage: { type: "cross", value: 5 }
        }
      }
    ]
  },
  openOrders: [{ coin: "BTC", limitPx: "101000", sz: "0.05", side: "B" }],
  fills: [
    { coin: "BTC", px: "100000", sz: "0.05", side: "B", time: 1710000000000, fee: "2.50" },
    { coin: "ETH", px: "5000", sz: "1", side: "S", time: 1710000100000, fee: "1.25" },
    { coin: "BTC", px: "99000", sz: "0.03", side: "B", time: 1710000200000, fee: "1.00" }
  ],
  historicalOrders: [],
  portfolio: null,
  fees: null
};
