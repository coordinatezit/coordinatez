import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll, RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { JsonLd } from "@/components/shared/json-ld";
import { TradeNetworkMap } from "@/components/sections/trade-network-map";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tradeServiceJsonLd, faqJsonLd } from "@/lib/seo";
import { tradePages } from "@/data/trade-pages";
import { tradeCorridors, tradeProcess } from "@/data/trade";
import { faqs } from "@/data/faqs";

const groups = ["Metal & Scrap", "Trade Services"] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          ...tradePages.map((page) =>
            tradeServiceJsonLd({
              title: page.title,
              description: page.tagline,
              path: `/${page.slug}`,
            })
          ),
          faqJsonLd([...faqs]),
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
        <Container className="relative py-16 sm:py-24">
          <RevealOnScroll>
            <p className="eyebrow-on-ink flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Coordinatez Global Trade</span>
              <span aria-hidden className="text-[var(--ink-panel-border)]">/</span>
              <span>Chicago — Global Markets</span>
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Metal &amp; scrap export.{" "}
              <span className="text-gradient-copper">Connecting global markets.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--ink-panel-muted)]">
              International metal and scrap trading and import/export from the United States to
              world markets — ferrous and non-ferrous scrap, aluminium and copper, and broader
              commodity and industrial-material trade, run with disciplined specification,
              inspection, and documentation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#a9622c] px-6 text-white hover:bg-[#8f5225]"
              >
                <Link href="/contact">
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
                <Link href="/#capabilities">
                  Explore our capabilities
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

      {/* Capabilities grid — links to dedicated pages */}
      <section id="capabilities" className="section-y scroll-mt-24">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="What We Trade"
            title="Metal, scrap, and international trade services."
            description="Dedicated capabilities across metal and scrap export and broader import/export — engage us for one material or the entire transaction chain."
          />
          {groups.map((group) => {
            const items = tradePages.filter((p) => p.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mt-12">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-xl font-medium">{group}</h3>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-border"
                  />
                </div>
                <RevealStagger className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((page) => (
                    <motion.div key={page.slug} variants={staggerItem}>
                      <Link
                        href={`/${page.slug}`}
                        className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-brand-copper/50"
                      >
                        <h4 className="font-display text-xl font-medium">{page.title}</h4>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {page.tagline}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-copper transition-transform group-hover:translate-x-1">
                          Explore {page.navLabel} <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </RevealStagger>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Global Trade Network map */}
      <section id="network" className="ink-panel scroll-mt-24 border-t border-[var(--ink-panel-border)]">
        <Container className="section-y">
          <SectionHeading
            index="02"
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

      {/* Process */}
      <section className="section-y border-t">
        <Container>
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
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <SectionHeading
            index="FAQ"
            eyebrow="Common Questions"
            title="Answers before you ask."
          />
          <RevealOnScroll className="mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </Container>
      </section>

      <InsightsPreview />
      <ContactCta />
    </>
  );
}
