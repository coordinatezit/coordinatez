"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FormSuccessCard({
  title,
  description,
  buttonLabel,
  onReset,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center rounded-2xl border bg-card p-10 text-center shadow-sm"
    >
      <CheckCircle2 className="size-14 text-primary" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-muted-foreground">{description}</p>
      <Button className="mt-6 rounded-full" onClick={onReset}>
        {buttonLabel}
      </Button>
    </motion.div>
  );
}
