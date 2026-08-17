import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

/**
 * Editorial section header — mono "coordinate" eyebrow over a hairline rule,
 * serif display title, optional lede. Left-aligned by design; `align="center"`
 * is available for the rare symmetric moment (e.g. CTA bands).
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  onInk = false,
  className,
}: {
  /** Section number rendered before the eyebrow, e.g. "02". */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onInk?: boolean;
  className?: string;
}) {
  return (
    <RevealOnScroll
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {(eyebrow || index) && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className={onInk ? "eyebrow-on-ink" : "eyebrow"}>
            {index && <span className="mr-2">{index}</span>}
            {eyebrow}
          </span>
          <span
            aria-hidden
            className={cn(
              "h-px flex-1 max-w-24",
              onInk ? "bg-[var(--ink-panel-border)]" : "bg-border"
            )}
          />
        </div>
      )}
      <h2
        className={cn(
          "mt-5 text-balance font-display text-3xl font-medium sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          onInk && "text-[var(--ink-panel-foreground)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed sm:text-lg",
            onInk ? "text-[var(--ink-panel-muted)]" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </RevealOnScroll>
  );
}
