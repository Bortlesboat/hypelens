import { NextResponse } from "next/server";
import { buildWalletCsv } from "@/lib/export/wallet-csv";
import { getWalletReport } from "@/lib/wallet-service";

type RouteContext = {
  params: Promise<{ address: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { address } = await context.params;

  try {
    const report = await getWalletReport(address);
    const csv = buildWalletCsv(report);

    return new NextResponse(csv, {
      headers: {
        "content-disposition": `attachment; filename="hypelens-${report.address}.csv"`,
        "content-type": "text/csv; charset=utf-8"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to export wallet report";
    const status = message.includes("Invalid Hyperliquid address") ? 400 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
