import { z } from "zod";
import { inquiryInterestOptions } from "@/lib/form-options";

// Honeypot field: real users never fill this in — bots that auto-fill every field do.
// Intentionally unconstrained (any string parses) so a filled-in value doesn't fail
// validation outright — the route handler checks it and silently no-ops instead,
// which avoids tipping off the bot with an explicit rejection.
const honeypot = z.string().optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  country: z.string().min(1, "Please select your country"),
  interest: z.enum(inquiryInterestOptions, {
    message: "Please select what your inquiry is about",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please tell us a little more about your inquiry (min. 20 characters)")
    .max(5000),
  website: honeypot,
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  position: z.string().min(1, "Please select a position"),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  website: honeypot,
});

export type CareerFormValues = z.infer<typeof careerSchema>;

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateResumeFile(file: File | null): string | null {
  if (!file || file.size === 0) return "Please upload your resume";
  if (file.size > MAX_RESUME_SIZE_BYTES) return "Resume must be smaller than 5MB";
  if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
    return "Resume must be a PDF or Word document";
  }
  return null;
}

/** Rejects submissions faster than a human could plausibly fill the form — a common bot tell. */
export function failsTimeTrap(formRenderedAt: number, minMillis = 2000): boolean {
  return Date.now() - formRenderedAt < minMillis;
}
