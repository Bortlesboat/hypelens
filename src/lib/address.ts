const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

export function isHyperliquidAddress(value: string): boolean {
  return ADDRESS_PATTERN.test(value.trim());
}

export function normalizeAddress(value: string): string {
  const trimmed = value.trim();
  if (!isHyperliquidAddress(trimmed)) {
    throw new Error("Invalid Hyperliquid address");
  }
  return trimmed.toLowerCase();
}

export function formatShortAddress(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length < 12) {
    return trimmed;
  }
  return `${trimmed.slice(0, 6)}...${trimmed.slice(-4)}`;
}
