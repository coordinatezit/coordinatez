export type TradeCapability = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

export const tradeCapabilities: TradeCapability[] = [
  {
    id: "global-sourcing",
    title: "Global Sourcing & Procurement",
    description:
      "We locate, vet, and negotiate with manufacturers and suppliers across international markets — so buyers get the right material, at the right specification, from a counterparty they can trust.",
    points: [
      "Supplier identification and vetting",
      "Specification and sample verification",
      "Price and contract negotiation",
      "Ongoing supplier relationship management",
    ],
  },
  {
    id: "import-export",
    title: "Import & Export Operations",
    description:
      "End-to-end handling of cross-border transactions between the United States, India, and global markets — documentation, compliance coordination, and shipment follow-through.",
    points: [
      "Trade documentation and Incoterms guidance",
      "Customs and compliance coordination",
      "Payment and letter-of-credit workflows",
      "Shipment tracking and exception handling",
    ],
  },
  {
    id: "commodity-trading",
    title: "Commodity Trading",
    description:
      "Physical trading of commodities and raw materials — connecting producers with industrial buyers and managing the transaction from offer to delivery.",
    points: [
      "Raw materials and agricultural commodities",
      "Spot and contract-based transactions",
      "Quality inspection coordination",
      "Market pricing intelligence",
    ],
  },
  {
    id: "industrial-materials",
    title: "Industrial Materials",
    description:
      "Sourcing and supply of industrial inputs — materials that manufacturers and processors depend on, delivered against specification and schedule.",
    points: [
      "Construction and manufacturing inputs",
      "Polymers, chemicals, and packaging materials",
      "Specification-matched sourcing",
      "Recurring supply programs",
    ],
  },
  {
    id: "metal-scrap",
    title: "Metal & Scrap Trading",
    description:
      "Trading of ferrous and non-ferrous metals and recyclable scrap — a core corridor of our US–India trade activity, run with disciplined quality and documentation standards.",
    points: [
      "Ferrous and non-ferrous scrap grades",
      "Mill-ready and processed material",
      "Inspection and grading coordination",
      "Container and bulk shipment programs",
    ],
  },
  {
    id: "logistics",
    title: "Logistics Coordination",
    description:
      "We coordinate freight forwarders, carriers, and ports on both sides of a transaction — one accountable point of contact from origin to destination.",
    points: [
      "Ocean and inland freight coordination",
      "Container booking and consolidation",
      "Port and warehouse handoffs",
      "Delivery scheduling and status reporting",
    ],
  },
  {
    id: "market-access",
    title: "Market Access & Partnerships",
    description:
      "For suppliers seeking buyers and buyers seeking reliable supply, we open doors in markets where we operate — introductions, representation, and long-term trading partnerships.",
    points: [
      "US market entry for international suppliers",
      "India sourcing programs for US buyers",
      "Distribution and representation partnerships",
      "Long-term offtake relationships",
    ],
  },
];

// Honest, non-fabricated descriptors for the trade page hero strip.
export const tradeCorridors = [
  { from: "United States", to: "India", note: "Primary corridor" },
  { from: "India", to: "Middle East", note: "Via west-coast ports" },
  { from: "United States", to: "Europe", note: "Industrial materials" },
  { from: "India", to: "Southeast Asia", note: "Commodities" },
];

export const tradeProcess = [
  {
    step: "01",
    title: "Requirement & Specification",
    description: "We document exactly what's being bought or sold — grade, quantity, packing, delivery terms, and timeline.",
  },
  {
    step: "02",
    title: "Counterparty & Terms",
    description: "Vetted supplier or buyer identified, samples and certifications verified, price and Incoterms agreed.",
  },
  {
    step: "03",
    title: "Contract & Compliance",
    description: "Contracts, trade documentation, and payment instruments arranged; customs and compliance coordinated on both sides.",
  },
  {
    step: "04",
    title: "Shipment & Delivery",
    description: "Freight booked and tracked port-to-port; inspection at origin, status reporting in transit, and follow-through to delivery.",
  },
];
