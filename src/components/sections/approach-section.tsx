import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";

const principles = [
  {
    index: "A",
    title: "Specification before commitment",
    description:
      "Whether it's a two-week discovery sprint or a year-long platform build, we write down exactly what will be delivered — scope, timeline, acceptance — before anyone commits.",
  },
  {
    index: "B",
    title: "One accountable point of contact",
    description:
      "Clients don't chase five vendors across two continents. One Coordinatez owner carries your project from start to finish and answers for it.",
  },
  {
    index: "C",
    title: "Verification at the source",
    description:
      "We review work where it's produced and test software before it releases — problems are caught where they're cheap to fix, not after they've reached production.",
  },
  {
    index: "D",
    title: "Honest about fit",
    description:
      "If a requirement isn't something we can serve well — a stack we don't cover, a build that shouldn't exist — we say so early and plainly. Long-term trust outearns any single project.",
  },
];

export function ApproachSection() {
  return (
    <section className="section-y border-t">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading
            index="02"
            eyebrow="How We Operate"
            title="One operating standard across every engagement."
            description="Software projects fail through ambiguity — vague scopes, unowned problems, unchecked assumptions. Our working principles exist to remove it."
          />
          <RevealStagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {principles.map((principle) => (
              <motion.div key={principle.index} variants={staggerItem} className="relative border-t pt-6">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                  Principle {principle.index}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  );
}
