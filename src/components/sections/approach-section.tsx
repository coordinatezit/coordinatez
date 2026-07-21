import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealStagger, staggerItem } from "@/components/shared/reveal-on-scroll";
import * as motion from "framer-motion/client";

const principles = [
  {
    index: "A",
    title: "Specification before commitment",
    description:
      "Whether it's a software scope or a contract for forty tonnes of material, we write down exactly what will be delivered — grade, quantity, timeline, acceptance — before anyone commits.",
  },
  {
    index: "B",
    title: "One accountable point of contact",
    description:
      "Clients don't chase five vendors across two continents. One Coordinatez owner carries your project or shipment from start to finish and answers for it.",
  },
  {
    index: "C",
    title: "Verification at the source",
    description:
      "We inspect material at origin and test software before release — problems are caught where they're cheap to fix, not after they've crossed an ocean or reached production.",
  },
  {
    index: "D",
    title: "Honest about fit",
    description:
      "If a requirement isn't something we can serve well — a market we don't cover, a build that shouldn't exist — we say so early and plainly. Long-term trust outearns any single transaction.",
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
            title="One operating standard across both divisions."
            description="Software and shipping containers fail the same way — through ambiguity. Our working principles exist to remove it."
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
