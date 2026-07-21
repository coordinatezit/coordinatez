import { NextResponse } from "next/server";
import { contactSchema, failsTimeTrap } from "@/lib/validations";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientKey(request)}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid form submission." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const formRenderedAt = Number((body as Record<string, unknown>).formRenderedAt) || 0;

  // Honeypot filled in, or submitted implausibly fast — silently accept to not tip off the bot.
  if (data.website || failsTimeTrap(formRenderedAt)) {
    return NextResponse.json({ ok: true });
  }

  const turnstileValid = await verifyTurnstileToken(
    typeof (body as Record<string, unknown>)["cf-turnstile-response"] === "string"
      ? ((body as Record<string, unknown>)["cf-turnstile-response"] as string)
      : null,
    getClientKey(request)
  );
  if (!turnstileValid) {
    return NextResponse.json(
      { ok: false, message: "Verification failed. Please refresh the page and try again." },
      { status: 400 }
    );
  }

  try {
    await sendContactNotification({
      name: data.name,
      company: data.company || undefined,
      email: data.email,
      phone: data.phone,
      country: data.country,
      interest: data.interest,
      message: data.message,
    });

    // Confirmation to the sender — non-fatal if it bounces after the main
    // notification already went through.
    try {
      await sendContactConfirmation({
        name: data.name,
        email: data.email,
        interest: data.interest,
      });
    } catch (confirmationError) {
      console.error("Contact confirmation email failed:", confirmationError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send your message right now. Please try again shortly or email us directly.",
      },
      { status: 500 }
    );
  }
}
