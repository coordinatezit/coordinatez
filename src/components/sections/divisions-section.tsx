import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { divisions } from "@/data/divisions";
import { cn } from "@/lib/utils";

/**
 * "Our Businesses" — the structural heart of the site. Two deliberately
 * different treatments sharing one editorial frame: Technology reads digital
 * (light card, sky accents, grid motif); Global Trade reads industrial
 * (ink card, copper accents, route motif).
 */
export function DivisionsSection() {
  const [technology, trade] = divisions;

  return (
    <section id="businesses" className="section-y scroll-mt-24">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Our Businesses"
          title="One company. Two engines of growth."
          description="Coordinatez operates two distinct business divisions under one global brand — a technology practice engineering software and AI systems, and a trading operation moving goods across international markets."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Division 01 — Technology (light, digital) */}
          <RevealOnScroll className="group relative flex flex-col overflow-hidden rounded-xl border bg-card">
            <div
              aria-hidden
              className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-60"
              style={{ backgroundSize: "34px 34px" }}
            />
            <div className="relative flex flex-1 flex-col p-8 sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-sky">
                  Division {technology.number}
                </span>
                <span className="eyebrow">{technology.label}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-medium sm:text-[2.1rem]">
                {technology.name}
              </h3>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                {technology.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {technology.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand-sky/25 bg-brand-sky/[0.06] px-3.5 py-1.5 text-xs font-medium text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={technology.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                >
                  {technology.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div aria-hidden className="relative h-1 w-full bg-gradient-to-r from-brand-sky to-brand-teal" />
          </RevealOnScroll>

          {/* Division 02 — Global Trade (ink, industrial) */}
          <RevealOnScroll delay={0.1} className="group relative flex flex-col overflow-hidden rounded-xl ink-panel border border-[var(--ink-panel-border)]">
            {/* route-line motif */}
            <svg
              aria-hidden
              viewBox="0 0 400 300"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
              preserveAspectRatio="xMidYMid slice"
            >
              <g fill="none" stroke="#d3915a" strokeWidth="1" strokeDasharray="4 8" className="animate-dash-flow">
                <path d="M-20 240 Q 120 140 220 190 T 430 120" />
                <path d="M-20 190 Q 150 240 260 150 T 430 200" />
              </g>
              {[
                [60, 205],
                [220, 190],
                [330, 152],
              ].map(([x, y]) => (
                <circle key={`${x}`} cx={x} cy={y} r="3" fill="#d3915a" />
              ))}
            </svg>
            <div className="relative flex flex-1 flex-col p-8 sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-copper">
                  Division {trade.number}
                </span>
                <span className="eyebrow-on-ink">{trade.label}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-medium text-white sm:text-[2.1rem]">
                {trade.name}
              </h3>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-[var(--ink-panel-muted)]">
                {trade.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {trade.focus.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand-copper/35 bg-brand-copper/10 px-3.5 py-1.5 text-xs font-medium text-[var(--ink-panel-foreground)]/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={trade.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-copper transition-colors hover:text-[#d9a56b]"
                >
                  {trade.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div aria-hidden className="relative h-1 w-full bg-gradient-to-r from-brand-copper to-[#d9a56b]" />
          </RevealOnScroll>
        </div>

        {/* The bridge between the two */}
        <RevealOnScroll className="mt-6">
          <div className="relative overflow-hidden rounded-xl border bg-muted/40 px-8 py-7 sm:px-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                <span className="font-semibold text-foreground">Why both, together?</span>{" "}
                International trade is an information business — specifications, documents, and
                statuses moving across borders. Our trading desk runs on software our technology
                division builds, and our engineers ship with the operational discipline physical
                trade demands.
              </p>
              <Link
                href="/about"
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 text-sm font-semibold",
                  "text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                )}
              >
                How Coordinatez works
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
