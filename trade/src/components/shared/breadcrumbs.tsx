import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Visual breadcrumb trail. Pair with breadcrumbJsonLd() from @/lib/seo for the
 * matching BreadcrumbList structured data. The final crumb is the current page
 * (not linked). Set `onInk` on dark panels.
 */
export function Breadcrumbs({
  items,
  onInk = false,
  className,
}: {
  items: Crumb[];
  onInk?: boolean;
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", className)}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-x-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className={onInk ? "text-[var(--ink-panel-foreground)]" : "text-foreground"}
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={cn(
                      "transition-colors",
                      onInk
                        ? "text-[var(--ink-panel-muted)] hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight
                    aria-hidden
                    className={cn(
                      "size-3",
                      onInk ? "text-[var(--ink-panel-border)]" : "text-border"
                    )}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
