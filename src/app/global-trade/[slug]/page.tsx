import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/shared/json-ld";
import {
  buildMetadata,
  tradeServiceJsonLd,
  faqJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { tradePages, getTradePageBySlug } from "@/data/trade-pages";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return tradePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getTradePageBySlug(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/global-trade/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function TradePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getTradePageBySlug(slug);
  if (!page) notFound();

  const path = `/global-trade/${page.slug}`;
  const related = page.related
    .map((relatedSlug) => getTradePageBySlug(relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Global Trade", path: "/global-trade" },
    { name: page.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webPageJsonLd({ title: page.metaTitle, description: page.metaDescription, path }),
          tradeServiceJsonLd({ title: page.title, description: page.tagline, path }),
          faqJsonLd(page.faqs),
        ]}
      />

      {/* Hero — ink/copper industrial treatment */}
      <section className="ink-panel relative overflow-hidden">
        <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 size-[32rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-copper) 18%, transparent) 0%, transparent 65%)",
          }}
        />
        <Container className="relative py-14 sm:py-20">
          <Breadcrumbs items={crumbs} onInk />
          <RevealOnScroll className="mt-6">
            <p className="eyebrow-on-ink">
              {page.group} <span className="mx-2 text-[var(--ink-panel-border)]">/</span> Global Trade
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--ink-panel-muted)]">
              {page.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#a9622c] px-6 text-white hover:bg-[#8f5225]"
              >
                <Link href={{ pathname: "/contact", query: { interest: "Global Trade", topic: page.title } }}>
                  Discuss a requirement
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/global-trade">
                  All trade services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Intro */}
      <section className="section-y">
        <Container>
          <RevealOnScroll className="max-w-3xl space-y-5">
            {page.intro.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-pretty text-lg leading-relaxed text-foreground/90"
                    : "text-pretty leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            ))}
          </RevealOnScroll>

          {/* Sections */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.sections.map((section) => (
              <RevealOnScroll key={section.heading} className="rounded-xl border bg-card p-6 sm:p-8">
                <h2 className="font-display text-xl font-medium">{section.heading}</h2>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
                {section.points && section.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-snug">
                        <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-brand-copper" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <RevealOnScroll className="max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
              {page.title} — common questions
            </h2>
            <Accordion type="single" collapsible className="mt-8 w-full">
              {page.faqs.map((faq, i) => (
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

      {/* Related + CTA */}
      {related.length > 0 && (
        <section className="border-t">
          <Container className="section-y">
            <p className="eyebrow">Related trade services</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/global-trade/${rel.slug}`}
                  className="group flex flex-col rounded-lg border bg-card p-6 transition-colors hover:border-brand-copper/50"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-copper">
                    {rel.group}
                  </span>
                  <span className="mt-3 font-display text-lg font-medium">{rel.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {rel.tagline}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-copper transition-transform group-hover:translate-x-1">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Trade CTA — copper */}
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
                    Ready to move material — or source it?
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
                    <Link href={{ pathname: "/contact", query: { interest: "Global Trade", topic: page.title } }}>
                      Contact the trade desk
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--ink-panel-muted)]">
                {siteConfig.email.contact} · {siteConfig.phone.us}
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
