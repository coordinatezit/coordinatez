"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Shared by the Contact and Career forms — true once a real Turnstile site key is configured.
export const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/**
 * Shared anti-spam plumbing for the Contact and Career forms: tracks when the form became
 * interactive (for the time-trap check in src/lib/validations.ts) and the optional Cloudflare
 * Turnstile verification token.
 */
export function useAntiSpamGuard() {
  const [turnstileToken, setTurnstileToken] = useState("");
  // Captured post-mount (not during render) so the time-trap reflects when the form actually
  // became interactive, without calling Date.now() from render itself.
  const formRenderedAtRef = useRef(0);

  const handleTurnstileVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(""), []);

  useEffect(() => {
    formRenderedAtRef.current = Date.now();
  }, []);

  return { turnstileToken, handleTurnstileVerify, handleTurnstileExpire, formRenderedAtRef };
}
