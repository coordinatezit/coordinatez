import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { divisions } from "@/data/divisions";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us — A Technology & Global Trade Company",
  description:
    "Coordinatez is a global company headquartered in Chicago with a technology and development center in Mehsana, India. Learn who we are, what our two divisions do, the values we work by, and how the Coordinatez and Coorbitz organizations fit together.",
  path: "/about",
  keywords: [
    "about Coordinatez",
    "Coordinatez company",
    "technology and trade company",
    "Chicago headquarters",
    "Coorbitz",
    "US India company",
    "IT services and import export",
  ],
});

const values = [
  {
    index: "01",
    title: "Specification discipline",
    description:
      "Every engagement starts by pinning the requirement down in writing — what will be delivered, to what standard, by when. Ambiguity is where projects and shipments go wrong, so we remove it first.",
  },
  {
    index: "02",
    title: "Accountability",
    description:
      "Every project and every transaction has a named Coordinatez owner who carries it end to end. When you call with a question, the person who answers is the person responsible.",
  },
  {
    index: "03",
    title: "Verification at source",
    description:
      "We check work where it originates — material inspected before it ships, software tested before it releases. Catching a problem at the source costs a fraction of catching it at the destination.",
  },
  {
    index: "04",
    title: "Honesty about fit",
    description:
      "Not every requirement is ours to take. When a market, material, or build sits outside what we can serve well, we say so at the first conversation — and point you somewhere better when we can.",
  },
];

export default function AboutPage() {
  const hq = siteConfig.locations.headquarters;
  const dev = siteConfig.locations.development;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
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
            <p className="eyebrow">About Coordinatez</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Connecting technology, intelligence &amp; global commerce.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Coordinatez is a global company operating two business divisions — Technology &amp;
              AI Solutions and Global Import &amp; Export — from the United States and India. One
              company, one standard of work, on both sides of the world.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Who we are */}
      <section className="section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                index="01"
                eyebrow="Who We Are"
                title="One company working both sides of the world."
              />
              <RevealOnScroll delay={0.08} className="mt-8 space-y-5 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  {siteConfig.name} is headquartered in {hq.city}, where our corporate, global
                  trade, and client partnership functions sit. Our technology and development
                  center in {dev.city}, India — operating under the{" "}
                  {siteConfig.technologyBrand.name} brand — is where our engineering teams design,
                  build, and run software and AI systems for clients worldwide.
                </p>
                <p>
                  The two divisions look different from the outside — one ships code, the other
                  ships cargo — but they run on the same underlying work: moving accurate
                  information across borders, time zones, and organizations without letting it
                  degrade. Our trading desk runs on tools our engineers build; our engineers work
                  with the operational discipline that physical trade demands.
                </p>
                <p>
                  We are deliberately specific about what we claim. Beyond Chicago and Mehsana, the
                  cities you&apos;ll see on our network map are markets and trade hubs we transact
                  with through partners and counterparties — not Coordinatez offices. What we tell
                  you about our company is what is actually true of it.
                </p>
              </RevealOnScroll>
            </div>

            {/* Side rail — mono facts */}
            <RevealOnScroll delay={0.12}>
              <dl className="divide-y rounded-lg border bg-card">
                <div className="p-5">
                  <dt className="eyebrow">Headquarters</dt>
                  <dd className="mt-2 text-sm font-medium">{hq.city}</dd>
                  <dd className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
                    {hq.coordinates.label}
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow">Development</dt>
                  <dd className="mt-2 text-sm font-medium">{dev.city}</dd>
                  <dd className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground">
                    {dev.coordinates.label}
                  </dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow">Divisions</dt>
                  <dd className="mt-2 font-mono text-sm font-medium">02</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    Technology &amp; AI · Global Trade
                  </dd>
                </div>
              </dl>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="section-y border-t bg-muted/30">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="What We Do"
            title="Two divisions, one operating standard."
            description="Software and AI engineered from India. Goods sourced and traded between the US, India, and global markets. Engage one division, or both."
          />
          <RevealStagger className="mt-12 grid gap-6 lg:grid-cols-2">
            {divisions.map((division) => {
              const isSky = division.accent === "sky";
              return (
                <motion.div key={division.id} variants={staggerItem} className="h-full">
                  <Link
                    href={division.href}
                    className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-foreground/25 sm:p-8"
                  >
                    <p
                      className={`font-mono text-[0.68rem] uppercase tracking-[0.22em] ${
                        isSky ? "text-brand-sky" : "text-brand-copper"
                      }`}
                    >
                      Division {division.number} — {division.label}
                    </p>
                    <h3 className="mt-4 font-display text-2xl font-medium">{division.name}</h3>
                    <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {division.summary}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {division.focus.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="rounded border bg-muted/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${
                        isSky ? "text-brand-sky" : "text-brand-copper"
                      }`}
                    >
                      {division.cta}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </RevealStagger>
        </Container>
      </section>

      {/* Our values */}
      <section className="section-y border-t">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading
              index="03"
              eyebrow="Our Values"
              title="The standards behind both businesses."
              description="Code and cargo fail the same way — through vagueness, unowned problems, and unchecked assumptions. These four values are how we prevent that."
            />
            <RevealStagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {values.map((value) => (
                <motion.div key={value.index} variants={staggerItem} className="border-t pt-6">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Value {value.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-medium">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </section>

      {/* How we're organized — ink panel */}
      <section className="ink-panel border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="04"
            eyebrow="How We're Organized"
            title="Coordinatez and Coorbitz — one group, two names."
            description={siteConfig.technologyBrand.relationshipStatement}
            onInk
          />
          <RevealOnScroll className="mt-12">
            <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-border)] lg:grid-cols-2">
              <div className="bg-[var(--ink-panel)] p-7 sm:p-9">
                <p className="eyebrow-on-ink">{hq.label} — {hq.city}</p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">
                  {siteConfig.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                  The parent company. Corporate functions, the global trade division, and client
                  partnerships run from our headquarters at {hq.addressLines[0]},{" "}
                  {hq.city} — the commercial front door for both divisions.
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)]">
                  {hq.coordinates.label}
                </p>
              </div>
              <div className="bg-[var(--ink-panel)] p-7 sm:p-9">
                <p className="eyebrow-on-ink">{dev.label} — {dev.city}</p>
                <h3 className="mt-4 font-display text-2xl font-medium text-white">
                  {siteConfig.technologyBrand.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                  The dedicated IT Services &amp; AI Solutions brand of {siteConfig.name}. Our
                  engineering teams in {dev.city}, India design, build, and operate the technology
                  division&apos;s work for clients worldwide — backed by the standards of the group.
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)]">
                  {dev.coordinates.label}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-[var(--ink-panel-muted)]">
                One client relationship, one accountable owner — whichever name is on the door.
              </p>
              <Link
                href="/global-presence"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-sky"
              >
                See our global presence
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
