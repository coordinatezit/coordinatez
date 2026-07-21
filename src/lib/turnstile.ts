/**
 * Verifies a Cloudflare Turnstile token server-side. Returns true (skips verification)
 * if TURNSTILE_SECRET_KEY isn't configured, so routes calling this stay fully functional
 * before Turnstile is set up — see .env.example.
 */
export async function verifyTurnstileToken(token: string | null, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
    });
    const json = await res.json();
    return Boolean(json.success);
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return false;
  }
}
