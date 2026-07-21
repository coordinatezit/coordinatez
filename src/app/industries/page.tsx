import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { industries } from "@/data/industries";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve — Technology & Global Trade Sectors",
  description:
    "Coordinatez serves industries at the intersection of technology and trade — manufacturing, metals & recycling, logistics, retail & e-commerce, healthcare, finance, construction, and agriculture — with software, AI, and international sourcing.",
  path: "/industries",
  keywords: [
    "industries served",
    "manufacturing software and sourcing",
    "metals and recycling trade",
    "logistics technology",
    "healthcare software",
    "e-commerce development",
    "construction materials sourcing",
    "Coordinatez industries",
  ],
});

const divisionBadge: Record<
  "technology" | "trade",
  { label: string; className: string }
> = {
  technology: {
    label: "Technology",
    className:
      "rounded-full border border-brand-sky/30 bg-brand-sky/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brand-sky",
  },
  trade: {
    label: "Global Trade",
    className:
      "rounded-full border border-brand-copper/30 bg-brand-copper/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brand-copper",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
        ]}
      />

      {/* Hero — light editorial */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-royal opacity-60"
        />
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow">Industries</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Serving industries where technology meets trade.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Some sectors need software. Some need supply. Many need both — and that overlap is
              where Coordinatez does its best work. Here&apos;s where our two divisions show up,
              separately and together.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Industry cards */}
      <section className="section-y">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Where We Work"
            title="Eight sectors, two divisions."
            description="Each card notes which division serves the sector — and what that work typically looks like in practice."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => {
              const accentBg = industry.divisions.includes("technology")
                ? "bg-brand-sky"
                : "bg-brand-copper";
              return (
                <motion.div
                  key={industry.id}
                  variants={staggerItem}
                  className="flex h-full flex-col rounded-lg border bg-card p-6"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {industry.divisions.map((division) => (
                      <span key={division} className={divisionBadge[division].className}>
                        {divisionBadge[division].label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium">{industry.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t pt-5">
                    {industry.examples.map((example) => (
                      <li key={example} className="flex gap-2.5 text-sm leading-snug">
                        <span
                          aria-hidden
                          className={`mt-[0.55rem] h-px w-3 shrink-0 ${accentBg}`}
                        />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </RevealStagger>
        </Container>
      </section>

      {/* Don't see your industry? */}
      <section className="border-t bg-muted/30">
        <Container className="py-12">
          <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Don&apos;t see your industry?</span>{" "}
              The list above is where we work most often, not a boundary. If your requirement
              involves software, AI, or cross-border sourcing, describe it — we&apos;ll tell you
              honestly whether it&apos;s a fit.
            </p>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
            >
              Tell us about your industry
              <ArrowRight className="size-4" />
            </Link>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
