import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { siteConfig } from "@/data/site";

export function ContactCta() {
  return (
    <section className="section-y border-t">
      <Container>
        <RevealOnScroll>
          <div className="ink-panel relative overflow-hidden rounded-2xl border border-[var(--ink-panel-border)] px-8 py-14 sm:px-14 sm:py-16">
            <div aria-hidden className="bg-graticule pointer-events-none absolute inset-0 text-white" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--brand-sky) 22%, transparent) 0%, transparent 65%)",
              }}
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <p className="eyebrow-on-ink">Start a conversation</p>
                <h2 className="mt-4 text-balance font-display text-3xl font-medium text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
                  A build to scope, or a shipment to move — tell us what you&apos;re working on.
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-[var(--ink-panel-muted)]">
                  Technology inquiries reach our engineering leads; trade inquiries reach our
                  trading desk. Either way, you&apos;ll hear back within one business day.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-7 text-[#10143a] hover:bg-white/90"
                >
                  <Link href="/contact">
                    Talk to Coordinatez
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-panel-muted)] lg:text-right">
                  <p>
                    <a
                      href={`mailto:${siteConfig.email.contact}`}
                      className="transition-colors hover:text-white"
                    >
                      {siteConfig.email.contact}
                    </a>
                  </p>
                  <p className="mt-1">{siteConfig.phone.us}</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
