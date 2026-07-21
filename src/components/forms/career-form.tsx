"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Upload, FileText } from "lucide-react";
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
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { HoneypotField } from "@/components/forms/honeypot-field";
import { FormSuccessCard } from "@/components/forms/form-success-card";
import { useAntiSpamGuard, turnstileEnabled } from "@/hooks/use-anti-spam-guard";
import { careerSchema, type CareerFormValues, validateResumeFile } from "@/lib/validations";
import { openPositions, applicationPositionOptions } from "@/data/jobs";

const positionOptions = [...openPositions.map((job) => job.title), ...applicationPositionOptions];

export function CareerForm({ defaultPosition }: { defaultPosition?: string }) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { turnstileToken, handleTurnstileVerify, handleTurnstileExpire, formRenderedAtRef } =
    useAntiSpamGuard();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      position: defaultPosition ?? "",
      website: "",
    },
  });

  async function onSubmit(data: CareerFormValues) {
    const fileError = validateResumeFile(resumeFile);
    if (fileError) {
      setResumeError(fileError);
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      toast.error("Please complete the verification challenge before submitting.");
      return;
    }

    setResumeError(null);
    setStatus("loading");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value ?? "")));
      formData.append("formRenderedAt", String(formRenderedAtRef.current));
      if (turnstileToken) formData.append("cf-turnstile-response", turnstileToken);
      formData.append("resume", resumeFile as File);

      const res = await fetch("/api/careers", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset({ position: "", website: "", name: "", email: "", phone: "", message: "" });
      setResumeFile(null);
    } catch (error) {
      setStatus("idle");
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessCard
        title="Application Submitted!"
        description="Thanks for applying — our talent team will review your application and reach out if it's a fit."
        buttonLabel="Submit Another Application"
        onReset={() => setStatus("idle")}
      />
    );
  }

  return (
    // react-hook-form's handleSubmit() only invokes onSubmit on the browser's submit event, never
    // during render, so onSubmit reading formRenderedAtRef here is safe despite the static lint check.
    // eslint-disable-next-line react-hooks/refs
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <HoneypotField {...register("website")} />

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="career-name">Full Name</FieldLabel>
            <Input id="career-name" placeholder="Jane Doe" {...register("name")} />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="career-email">Email</FieldLabel>
            <Input id="career-email" type="email" placeholder="jane@email.com" {...register("email")} />
            <FieldError errors={[errors.email]} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="career-phone">Phone</FieldLabel>
            <Input id="career-phone" type="tel" placeholder="+1 312 555 0100" {...register("phone")} />
            <FieldError errors={[errors.phone]} />
          </Field>
          <Field data-invalid={!!errors.position}>
            <FieldLabel htmlFor="career-position">Position</FieldLabel>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="career-position" className="w-full">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.position]} />
          </Field>
        </div>

        <Field data-invalid={!!resumeError}>
          <FieldLabel htmlFor="career-resume">Resume (PDF or Word, max 5MB)</FieldLabel>
          <label
            htmlFor="career-resume"
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary"
          >
            {resumeFile ? <FileText className="size-4" /> : <Upload className="size-4" />}
            {resumeFile ? resumeFile.name : "Click to upload your resume"}
          </label>
          <input
            id="career-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => {
              setResumeFile(e.target.files?.[0] ?? null);
              setResumeError(null);
            }}
          />
          <FieldError errors={[resumeError ? { message: resumeError } : undefined]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="career-message">Message (optional)</FieldLabel>
          <Textarea
            id="career-message"
            rows={4}
            placeholder="Anything you'd like us to know?"
            {...register("message")}
          />
          <FieldError errors={[errors.message]} />
        </Field>

        <TurnstileWidget onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />

        <Button type="submit" size="lg" className="rounded-full" disabled={status === "loading"}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span key="loading" className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Submitting…
              </motion.span>
            ) : (
              <motion.span key="idle">Submit Application</motion.span>
            )}
          </AnimatePresence>
        </Button>
      </FieldGroup>
    </form>
  );
}
