export type DivisionAccent = "sky" | "copper";

export type Division = {
  id: "technology" | "trade";
  number: string;
  name: string;
  label: string;
  href: string;
  tagline: string;
  summary: string;
  accent: DivisionAccent;
  focus: string[];
  cta: string;
};

export const divisions: Division[] = [
  {
    id: "technology",
    number: "01",
    name: "Coordinatez Technology",
    label: "IT Services & AI Solutions",
    href: "/technology",
    tagline: "Technology That Moves Business Forward.",
    summary:
      "We design, build, and run digital products and AI systems — from marketing sites and mobile apps to custom software, AI agents, automation, and data platforms. Engineering is led from our development center in Mehsana, India, operating under the Coorbitz technology brand.",
    accent: "sky",
    focus: [
      "Web & Mobile Development",
      "Custom Software",
      "AI Integration & AI Agents",
      "Business Automation",
      "Data Analytics & Machine Learning",
      "Cloud & API Engineering",
      "Digital Marketing & SEO",
    ],
    cta: "Explore Technology & AI",
  },
  {
    id: "trade",
    number: "02",
    name: "Coordinatez Global Trade",
    label: "International Import & Export",
    href: "/global-trade",
    tagline: "Metal & Scrap Export. Connecting Global Markets.",
    summary:
      "We trade and move metal and scrap across borders — ferrous and non-ferrous scrap, aluminium, and copper — connecting US suppliers with international buyers, alongside broader commodity and industrial-material import/export. Every transaction is run with disciplined specification, inspection, and documentation.",
    accent: "copper",
    focus: [
      "Scrap Metal Export",
      "Aluminium & Copper Scrap",
      "Ferrous & Non-Ferrous Metals",
      "Metal Trading",
      "Global Sourcing & Procurement",
      "Import & Export Operations",
      "Logistics Coordination",
    ],
    cta: "Explore Global Trade",
  },
];
