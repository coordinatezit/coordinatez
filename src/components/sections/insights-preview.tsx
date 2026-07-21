import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";
import { insights } from "@/data/insights";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function InsightsPreview() {
  const latest = [...insights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section className="section-y border-t">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="04"
            eyebrow="Insights"
            title="Field notes from both sides of the business."
            description="Practical writing on AI, engineering, and international trade — from the team doing the work."
          />
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-sky dark:text-brand-sky"
          >
            All insights
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <RevealStagger className="mt-12 divide-y border-y">
          {latest.map((post) => (
            <motion.article key={post.slug} variants={staggerItem}>
              <Link
                href={`/insights/${post.slug}`}
                className="group grid gap-2 py-7 transition-colors sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <p>{dateFormat.format(new Date(post.date))}</p>
                  <p
                    className={
                      post.category === "Global Trade" ? "mt-1 text-brand-copper" : "mt-1 text-brand-sky"
                    }
                  >
                    {post.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-balance font-display text-xl font-medium transition-colors group-hover:text-brand-royal dark:group-hover:text-brand-sky sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="hidden size-5 self-center text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground sm:block" />
              </Link>
            </motion.article>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
