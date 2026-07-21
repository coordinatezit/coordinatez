import { NextResponse } from "next/server";
import { careerSchema, failsTimeTrap, validateResumeFile } from "@/lib/validations";
import { sendCareerNotification, sendCareerThankYou } from "@/lib/email";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  if (isRateLimited(`careers:${getClientKey(request)}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ ok: false, message: "Invalid form submission." }, { status: 400 });
  }

  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    position: formData.get("position")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = careerSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const formRenderedAt = Number(formData.get("formRenderedAt")) || 0;

  // Honeypot filled in, or submitted implausibly fast — silently accept to not tip off the bot.
  if (data.website || failsTimeTrap(formRenderedAt)) {
    return NextResponse.json({ ok: true });
  }

  const turnstileValid = await verifyTurnstileToken(
    formData.get("cf-turnstile-response")?.toString() ?? null,
    getClientKey(request)
  );
  if (!turnstileValid) {
    return NextResponse.json(
      { ok: false, message: "Verification failed. Please refresh the page and try again." },
      { status: 400 }
    );
  }

  const resume = formData.get("resume");
  if (!(resume instanceof File)) {
    return NextResponse.json({ ok: false, message: "Please attach your resume." }, { status: 400 });
  }
  const resumeError = validateResumeFile(resume);
  if (resumeError) {
    return NextResponse.json({ ok: false, message: resumeError }, { status: 400 });
  }

  try {
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    await sendCareerNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      message: data.message,
      attachment: { filename: resume.name, content: resumeBuffer, contentType: resume.type },
    });

    await sendCareerThankYou({ name: data.name, email: data.email, position: data.position });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Career application email failed:", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't submit your application right now. Please try again shortly or email us directly." },
      { status: 500 }
    );
  }
}
