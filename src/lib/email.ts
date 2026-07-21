import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "@/data/site";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your environment (see .env.example)."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

// Recipient inboxes are env-configurable (CONTACT_TO_EMAIL / CAREERS_TO_EMAIL) so the
// destination can be changed without a code deployment. Falls back to the public address.
const contactInbox = () => process.env.CONTACT_TO_EMAIL || siteConfig.email.contact;
const careersInbox = () => process.env.CAREERS_TO_EMAIL || siteConfig.email.careers;

const brandFooter = `
  <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2ded1;color:#565b78;font-size:12px;">
    ${siteConfig.name} · ${siteConfig.locations.headquarters.addressLines.join(", ")}
  </p>
`;

function wrapEmail(title: string, bodyHtml: string): string {
  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#10143a;">
      <h2 style="color:#14417f;margin-bottom:8px;">${title}</h2>
      ${bodyHtml}
      ${brandFooter}
    </div>
  `;
}

function row(label: string, value: string): string {
  return `<p style="margin:4px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ContactNotificationInput = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  message: string;
};

export async function sendContactNotification(data: ContactNotificationInput) {
  const transporter = getTransporter();
  const html = wrapEmail(
    `New ${data.interest} Inquiry`,
    [
      row("Name", data.name),
      data.company ? row("Company", data.company) : "",
      row("Email", data.email),
      row("Phone", data.phone),
      row("Country", data.country),
      row("Interest", data.interest),
      `<p style="margin-top:12px;"><strong>Message:</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>`,
    ].join("")
  );

  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${process.env.SMTP_USER}>`,
    to: contactInbox(),
    replyTo: data.email,
    subject: `[${data.interest}] New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    html,
  });
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  interest: string;
}) {
  const transporter = getTransporter();
  const html = wrapEmail(
    `Thanks for contacting ${siteConfig.name}`,
    `<p>Hi ${escapeHtml(data.name.split(" ")[0])},</p>
     <p>We've received your <strong>${escapeHtml(data.interest)}</strong> inquiry and a member of our team will get back to you within one business day.</p>
     <p>If your request is urgent, you can also reach us at <a href="mailto:${siteConfig.email.contact}">${siteConfig.email.contact}</a> or ${siteConfig.phone.us}.</p>
     <p>— The ${siteConfig.name} Team</p>`
  );

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `We've received your inquiry — ${siteConfig.name}`,
    html,
  });
}

type CareerNotificationInput = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  attachment?: { filename: string; content: Buffer; contentType: string };
};

export async function sendCareerNotification(data: CareerNotificationInput) {
  const transporter = getTransporter();
  const html = wrapEmail(
    "New Job Application",
    [
      row("Name", data.name),
      row("Email", data.email),
      row("Phone", data.phone),
      row("Position", data.position),
      data.message
        ? `<p style="margin-top:12px;"><strong>Message:</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>`
        : "",
    ].join("")
  );

  await transporter.sendMail({
    from: `"${siteConfig.name} Careers" <${process.env.SMTP_USER}>`,
    to: careersInbox(),
    replyTo: data.email,
    subject: `New application: ${data.position} — ${data.name}`,
    html,
    attachments: data.attachment ? [data.attachment] : undefined,
  });
}

export async function sendCareerThankYou(data: { name: string; email: string; position: string }) {
  const transporter = getTransporter();
  const html = wrapEmail(
    `Thanks for applying, ${escapeHtml(data.name.split(" ")[0])}!`,
    `<p>We've received your application for <strong>${escapeHtml(data.position)}</strong> and our team will review it shortly.</p>
     <p>If your background looks like a fit, we'll reach out to schedule a conversation.</p>
     <p>— The ${siteConfig.name} Talent Team</p>`
  );

  await transporter.sendMail({
    from: `"${siteConfig.name} Careers" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `We've received your application for ${data.position}`,
    html,
  });
}
