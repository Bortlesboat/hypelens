export class TtlCache<T> {
  private readonly values = new Map<string, { value: T; expiresAt: number }>();

  constructor(private readonly ttlMs: number) {}

  get(key: string): T | null {
    const entry = this.values.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.values.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key: string, value: T): void {
    this.values.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}
