// Best-effort in-memory rate limiter. Serverless instances aren't shared, so this is a
// second layer of defense alongside the honeypot + time-trap checks, not the sole defense.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function isRateLimited(
  key: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > maxRequests;
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}
