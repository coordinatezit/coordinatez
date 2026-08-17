export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  category: "Global Trade";
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  body: InsightBlock[];
};

// Original editorial content by the Coordinatez team — no fabricated case studies,
// clients, or statistics. Keep new posts to the same standard.
export const insights: Insight[] = [
  {
    slug: "us-india-trade-corridor-basics",
    title: "The US–India Trade Corridor: What First-Time Importers Should Know",
    category: "Global Trade",
    excerpt:
      "Documentation, inspection, and counterparty trust decide whether a first import goes smoothly — long before the container ships.",
    date: "2026-05-27",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "Trade between the United States and India keeps growing across industrial materials, commodities, and recycled metals — and every month, businesses attempt their first transaction on the corridor. Most problems we see are not price problems. They are process problems, and they are avoidable.",
      },
      { type: "h2", text: "The transaction is won or lost in the paperwork" },
      {
        type: "p",
        text: "Before any container moves, the commercial terms need to be unambiguous: exact material specification, quantity tolerances, packing, Incoterms, payment instrument, and what happens when inspection results disagree with the contract. Vague specifications are the single most common source of disputes — 'scrap' or 'polymer granules' means nothing until grade, contamination limits, and moisture tolerances are written down.",
      },
      { type: "h2", text: "Inspect at origin, not at destination" },
      {
        type: "p",
        text: "By the time material lands, your leverage is gone. Third-party inspection at loading — photos, weights, grade verification — costs a fraction of one rejected container. Serious counterparties on either side of the corridor expect this and welcome it; resistance to inspection is itself information.",
      },
      { type: "h2", text: "Counterparty diligence is the real moat" },
      {
        type: "ul",
        items: [
          "Verify the exporter/importer codes and registrations both sides need — in India the IEC, in the US the importer-of-record obligations.",
          "Start with a trial quantity even when the unit economics beg for volume.",
          "Use payment instruments that match the trust level — documentary collections and letters of credit exist for a reason.",
          "Work with partners who have people on both sides of the water; time zones and follow-through matter more than brochures.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic. It is discipline, applied consistently — which is exactly what a good trading partner brings to the table.",
      },
    ],
  },
  {
    slug: "reading-a-metal-scrap-specification",
    title: "How to Read a Metal & Scrap Specification Like a Trader",
    category: "Global Trade",
    excerpt:
      "Grade names travel badly between markets. What protects both sides is the specification sheet — here's what to look for.",
    date: "2026-01-28",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "Scrap and secondary metals are traded worldwide under grade names that sound standardized — and mostly aren't. The same word can imply different contamination limits, different processing, and different expectations depending on the market. The contract's specification sheet, not the grade name, is what protects both sides of the transaction.",
      },
      { type: "h2", text: "What a real specification pins down" },
      {
        type: "ul",
        items: [
          "Material definition — alloy family or grade reference, and what reference standard it follows.",
          "Contamination limits — attachments, coatings, oil, moisture, and non-metallic content, with numbers, not adjectives.",
          "Physical form — loose, baled, briquetted, sheared; dimensions where they matter to the buyer's furnace or process.",
          "Weighing and inspection — who weighs, where, with what tolerance, and which third party arbitrates disagreement.",
          "Rejection mechanics — what happens, commercially, when a load fails: price adjustment scale, return terms, or disposal.",
        ],
      },
      {
        type: "p",
        text: "Experienced counterparties settle these points in the contract because they've each paid tuition once. If a specification conversation feels like overkill, it's usually because someone hasn't been through a dispute yet — and the corridor between the US and India rewards the disciplined.",
      },
    ],
  },
  {
    slug: "scrap-metal-export-guide-usa",
    title: "A Practical Guide to Exporting Scrap Metal from the USA",
    category: "Global Trade",
    excerpt:
      "A first US scrap export succeeds or fails on specification, documents, and inspection — not on price. Here is what a clean transaction actually requires.",
    date: "2026-07-02",
    readMinutes: 8,
    body: [
      {
        type: "p",
        text: "The United States is one of the world's largest sources of recovered metal, and there is steady international demand for it. That combination tempts a lot of first-time exporters — yards, dealers, and small trading companies — into cross-border deals before they understand what a clean transaction looks like. The material almost always sells. Whether it ships, gets paid for, and doesn't blow up into a dispute depends on a handful of unglamorous decisions made before anything leaves the yard.",
      },
      { type: "h2", text: "Start with the grade specification, not the grade name" },
      {
        type: "p",
        text: "Every scrap deal begins with agreeing what the material actually is — and grade names alone don't do that. A buyer in one country and a seller in another can both say 'shred' or 'mixed copper' and mean measurably different things. The specification is what makes the contract enforceable: the alloy or metal family, the physical form (loose, baled, sheared, briquetted), the size range where it matters to the buyer's furnace or shredder, and hard numbers for contamination — attachments, coatings, oil, moisture, and non-metallic content. Numbers, not adjectives. 'Clean' is not a spec; '2% maximum non-metallic by weight' is.",
      },
      { type: "h2", text: "The core export documents" },
      {
        type: "p",
        text: "A scrap export runs on a small, predictable set of documents. Each one has a job, and buyers, banks, and customs authorities all read them against each other, so they need to agree:",
      },
      {
        type: "ul",
        items: [
          "Commercial invoice — the commercial heart of the deal: parties, material description matching the spec, quantity, unit price, Incoterm and named place, currency, and payment terms. Customs on both ends value the shipment from this.",
          "Packing list — how the goods are physically made up: number of bales or containers, gross and net weights, and markings. It lets everyone reconcile what was loaded against what was invoiced.",
          "Certificate of origin — states the country where the material originated, often needed for the buyer's customs clearance and any duty treatment; frequently issued or certified by a chamber of commerce.",
          "Bill of lading — issued by the carrier, it is the contract of carriage and the document of title. Whoever holds the original negotiable bill controls the cargo, which is why it sits at the center of secure payment methods.",
        ],
      },
      {
        type: "p",
        text: "Depending on the metal and the destination, additional paperwork can apply — radiation or contamination certificates, weighbridge tickets, and destination-specific import permits. The principle holds regardless: the documents must describe one consistent shipment. A packing list that disagrees with the bill of lading is how containers end up stranded at a port accruing demurrage.",
      },
      { type: "h2", text: "Inspect at origin, choose your Incoterm deliberately" },
      {
        type: "p",
        text: "Third-party inspection at the point of loading — grade verification, weights, and photographs before the container is sealed — costs a small fraction of one rejected load, and once material has crossed an ocean the exporter's leverage to resolve a dispute is largely gone. On terms, the Incoterms rules define exactly where risk and cost pass from seller to buyer. FOB (free on board) leaves the buyer responsible for ocean freight and marine insurance from the loading port; CIF (cost, insurance and freight) puts those on the seller to the destination port. Neither is 'better' — but signing CIF while pricing as if it were FOB is a common and expensive first-timer mistake.",
      },
      { type: "h2", text: "Counterparties and payment" },
      {
        type: "p",
        text: "Diligence on the other side is the real protection. Verify registrations and the importer-of-record obligations on the destination end, start with a trial quantity even when volume economics are tempting, and match the payment instrument to the trust level — documentary collections and letters of credit exist precisely so that release of documents (and therefore the cargo) is tied to payment. A counterparty who resists inspection, resists a trial load, or pushes for open-account terms on a first deal is telling you something.",
      },
      { type: "h2", text: "The pitfalls that recur" },
      {
        type: "ul",
        items: [
          "Vague specifications that mean different things to buyer and seller — the single most common source of disputes.",
          "Documents that don't reconcile with each other, causing customs holds and demurrage.",
          "Skipping origin inspection to save a few hundred dollars, then arguing about grade after arrival.",
          "Misreading the Incoterm and discovering freight or insurance was your responsibility all along.",
          "Going to full volume on an unproven counterparty because the per-ton math looked irresistible.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic. A first export that goes smoothly looks boring from the outside: the spec was tight, the documents agreed, the material was inspected before it sailed, and the payment terms matched the relationship. Boring is the goal.",
      },
    ],
  },
  {
    slug: "aluminium-scrap-export-explained",
    title: "Aluminium Scrap Export: Grades, Specifications, and What Buyers Look For",
    category: "Global Trade",
    excerpt:
      "Aluminium scrap trades under familiar category names, but what actually clears the deal is the specification behind them. Here's how buyers think.",
    date: "2026-07-09",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "Aluminium — spelled 'aluminum' in the United States, the same metal either way — is one of the most widely traded recovered metals in the world, because remelting it uses a small fraction of the energy needed to produce it from ore. That demand supports an active export market, and with it a vocabulary of category names that traders lean on. Understanding those categories, and why buyers care more about the specification than the label, is most of what a newcomer needs.",
      },
      { type: "h2", text: "The common category names" },
      {
        type: "p",
        text: "As general industry knowledge, aluminium scrap tends to be described in broad families based on where it comes from and how clean it is:",
      },
      {
        type: "ul",
        items: [
          "Extrusions — offcuts and profiles from window frames and similar products; valued when free of thermal-break plastic, rubber gaskets, and steel screws.",
          "Sheet — clean rolled stock such as trimmings and used sheet, prized when it is a single, known alloy family.",
          "Wheels — cast aluminium road wheels, which need steel weights, valve stems, and tyre remnants removed to grade well.",
          "Cast — engine and gearbox castings and similar heavy pieces, typically a different alloy family from wrought sheet or extrusion.",
          "Mixed / low-grade — commingled aluminium of unknown alloys, and turnings or borings from machining, which carry oil and fines and are priced accordingly.",
          "Used beverage cans (UBC) — a high-volume, well-defined stream traded largely on cleanliness and moisture.",
        ],
      },
      {
        type: "p",
        text: "These are general industry terms, not a catalogue of any one company's stock. They are a shared shorthand — a starting point for a conversation that still has to end in a written specification.",
      },
      { type: "h2", text: "Why specification beats grade name" },
      {
        type: "p",
        text: "Aluminium's value to a buyer depends heavily on alloy chemistry, and alloys are easy to mix and hard to separate once melted. 'Extrusions' from two suppliers can behave very differently in a furnace if one batch carries more attachments or a different alloy blend. That is why serious buyers write specifications rather than trust names: they pin down the acceptable alloy family or chemistry range, the maximum non-metallic and free-iron content, coatings such as paint or anodising, moisture, and the physical form. A grade name sets expectations; the specification is what the deal is actually enforced against.",
      },
      { type: "h2", text: "Contamination is the whole game" },
      {
        type: "p",
        text: "For aluminium, most quality problems come down to contamination and misdescription. Attached steel — screws, hinges, weights — dilutes the metallic yield and can damage processing. Plastics, rubber, and thermal breaks add weight that isn't metal. Oil and moisture on turnings inflate the shipped weight and create hazards on remelt. Mixed alloys reduce what the recovered metal can be used for. Every one of these is a reason a buyer either discounts the price or rejects the load, and every one is measurable — which is exactly why it belongs in the contract as a number.",
      },
      { type: "h2", text: "Export considerations" },
      {
        type: "p",
        text: "On top of the general mechanics of any metal export — consistent documentation, origin inspection, a deliberately chosen Incoterm, and payment terms that match the relationship — aluminium adds a few of its own. Because it is light and bulky relative to its value, packing density and freight economics matter more than for denser metals; baling and how a container is loaded affect the landed cost meaningfully. Turnings and fines may face specific handling or documentation requirements. And because alloy identity drives value, buyers increasingly expect verification at loading rather than taking the description on faith. The exporters who do well are simply the ones whose loads consistently match the spec on the invoice.",
      },
    ],
  },
  {
    slug: "copper-scrap-export-explained",
    title: "Copper Scrap Export: Understanding Grades and Quality",
    category: "Global Trade",
    excerpt:
      "Copper scrap is graded largely on purity and what's attached to it. Knowing the standard grade families — and how quality is judged — is where every deal starts.",
    date: "2026-07-15",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "Copper is among the most valuable of the commonly traded recovered metals, which makes its scrap grades unusually precise and its quality assessment unusually strict. High value cuts both ways: buyers will pay well for clean, correctly described copper, and they will discount hard — or reject outright — anything that doesn't match. For anyone entering the export market, the starting point is the vocabulary of grade families and the logic behind how each is judged.",
      },
      { type: "h2", text: "The standard grade families" },
      {
        type: "p",
        text: "Copper scrap is described worldwide using a set of category names that, as general industry knowledge, break down roughly like this:",
      },
      {
        type: "ul",
        items: [
          "Bare bright — clean, uncoated, unalloyed copper wire of a minimum thickness, bright and free of any corrosion; the highest-value everyday grade.",
          "#1 copper — clean copper solids and heavier wire, unalloyed and uncoated, but allowing some material that wouldn't qualify as bare bright.",
          "#2 copper — copper that is unalloyed but dirtier: soldered, painted, tinned, or lightly oxidised pieces that carry a modest amount of attachment.",
          "Insulated copper wire (ICW) — wire still in its plastic or rubber jacket, traded on recovery yield: the percentage of actual copper inside once stripped.",
          "Copper-bearing alloys — brass and bronze streams, and radiators, which contain copper but as part of an alloy and are graded and priced separately.",
        ],
      },
      {
        type: "p",
        text: "These families are industry-standard categories, described here generically. Real contracts still translate them into a specification, because the tolerances behind each name vary between markets.",
      },
      { type: "h2", text: "How quality is actually assessed" },
      {
        type: "p",
        text: "For copper the central question is always purity — the recoverable copper content — and the two things that erode it: alloying and attachments. Assessment happens on several axes. Copper content is the headline: a grade like #2 is defined by a minimum copper percentage. Coatings and platings such as tin or solder move material down a grade. Oxidation matters, which is why 'bright' is a meaningful word in the grade names. For insulated wire, the yield percentage after stripping is the whole basis of value, and buyers will test-strip a sample to confirm it. Physical form and cleanliness — free of iron attachments, other metals, and non-metallics — round it out.",
      },
      { type: "h2", text: "Contamination limits and what buyers expect" },
      {
        type: "p",
        text: "Because copper is valuable, contamination is scrutinised closely and specified tightly. A copper spec typically states the minimum copper content, maximum permitted attachments (iron, other metals, insulation remnants), limits on oxidation and coating, and for insulated wire an agreed recovery yield with a mechanism for verifying it. International buyers — mills and refiners — generally expect the material to be sorted by grade rather than commingled, verified at origin, and shipped exactly as described. Mixing a lower grade into a higher one is quickly detected and does lasting damage to a supplier relationship in a market where reputation travels.",
      },
      { type: "h2", text: "Export considerations" },
      {
        type: "p",
        text: "Copper's value density changes the risk profile of an export. The paperwork discipline is the same as any metal — a commercial invoice and packing list that agree, a certificate of origin, a bill of lading, a deliberately chosen Incoterm — but the stakes per container are higher, so origin inspection and secure payment instruments matter more, not less. Correct grade sorting before shipment protects the price; verification at loading protects both sides; and matching the description on the invoice to what is actually in the container is, as always, the difference between a repeat customer and a dispute.",
      },
    ],
  },
];
