import { z } from "zod";

// Honeypot field: real users never fill this in — bots that auto-fill every field do.
// Intentionally unconstrained (any string parses) so a filled-in value doesn't fail
// validation outright — the submit handler checks it and silently no-ops instead,
// which avoids tipping off the bot with an explicit rejection.
const honeypot = z.string().optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  country: z.string().min(1, "Please select your country"),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more about your inquiry (min. 20 characters)")
    .max(5000),
  website: honeypot,
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Rejects submissions faster than a human could plausibly fill the form — a common bot tell. */
export function failsTimeTrap(formRenderedAt: number, minMillis = 2000): boolean {
  return Date.now() - formRenderedAt < minMillis;
}
