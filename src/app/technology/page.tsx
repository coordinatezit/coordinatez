import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services, serviceCategories, type Service } from "@/data/services";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Technology & AI Solutions — IT Services, Software & AI Integration",
  description:
    "Coordinatez Technology delivers web and mobile development, custom software, AI integration, AI agents, business automation, data analytics, machine learning, cloud, and SEO — engineered from our development center in India for clients worldwide.",
  path: "/technology",
  keywords: [
    "IT services company",
    "AI solutions",
    "AI integration services",
    "custom software development",
    "AI agents for business",
    "business automation",
    "data analytics services",
    "cloud solutions",
    "Coordinatez Technology",
  ],
});

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  return (
    <article
      id={service.id}
      className="scroll-mt-28 border-t py-14 first:border-t-0 sm:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-14">
        {/* Left rail — number, title, tech */}
        <RevealOnScroll>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brand-sky">
            {String(index + 1).padStart(2, "0")} / {service.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium sm:text-3xl">{service.title}</h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {service.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded border bg-muted/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <Link
            href={{ pathname: "/contact", query: { interest: "Technology & AI", topic: service.title } }}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
          >
            Discuss {service.title.toLowerCase()}
            <ArrowRight className="size-4" />
          </Link>
        </RevealOnScroll>

        {/* Right rail — problem/solution/benefits/use-cases */}
        <RevealOnScroll delay={0.08} className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 sm:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow">The problem</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.problem}
                </p>
              </div>
              <div className="border-t pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <h4 className="eyebrow text-brand-sky">Our solution</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.solution}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h4 className="eyebrow">What you gain</h4>
            <ul className="mt-4 space-y-2.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2.5 text-sm leading-snug">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-brand-sky" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h4 className="eyebrow">Typical use cases</h4>
            <ul className="mt-4 space-y-2.5">
              {service.useCases.map((useCase) => (
                <li key={useCase} className="flex gap-2.5 text-sm leading-snug">
                  <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-brand-sky" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Technology & AI", path: "/technology" },
          ]),
          ...services.map((service) =>
            serviceJsonLd({ id: service.id, title: service.title, description: service.description })
          ),
        ]}
      />

      {/* Hero — digital, technical treatment */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-70"
          style={{ backgroundSize: "40px 40px" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 14%, transparent) 0%, transparent 65%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <RevealOnScroll>
            <p className="eyebrow">
              Division 01 <span className="mx-2 text-border">/</span> {siteConfig.divisions.technology.name}
            </p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Technology that moves <span className="text-gradient-sky">business forward</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Web, mobile, custom software, AI, data, and cloud — designed, built, and operated by
              our engineering teams under the {siteConfig.technologyBrand.name} technology brand,
              for startups, SMEs, and enterprises worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={{ pathname: "/contact", query: { interest: "Technology & AI" } }}>
                  Start a technology conversation
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="#services-index">
                  Browse all {services.length} services
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>

          {/* capability categories */}
          <RevealOnScroll delay={0.12}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {serviceCategories.map((category, i) => (
                <div key={category.id} className="bg-card p-5">
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.65rem] text-brand-sky">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-medium">{category.label}</span>
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{category.note}</dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Services index */}
      <section id="services-index" className="scroll-mt-24 border-b bg-muted/30">
        <Container className="py-10">
          <nav aria-label="Services on this page" className="flex flex-wrap gap-x-6 gap-y-2">
            {services.map((service, i) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="group inline-flex items-baseline gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-[0.62rem] text-brand-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="underline-offset-4 group-hover:underline">{service.title}</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Service blocks */}
      <section className="pb-8">
        <Container>
          {services.map((service, index) => (
            <ServiceBlock key={service.id} service={service} index={index} />
          ))}
        </Container>
      </section>

      {/* Coorbitz note */}
      <section className="border-t">
        <Container className="py-12">
          <RevealOnScroll className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                Delivered by {siteConfig.technologyBrand.name}.
              </span>{" "}
              {siteConfig.technologyBrand.name} is the dedicated IT Services &amp; AI Solutions
              brand of {siteConfig.name}, operating from our development center in{" "}
              {siteConfig.locations.development.city}, India — backed by the standards and global
              presence of the {siteConfig.name} group.
            </p>
            <Link
              href="/global-presence"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
            >
              Our global presence
              <ArrowRight className="size-4" />
            </Link>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
