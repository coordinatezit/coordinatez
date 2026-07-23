import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Cpu, Container as ContainerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { JsonLd } from "@/components/shared/json-ld";
import {
  buildMetadata,
  localBusinessJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/data/site";

const path = "/locations/chicago";

export const metadata: Metadata = buildMetadata({
  title: "IT Services & Metal Export in Chicago | Coordinatez",
  description:
    "Coordinatez is headquartered in Chicago, Illinois — IT services, AI solutions, and software development for the Chicago area and the US, plus metal & scrap export from the United States.",
  path,
  keywords: [
    "IT services Chicago",
    "AI company Chicago",
    "software development Chicago",
    "IT consulting Chicago",
    "Chicago scrap metal exporter",
    "Chicago metal supplier",
    "technology company Chicago",
  ],
});

const techLinks = [
  { label: "AI Solutions & Integration", href: "/technology/ai-integration" },
  { label: "Custom Software Development", href: "/technology/custom-software" },
  { label: "Web Development", href: "/technology/web-development" },
  { label: "Mobile App Development", href: "/technology/mobile-applications" },
  { label: "Business Automation", href: "/technology/business-automation" },
  { label: "Data Analytics", href: "/technology/data-analytics" },
];

const tradeLinks = [
  { label: "Scrap Metal Export", href: "/global-trade/scrap-metal-export" },
  { label: "Aluminium Scrap Export", href: "/global-trade/aluminium-scrap" },
  { label: "Copper Scrap Export", href: "/global-trade/copper-scrap" },
  { label: "Metal Trading", href: "/global-trade/metal-trading" },
];

export default function ChicagoPage() {
  const hq = siteConfig.locations.headquarters;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Chicago", path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webPageJsonLd({
            title: "IT Services & Metal Export in Chicago",
            description:
              "Coordinatez in Chicago, Illinois — technology and AI services and metal & scrap export.",
            path,
          }),
          localBusinessJsonLd(),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="bg-graticule pointer-events-none absolute inset-0 text-brand-sky opacity-60"
          style={{ backgroundSize: "40px 40px" }}
        />
        <Container className="relative py-14 sm:py-20">
          <Breadcrumbs items={crumbs} />
          <RevealOnScroll className="mt-6">
            <p className="eyebrow">
              Chicago, Illinois <span className="mx-2 text-border">/</span> {hq.coordinates.label}
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.08] sm:text-5xl">
              Coordinatez in Chicago
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Our global headquarters is in Chicago, Illinois. From here we run both sides of the
              business — technology and AI services for companies across Chicago and the United
              States, and international metal &amp; scrap export from the US to global markets.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/contact">
                  Talk to our Chicago team
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Two divisions in Chicago */}
      <section className="section-y">
        <Container className="grid gap-6 lg:grid-cols-2">
          <RevealOnScroll className="flex flex-col rounded-xl border bg-card p-8">
            <Cpu className="size-6 text-brand-sky" />
            <h2 className="mt-4 font-display text-2xl font-medium">Technology &amp; AI in Chicago</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              We help Chicago-area startups, SMEs, and enterprises build software, integrate AI, and
              automate operations. Engineering is delivered by our team under the{" "}
              {siteConfig.technologyBrand.name} technology brand, coordinated from our Chicago
              headquarters and available to clients nationwide.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {techLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
                  >
                    <ArrowRight className="size-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href="/technology"
                className="text-sm font-semibold text-brand-royal hover:underline dark:text-brand-sky"
              >
                All technology &amp; AI services →
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08} className="flex flex-col rounded-xl border bg-card p-8">
            <ContainerIcon className="size-6 text-brand-copper" />
            <h2 className="mt-4 font-display text-2xl font-medium">Metal &amp; Scrap Export from the US</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Our trading desk connects US suppliers and international buyers of metal and recyclable
              scrap — ferrous and non-ferrous grades, aluminium, and copper — with disciplined
              specification, inspection, and documentation from origin through delivery.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {tradeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-copper transition-colors hover:opacity-80"
                  >
                    <ArrowRight className="size-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link
                href="/global-trade"
                className="text-sm font-semibold text-brand-copper hover:underline"
              >
                All global trade services →
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* HQ details + map */}
      <section className="border-t bg-muted/30">
        <Container className="section-y grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <RevealOnScroll>
            <p className="eyebrow">Headquarters</p>
            <h2 className="mt-4 font-display text-2xl font-medium sm:text-3xl">
              {hq.company} — {hq.city}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-sky" />
                <span>
                  {hq.addressLines.map((line) => (
                    <span key={line} className="block text-muted-foreground">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Chicago is our corporate headquarters and the coordination hub for client
              partnerships and trade. Software engineering is delivered from our development center
              in {siteConfig.locations.development.city}, India — see our{" "}
              <Link href="/global-presence" className="font-medium text-brand-royal hover:underline dark:text-brand-sky">
                global presence
              </Link>{" "}
              for how the teams work together.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${siteConfig.email.contact}`} className="font-medium hover:underline">
                {siteConfig.email.contact}
              </a>
              <span className="text-muted-foreground">{siteConfig.phone.us}</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <iframe
              title={`Map of ${siteConfig.name} headquarters in Chicago, Illinois`}
              src={hq.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-xl border"
            />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
