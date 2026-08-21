import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { siteConfig } from "@/data/site";

export function PresenceStrip() {
  const hq = siteConfig.locations.headquarters;
  const dev = siteConfig.locations.development;
  const aus = siteConfig.locations.australia;

  const points = [
    {
      coords: hq.coordinates.label,
      title: `${hq.city}, USA`,
      note: hq.label,
      detail: hq.role,
      accent: "text-brand-sky",
    },
    {
      coords: dev.coordinates.label,
      title: `${dev.city}, India`,
      note: dev.label,
      detail: `${dev.company} — ${dev.role}`,
      accent: "text-brand-sky",
    },
    {
      coords: aus.coordinates.label,
      title: `${aus.city}, Australia`,
      note: aus.label,
      detail: `${aus.company} — ${aus.role}`,
      accent: "text-brand-sky",
    },
  ];

  return (
    <section className="ink-panel section-y relative overflow-hidden">
      <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            eyebrow="Global Presence"
            title="Anchored in Chicago. Engineered in India. Working worldwide."
            onInk
          />
          <Link
            href="/global-presence"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-sky transition-colors hover:text-white"
          >
            Explore our global presence
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <RevealOnScroll className="mt-12">
          <div className="relative grid gap-px overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-border)] sm:grid-cols-3">
            {points.map((point) => (
              <div key={point.title} className="bg-[var(--ink-panel)] p-7 sm:p-8">
                <p className={`font-mono text-[0.62rem] uppercase tracking-[0.2em] ${point.accent}`}>
                  {point.coords}
                </p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">{point.title}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--ink-panel-foreground)]/80">
                  {point.note}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
