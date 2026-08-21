import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { services, serviceCategories } from "@/data/services";

/**
 * Homepage services overview — derived from the same services data as the
 * /technology hub and reusing its card pattern, so the two stay in sync.
 */
export function ServicesOverview() {
  return (
    <section id="services" className="section-y scroll-mt-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="01"
            eyebrow="What We Do"
            title="IT services & AI solutions, end to end."
            description="Web, mobile, custom software, AI, data, and cloud — designed, built, and operated by our in-house engineering team for startups, SMEs, and enterprises."
          />
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
          >
            All {services.length} services
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 space-y-12">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.category === category.id);
            if (items.length === 0) return null;
            return (
              <div key={category.id}>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-medium">{category.label}</h3>
                  <span className="eyebrow">{category.note}</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <RevealOnScroll key={service.slug}>
                      <Link
                        href={`/technology/${service.slug}`}
                        className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-brand-sky/50"
                      >
                        <h4 className="font-display text-xl font-medium">{service.title}</h4>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-royal transition-transform group-hover:translate-x-1 dark:text-brand-sky">
                          Explore {service.navLabel} <ArrowRight className="size-4" />
                        </span>
                      </Link>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
