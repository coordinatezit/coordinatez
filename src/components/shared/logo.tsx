import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Site-chrome lockup: the Coordinatez mark (cropped from the supplied logo
 * artwork) beside a typeset wordmark. The full supplied lockup lives at
 * /logo.svg and is used for Open Graph / schema references.
 */
export function Logo({
  className,
  onInk = false,
  subtitle = "Technology · Global Trade",
}: {
  className?: string;
  /** Set when rendered on a dark/ink surface. */
  onInk?: boolean;
  subtitle?: string | null;
}) {
  return (
    <Link
      href="/"
      aria-label="Coordinatez — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/logo-mark.svg"
        alt=""
        width={40}
        height={40}
        className="size-9 shrink-0 transition-transform duration-500 group-hover:rotate-90 sm:size-10"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            onInk ? "text-white" : "text-brand-ink dark:text-foreground"
          )}
        >
          Coordinatez
        </span>
        {subtitle && (
          <span
            className={cn(
              "mt-1 font-mono text-[0.55rem] uppercase tracking-[0.28em]",
              onInk ? "text-white/60" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </span>
        )}
      </span>
    </Link>
  );
}
