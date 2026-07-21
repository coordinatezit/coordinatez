"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {/* Both icons render on every pass; CSS (not JS state) decides which is visible,
          so there's no hydration mismatch and no mount-detection effect needed. */}
      <Sun className="size-[1.15rem] dark:hidden" />
      <Moon className="hidden size-[1.15rem] dark:block" />
    </Button>
  );
}
