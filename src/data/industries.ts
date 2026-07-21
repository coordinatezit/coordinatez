export type Industry = {
  id: string;
  name: string;
  divisions: ("technology" | "trade")[];
  description: string;
  examples: string[];
};

export const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    divisions: ["technology", "trade"],
    description:
      "Both sides of our business meet in manufacturing: we source the raw and industrial materials plants run on, and build the software that runs their operations.",
    examples: [
      "Raw-material and component sourcing",
      "Production and inventory software",
      "Quality and compliance dashboards",
    ],
  },
  {
    id: "metals-recycling",
    name: "Metals & Recycling",
    divisions: ["trade"],
    description:
      "A core focus of our trading division — ferrous and non-ferrous scrap, processed metal, and mill-ready material moved between the US, India, and global buyers.",
    examples: [
      "Scrap grading and inspection coordination",
      "Container and bulk export programs",
      "Long-term mill supply relationships",
    ],
  },
  {
    id: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    divisions: ["technology", "trade"],
    description:
      "We coordinate physical freight daily in our own trading work — and build the tracking, documentation, and visibility software logistics teams rely on.",
    examples: [
      "Shipment-tracking portals",
      "Documentation automation",
      "Freight and route coordination",
    ],
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    divisions: ["technology", "trade"],
    description:
      "From storefront platforms and inventory systems to sourcing private-label products and packaging materials from international suppliers.",
    examples: [
      "E-commerce builds and integrations",
      "Product sourcing programs",
      "Order and fulfillment automation",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    divisions: ["technology"],
    description:
      "Patient-facing portals, scheduling and records workflows, and AI-assisted document processing — built with privacy and compliance in mind.",
    examples: [
      "Appointment and intake systems",
      "Medical document digitization",
      "Practice operations dashboards",
    ],
  },
  {
    id: "finance-professional",
    name: "Finance & Professional Services",
    divisions: ["technology"],
    description:
      "Automation and AI for document-heavy service firms — accounting, legal, insurance, and consulting teams drowning in repeatable knowledge work.",
    examples: [
      "Document extraction and review AI",
      "Client portals and workflow tools",
      "Reporting and reconciliation automation",
    ],
  },
  {
    id: "construction-real-estate",
    name: "Construction & Real Estate",
    divisions: ["technology", "trade"],
    description:
      "Construction inputs sourced through our trade network, and software for project tracking, bids, and property operations.",
    examples: [
      "Building-material supply",
      "Bid and project management tools",
      "Property listing and CRM platforms",
    ],
  },
  {
    id: "agriculture-commodities",
    name: "Agriculture & Commodities",
    divisions: ["trade"],
    description:
      "Sourcing and trading agricultural commodities and processed goods between producing and consuming markets, with quality inspection built into every transaction.",
    examples: [
      "Agri-commodity sourcing",
      "Quality and certification coordination",
      "Recurring offtake programs",
    ],
  },
];
