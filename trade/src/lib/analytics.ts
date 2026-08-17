/**
 * Fire a custom analytics event to whichever tag stacks are enabled
 * (GA4 via gtag, GTM via dataLayer). Safe no-op when analytics are not
 * configured or consent hasn't loaded the scripts.
 */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", name, params ?? {});
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // analytics must never break the UI
  }
}
