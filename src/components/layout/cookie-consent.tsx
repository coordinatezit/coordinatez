"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "coordinatez-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage doesn't exist during SSR, so this decision can only be made
    // post-mount — an effect is the correct (not just convenient) tool here.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
  }, []);

  function respond(value: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border bg-background/95 p-5 shadow-2xl backdrop-blur sm:inset-x-auto sm:right-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm text-muted-foreground">
            We use cookies to improve your experience and analyze site traffic. Read our{" "}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-4">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => respond("declined")}>
              Decline
            </Button>
            <Button size="sm" onClick={() => respond("accepted")}>
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
