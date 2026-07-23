import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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
import { ContactCta } from "@/components/sections/contact-cta";
import {
  buildMetadata,
  serviceJsonLd,
  faqJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { services, getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/data/site";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/technology/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const path = `/technology/${service.slug}`;
  const related = service.related
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Technology & AI", path: "/technology" },
    { name: service.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webPageJsonLd({ title: service.metaTitle, description: service.metaDescription, path }),
          serviceJsonLd({ title: service.title, description: service.description, path }),
          faqJsonLd(service.faqs),
        ]}
      />

      {/* Hero — digital/sky treatment */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <Container className="relative py-14 sm:py-20">
          <Breadcrumbs items={crumbs} />
          <RevealOnScroll className="mt-6">
            <p className="eyebrow">
              {service.category} <span className="mx-2 text-border">/</span> Technology &amp; AI
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl">
              {service.title}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4">
              {service.intro.map((paragraph, i) => (
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
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link
                  href={{ pathname: "/contact", query: { interest: "Technology & AI", topic: service.title } }}
                >
                  Discuss your project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="/technology">
                  All technology services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Problem / Solution */}
      <section className="section-y">
        <Container>
          <RevealOnScroll className="grid gap-6 rounded-xl border bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 className="eyebrow">The problem</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {service.problem}
              </p>
            </div>
            <div className="border-t pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="eyebrow text-brand-sky">How Coordinatez solves it</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {service.solution}
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <RevealOnScroll className="rounded-xl border bg-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-medium">What you gain</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2.5 text-sm leading-snug">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-sky" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 font-display text-xl font-medium">Typical use cases</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.useCases.map((useCase) => (
                  <li key={useCase} className="flex gap-2.5 text-sm leading-snug">
                    <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-brand-sky" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08} className="rounded-xl border bg-muted/40 p-6 sm:p-8">
              <h2 className="eyebrow">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {service.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border bg-card px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Engineering is delivered by our team under the{" "}
                <Link href="/about" className="font-medium text-brand-royal hover:underline dark:text-brand-sky">
                  {siteConfig.technologyBrand.name}
                </Link>{" "}
                technology brand, serving clients across the United States and internationally.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30">
        <Container className="section-y">
          <RevealOnScroll className="max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
              {service.title} — common questions
            </h2>
            <Accordion type="single" collapsible className="mt-8 w-full">
              {service.faqs.map((faq, i) => (
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

      {/* Related services — internal linking */}
      {related.length > 0 && (
        <section className="border-t">
          <Container className="section-y">
            <p className="eyebrow">Related services</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/technology/${rel.slug}`}
                  className="group flex flex-col rounded-lg border bg-card p-6 transition-colors hover:border-brand-sky/50"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand-sky">
                    {rel.category}
                  </span>
                  <span className="mt-3 font-display text-lg font-medium">{rel.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {rel.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-transform group-hover:translate-x-1 dark:text-brand-sky">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCta />
    </>
  );
}
