"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { FormSuccessCard } from "@/components/forms/form-success-card";
import { useAntiSpamGuard, turnstileEnabled } from "@/hooks/use-anti-spam-guard";
import { contactSchema, failsTimeTrap, type ContactFormValues } from "@/lib/validations";
import { countryOptions, inquiryInterestOptions } from "@/lib/form-options";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/data/site";

// Public Formspree endpoint — safe to expose in the browser. Submissions are
// delivered to the address configured on the Formspree form (support@coordinatez.com).
// Overridable via env without a code change.
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT || "https://formspree.io/f/meeyvydo";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { turnstileToken, handleTurnstileVerify, handleTurnstileExpire, formRenderedAtRef } =
    useAntiSpamGuard();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      company: "",
      country: "",
      website: "",
    },
  });

  // Prefill from CTA deep-links: /contact?interest=Global Trade&topic=Metal & Scrap Trading
  useEffect(() => {
    const interest = searchParams.get("interest");
    const topic = searchParams.get("topic");
    if (
      interest &&
      (inquiryInterestOptions as readonly string[]).includes(interest)
    ) {
      setValue("interest", interest as ContactFormValues["interest"]);
    }
    if (topic) {
      setValue("message", `I'm interested in ${topic}. `);
    }
  }, [searchParams, setValue]);

  function resetForm() {
    reset({
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      interest: undefined,
      message: "",
      website: "",
    });
  }

  async function onSubmit(data: ContactFormValues) {
    // Honeypot filled in, or submitted implausibly fast — silently "succeed" so bots
    // aren't tipped off.
    if (data.website || failsTimeTrap(formRenderedAtRef.current)) {
      setStatus("success");
      resetForm();
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      toast.error("Please complete the verification challenge before sending.");
      return;
    }

    setStatus("loading");
    try {
      // Human-readable keys so the email Formspree sends to support@coordinatez.com
      // clearly identifies each field. `email` is recognized by Formspree as the
      // reply-to; `_subject` sets the email subject; `_gotcha` is its honeypot.
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name": data.name,
          email: data.email,
          Phone: data.phone,
          Company: data.company || "—",
          "Inquiry Type": data.interest,
          Country: data.country,
          Message: data.message,
          _subject: `New ${data.interest} inquiry from ${data.name}`,
          _gotcha: data.website || "",
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const detail = json?.errors?.map((e: { message: string }) => e.message).join(", ");
        throw new Error(detail || "Submission failed.");
      }

      trackEvent("contact_form_submit", { interest: data.interest });
      setStatus("success");
      resetForm();
    } catch {
      setStatus("idle");
      toast.error(
        `Something went wrong while submitting your inquiry. Please try again or contact us directly at ${siteConfig.email.contact}.`
      );
    }
  }

  if (status === "success") {
    return (
      <FormSuccessCard
        title="Thank You for Contacting Coordinatez"
        description="Your inquiry has been successfully submitted. Our team will get back to you shortly."
        buttonLabel="Send Another Message"
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    <form
      // react-hook-form's handleSubmit() only invokes onSubmit on the browser's submit event,
      // never during render, so onSubmit reading formRenderedAtRef here is safe despite the lint check.
      // eslint-disable-next-line react-hooks/refs
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border bg-card p-6 sm:p-8"
    >
      <HoneypotField {...register("website")} />

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="contact-name">Full Name</FieldLabel>
            <Input id="contact-name" placeholder="Jane Doe" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.company}>
            <FieldLabel htmlFor="contact-company">Company (optional)</FieldLabel>
            <Input id="contact-company" placeholder="Acme Inc." {...register("company")} />
            <FieldError errors={[errors.company]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="contact-email">Email</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              placeholder="jane@company.com"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="contact-phone">Phone</FieldLabel>
            <Input id="contact-phone" type="tel" placeholder="+1 312 555 0100" {...register("phone")} />
            <FieldError errors={[errors.phone]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="contact-country">Country</FieldLabel>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-country" className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
          <Field data-invalid={!!errors.interest}>
            <FieldLabel htmlFor="contact-interest">This is about</FieldLabel>
            <Controller
              control={control}
              name="interest"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger id="contact-interest" className="w-full">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryInterestOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.interest]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            placeholder="Tell us about your project, requirement, or question…"
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <TurnstileWidget onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />

        <Button type="submit" size="lg" className="rounded-full" disabled={status === "loading"}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span key="loading" className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Sending…
              </motion.span>
            ) : (
              <motion.span key="idle">Send Message</motion.span>
            )}
          </AnimatePresence>
        </Button>
      </FieldGroup>
    </form>
  );
}
