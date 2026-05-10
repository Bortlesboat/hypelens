import { NextResponse } from "next/server";
import { getWalletReport } from "@/lib/wallet-service";

type RouteContext = {
  params: Promise<{ address: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { address } = await context.params;

  try {
    const report = await getWalletReport(address);
    return NextResponse.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch wallet report";
    const status = message.includes("Invalid Hyperliquid address") ? 400 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
