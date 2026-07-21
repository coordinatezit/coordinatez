import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { TradeNetworkMap } from "@/components/sections/trade-network-map";
import { buildMetadata, tradeServiceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { tradeCapabilities, tradeCorridors, tradeProcess } from "@/data/trade";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Global Trade — Import & Export, Sourcing, Commodities & Metal Trading",
  description:
    "Coordinatez Global Trade connects buyers and suppliers across the United States, India, and international markets — global sourcing, import & export operations, commodity and industrial-material trading, metal & scrap, and logistics coordination.",
  path: "/global-trade",
  keywords: [
    "import export company",
    "international trade company",
    "global sourcing",
    "commodity trading company",
    "industrial materials supplier",
    "metal and scrap trading",
    "US India trade",
    "logistics coordination",
    "Coordinatez Global Trade",
  ],
});

export default function GlobalTradePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Global Trade", path: "/global-trade" },
          ]),
          ...tradeCapabilities.map((capability) =>
            tradeServiceJsonLd({
              id: capability.id,
              title: capability.title,
              description: capability.description,
            })
          ),
        ]}
      />

      {/* Hero — industrial ink + copper treatment */}
      <section className="ink-panel relative overflow-hidden">
        <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 size-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-copper) 18%, transparent) 0%, transparent 65%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow-on-ink">
              Division 02 <span className="mx-2 text-[var(--ink-panel-border)]">/</span>{" "}
              {siteConfig.divisions.trade.name}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Connecting global markets.{" "}
              <span className="text-gradient-copper">Moving business forward.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--ink-panel-muted)]">
              International import &amp; export between the United States, India, and world
              markets — sourcing, commodity and industrial-material trading, metal &amp; scrap,
              and the logistics coordination that holds it all together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#a9622c] px-6 text-white hover:bg-[#8f5225]"
              >
                <Link href={{ pathname: "/contact", query: { interest: "Global Trade" } }}>
                  Discuss a trade requirement
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#network">
                  See the trade network
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>

          {/* corridors strip */}
          <RevealOnScroll delay={0.12}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-border)] sm:grid-cols-4">
              {tradeCorridors.map((corridor) => (
                <div key={`${corridor.from}-${corridor.to}`} className="bg-[var(--ink-panel)] p-5">
                  <dt className="flex items-center gap-2 text-sm font-medium text-white">
                    {corridor.from}
                    <ArrowRight className="size-3.5 text-brand-copper" />
                    {corridor.to}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)]">
                    {corridor.note}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Global Trade Network map */}
      <section id="network" className="ink-panel scroll-mt-24 border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="01"
            eyebrow="Global Trade Network"
            title="One desk. Two continents. Global reach."
            description="Our headquarters in Chicago and our team in India work the same transactions from both sides — connecting US and international buyers with vetted suppliers across the markets shown here."
            onInk
          />
          <RevealOnScroll className="mt-12 overflow-hidden rounded-xl border border-[var(--ink-panel-border)] bg-[var(--ink-panel-soft)]/40 p-4 text-[var(--ink-panel-foreground)] sm:p-8">
            <TradeNetworkMap className="h-auto w-full" />
            <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--ink-panel-muted)]">
              Coordinatez locations in blue · markets &amp; trade hubs we work with in copper
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="section-y">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="What We Do"
            title="From first inquiry to delivered cargo."
            description="Seven capabilities that cover the full life of an international transaction — engage us for one piece or the entire chain."
          />
          <div className="mt-4">
            {tradeCapabilities.map((capability, index) => (
              <article
                key={capability.id}
                id={capability.id}
                className="scroll-mt-28 border-b py-10 last:border-b-0"
              >
                <RevealOnScroll className="grid gap-6 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-12">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="-mt-1 font-display text-xl font-medium sm:text-2xl">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {capability.description}
                  </p>
                  <ul className="space-y-2">
                    {capability.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-snug">
                        <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-brand-copper" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </RevealOnScroll>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <SectionHeading
            index="03"
            eyebrow="How a Transaction Runs"
            title="Discipline at every step."
            description="The same four-stage process governs every transaction we touch — it's how disputes are prevented rather than settled."
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tradeProcess.map((stage) => (
              <motion.div
                key={stage.step}
                variants={staggerItem}
                className="relative rounded-lg border bg-card p-6"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-copper">
                  Step {stage.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium">{stage.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </RevealStagger>

          <RevealOnScroll className="mt-10 rounded-lg border bg-card px-7 py-6">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">A note on fit:</span> we take on
              transactions where we have reliable counterparties, inspection coverage, and market
              knowledge — and we&apos;ll tell you plainly when a requirement falls outside that. If
              you&apos;re exploring a new corridor or material,{" "}
              <Link
                href={{ pathname: "/contact", query: { interest: "Global Trade" } }}
                className="font-medium text-brand-copper underline-offset-4 hover:underline"
              >
                start the conversation
              </Link>{" "}
              and we&apos;ll give you an honest read.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* CTA — copper variant */}
      <section className="section-y">
        <Container>
          <RevealOnScroll>
            <div className="ink-panel relative overflow-hidden rounded-2xl border border-[var(--ink-panel-border)] px-8 py-14 sm:px-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--brand-copper) 24%, transparent) 0%, transparent 65%)",
                }}
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
                <div>
                  <p className="eyebrow-on-ink">Global Trade Desk</p>
                  <h2 className="mt-4 text-balance font-display text-3xl font-medium text-white sm:text-4xl">
                    Have material to move — or a requirement to fill?
                  </h2>
                  <p className="mt-4 max-w-xl text-pretty text-[var(--ink-panel-muted)]">
                    Send the specification, quantity, and destination. Our trading desk responds
                    within one business day with an honest read on price, feasibility, and timeline.
                  </p>
                </div>
                <div className="flex lg:justify-end">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#a9622c] px-7 text-white hover:bg-[#8f5225]"
                  >
                    <Link href={{ pathname: "/contact", query: { interest: "Global Trade" } }}>
                      Contact the trade desk
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
