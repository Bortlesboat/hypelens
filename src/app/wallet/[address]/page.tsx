import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WalletReportView } from "@/components/report/wallet-report-view";
import { formatShortAddress, isHyperliquidAddress } from "@/lib/address";
import { getWalletReport } from "@/lib/wallet-service";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ address: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { address } = await params;
  return {
    title: `${formatShortAddress(address)} | HypeLens`,
    description: "Read-only Hyperliquid wallet report with activity, fees, and behavior signals."
  };
}

export default async function WalletPage({ params }: PageProps) {
  const { address } = await params;

  if (!isHyperliquidAddress(address)) {
    notFound();
  }

  try {
    const report = await getWalletReport(address);
    return <WalletReportView report={report} />;
  } catch {
    notFound();
  }
}
