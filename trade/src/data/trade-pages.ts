import type { LandingFaq } from "@/data/seo-types";

export type TradeSection = { heading: string; body: string; points?: string[] };

export type TradePage = {
  slug: string; // URL under /[slug] (top-level capability page)
  title: string; // H1
  navLabel: string; // short label for nav/cards
  group: "Metal & Scrap" | "Trade Services";
  metaTitle: string; // <title>, <= ~60 chars, include primary keyword + brand
  metaDescription: string; // <= ~155 chars, compelling, includes location/intent
  keywords: string[]; // 4-6 semantic keyword phrases (NOT stuffed)
  tagline: string; // one sentence under the H1
  intro: string[]; // 2-3 substantial paragraphs of genuinely useful copy
  sections: TradeSection[]; // 3-4 sections; each heading + body paragraph, optional bullet points
  faqs: LandingFaq[]; // 3-4 unique, genuinely useful Q&As (feeds FAQPage schema)
  related: string[]; // 2-3 other TradePage slugs for internal linking
};

export const tradePages: TradePage[] = [
  {
    slug: "scrap-metal-export",
    title: "Scrap Metal Export",
    navLabel: "Scrap Metal Export",
    group: "Metal & Scrap",
    metaTitle: "Scrap Metal Exporter USA | Coordinatez",
    metaDescription:
      "US-based scrap metal exporter connecting American suppliers with international mills and processors. Ferrous and non-ferrous grades, inspected and shipped worldwide.",
    keywords: [
      "scrap metal exporter USA",
      "scrap metal export",
      "US scrap metal exporter",
      "international scrap metal export",
      "scrap metal supplier USA",
    ],
    tagline:
      "A US trading desk moving inspected ferrous and non-ferrous scrap to international buyers.",
    intro: [
      "Scrap metal export is the business of sourcing recyclable metal in one market and delivering it, against an agreed specification, to a buyer in another. From our Chicago base, Coordinatez works with US suppliers of ferrous and non-ferrous scrap and connects them with mills, foundries, smelters, and processors overseas. Our role is to make that cross-border transaction dependable: the material that ships matches what was agreed, the paperwork is clean, and the shipment reaches its destination on schedule.",
      "The value in scrap trading is rarely the metal alone — it is the discipline around it. Grades have to be described honestly, loads have to be inspected before they leave, and documentation has to satisfy customs and the receiving mill on the other side. We treat those steps as the core of the service rather than an afterthought, which is what allows a buyer thousands of miles away to accept a container with confidence.",
      "We operate primarily along a United States-to-international corridor, with India as a home market where we have deep relationships. We do not claim to hold every grade in inventory; instead we source to a buyer's requirement, verify it, and manage the logistics from origin to delivery.",
    ],
    sections: [
      {
        heading: "Grades and Categories We Handle",
        body: "Recyclable metal is broadly split into two families, and we work across both. Ferrous scrap contains iron and is the volume base of the industry; non-ferrous scrap — copper, aluminium, brass, and others — carries higher value per tonne and stricter specification. We source to a buyer's grade requirement rather than pushing a fixed catalogue.",
        points: [
          "Ferrous scrap: shredded, heavy melting steel (HMS), and processed industrial steel",
          "Non-ferrous scrap: copper, aluminium, brass, and mixed metal streams",
          "Mill-ready material as well as scrap requiring further processing",
          "Material matched to the buyer's chemistry and packing requirements",
        ],
      },
      {
        heading: "Quality Inspection and Documentation",
        body: "Most disputes in scrap trading come down to a gap between what was described and what arrived. We close that gap with inspection at origin, clear grade descriptions, and complete trade documentation. Loads are checked before they leave, and the export paperwork is prepared so it clears customs and satisfies the receiving mill without back-and-forth.",
        points: [
          "Grading and inspection coordinated before loading",
          "Commercial invoice, packing list, and shipping documents prepared",
          "Photographs and load records shared where the buyer requires them",
          "Terms and specification confirmed in writing before shipment",
        ],
      },
      {
        heading: "US-to-International Corridors",
        body: "We buy from suppliers in the United States and move material to international destinations, coordinating ocean freight, container booking, and port handoffs on both ends. India is a market we know well, but we handle shipments to wherever a qualified buyer sits. One accountable point of contact stays with the transaction from origin to delivery.",
      },
      {
        heading: "Who We Serve",
        body: "On the buy side we work with US scrap generators, processors, and yards that want reliable offtake and export handling. On the sell side we work with international mills, smelters, foundries, and importers who need consistent, correctly specified supply. We connect the two and take responsibility for the transaction in between.",
      },
    ],
    faqs: [
      {
        question: "What scrap metal grades do you handle?",
        answer:
          "We work across both ferrous and non-ferrous scrap — steel grades such as shredded and heavy melting steel, and non-ferrous streams including copper, aluminium, and brass. Rather than trade from a fixed list, we source to the specific grade and chemistry a buyer requires.",
      },
      {
        question: "How is quality verified before shipment?",
        answer:
          "Material is inspected and graded at origin before loading, and the grade description is confirmed in writing with the buyer. Load records and photographs are shared where required, and full export documentation accompanies the shipment so it clears customs and satisfies the receiving mill.",
      },
      {
        question: "Do you buy scrap, sell scrap, or both?",
        answer:
          "Both. We buy from US suppliers, processors, and yards, and we sell to international mills, smelters, and importers. In most transactions we act as the trading desk connecting a specific supplier with a specific buyer and managing the export in between.",
      },
      {
        question: "Which markets do you ship to?",
        answer:
          "We are US-based and export internationally, with particularly strong relationships in India. We can arrange shipment to any market where there is a qualified buyer and a clear path for documentation and logistics.",
      },
    ],
    related: ["aluminium-scrap", "copper-scrap", "ferrous-non-ferrous"],
  },
  {
    slug: "aluminium-scrap",
    title: "Aluminium Scrap Export",
    navLabel: "Aluminium Scrap",
    group: "Metal & Scrap",
    metaTitle: "Aluminium Scrap Exporter USA | Coordinatez",
    metaDescription:
      "US aluminium (aluminum) scrap exporter. We source, specify, and ship extrusion, sheet, wheel, and mixed aluminium scrap to international smelters and buyers.",
    keywords: [
      "aluminium scrap exporter USA",
      "aluminum scrap export",
      "aluminum scrap supplier",
      "aluminium scrap supplier USA",
      "aluminium scrap export",
    ],
    tagline:
      "Sourcing and shipping specified aluminium scrap from the US to international buyers.",
    intro: [
      "Aluminium scrap — spelled aluminum in American usage — is one of the most widely traded non-ferrous recyclables because it is infinitely recyclable and carries a strong value-to-weight ratio. Coordinatez sources aluminium scrap from US suppliers and exports it to smelters, secondary producers, and industrial buyers internationally, with the specification agreed and verified before any container moves.",
      "Aluminium is unforgiving on specification: alloy content, coatings, and contamination all affect what a smelter can do with a load and what they will pay for it. Our job is to make sure the material that ships is the material that was described, so a buyer can plan their melt with confidence. We frame our service around sourcing, specification, inspection, and logistics rather than holding fixed stock.",
    ],
    sections: [
      {
        heading: "Common Aluminium Scrap Categories",
        body: "The industry classifies aluminium scrap by form and alloy, and these are the general categories buyers typically ask for. We source to whichever category and specification a buyer needs; the list below describes standard industry types, not a claim of current inventory.",
        points: [
          "Extrusions — offcuts and profiles from window, door, and structural stock",
          "Sheet and clippings from fabrication and manufacturing",
          "Aluminium wheels and cast material",
          "Mixed and taint/tabor grades requiring sorting or processing",
        ],
      },
      {
        heading: "Specification and Quality Emphasis",
        body: "Because value and usability hinge on alloy and cleanliness, we treat specification as the heart of an aluminium transaction. The grade, expected alloy family, and acceptable levels of coating or attachment are agreed in writing, and material is inspected at origin against that agreement before it is loaded.",
        points: [
          "Grade and alloy expectation confirmed with the buyer up front",
          "Contamination, coatings, and attachments assessed before loading",
          "Inspection and load records shared where required",
        ],
      },
      {
        heading: "The Export Process",
        body: "Once the specification and price are agreed, we prepare the export documentation, book ocean freight and containers, and coordinate the port handoffs so the shipment moves cleanly from a US origin to an international destination. We stay as a single point of contact through delivery.",
      },
    ],
    faqs: [
      {
        question: "What types of aluminium scrap can you supply?",
        answer:
          "We source across the common industry categories — extrusions, sheet and clippings, wheels and cast, and mixed grades. Rather than sell from a fixed stock list, we source to the specific form and alloy family a buyer specifies.",
      },
      {
        question: "Why does alloy specification matter so much for aluminium?",
        answer:
          "A smelter's melt depends on the alloy content and cleanliness of the scrap. Coatings, attachments, and mixed alloys change what the material can be used for and what it is worth, so agreeing and verifying specification before shipment protects both sides.",
      },
      {
        question: "Is it aluminium or aluminum?",
        answer:
          "They are the same metal — aluminium is the international spelling and aluminum the American one. We use both because our suppliers are in the US and our buyers are international, but the grades and specifications are identical.",
      },
    ],
    related: ["scrap-metal-export", "copper-scrap"],
  },
  {
    slug: "copper-scrap",
    title: "Copper Scrap Export",
    navLabel: "Copper Scrap",
    group: "Metal & Scrap",
    metaTitle: "Copper Scrap Exporter USA | Coordinatez",
    metaDescription:
      "US copper scrap exporter and supplier. We source and ship bare bright, #1 and #2 copper, and insulated copper wire to international buyers against agreed specs.",
    keywords: [
      "copper scrap exporter USA",
      "copper scrap supplier USA",
      "copper scrap export",
      "bare bright copper export",
      "insulated copper wire scrap",
    ],
    tagline:
      "Specified copper scrap sourced in the US and exported to international buyers.",
    intro: [
      "Copper is among the highest-value non-ferrous recyclables, and because of that value its grading is precise and the tolerance for misdescription is low. Coordinatez sources copper scrap from US suppliers and exports it to international smelters, refiners, and industrial buyers, with the grade and condition agreed and verified before shipment.",
      "Copper scrap is bought and sold against well-established grade families that the industry recognises worldwide. Understanding those grades — and describing a load honestly against them — is what keeps a copper transaction clean. We frame our service around sourcing to a buyer's grade, inspecting it, and handling the export, rather than around holding fixed inventory.",
    ],
    sections: [
      {
        heading: "Standard Copper Scrap Grade Families",
        body: "Copper scrap is commonly categorized into recognised grade families based on purity, condition, and coating. These are industry-standard descriptions used across the trade; we source to whichever grade a buyer requires rather than trading from set stock.",
        points: [
          "Bare bright — clean, uncoated bright copper wire, the highest grade",
          "#1 copper — clean copper tube, wire, and bus bar free of coating and solder",
          "#2 copper — copper with some coating, solder, or light attachments",
          "Insulated copper wire (ICW) — priced on recoverable copper content",
        ],
      },
      {
        heading: "Quality and Inspection",
        body: "Because copper's value moves sharply with grade, we confirm the grade family and expected recovery in writing and inspect the material at origin before loading. Insulated wire in particular is assessed on its recoverable copper content, and that expectation is agreed with the buyer up front to avoid disputes on arrival.",
        points: [
          "Grade family and condition confirmed before shipment",
          "Recoverable content assessed for insulated wire grades",
          "Inspection and load records shared where the buyer requires",
        ],
      },
      {
        heading: "Export Handling",
        body: "With grade and price agreed, we prepare the export documentation, arrange freight and container booking, and coordinate the port handoffs from a US origin to the international destination. A single point of contact stays with the transaction through to delivery.",
      },
    ],
    faqs: [
      {
        question: "What copper scrap grades do you deal in?",
        answer:
          "We work across the standard grade families the industry recognises — bare bright, #1 and #2 copper, and insulated copper wire. We source to the specific grade a buyer needs rather than selling from a fixed stock list.",
      },
      {
        question: "How is insulated copper wire priced?",
        answer:
          "Insulated copper wire is valued on its recoverable copper content rather than gross weight, since the insulation is stripped out. We agree the expected recovery with the buyer before shipment so pricing is clear on both sides.",
      },
      {
        question: "How do you prevent grade disputes on copper shipments?",
        answer:
          "We confirm the grade family and condition in writing before loading and inspect the material at origin. Load records are shared where required, so the copper that arrives matches what was agreed and paid for.",
      },
    ],
    related: ["scrap-metal-export", "aluminium-scrap"],
  },
  {
    slug: "ferrous-non-ferrous",
    title: "Ferrous & Non-Ferrous Scrap",
    navLabel: "Ferrous & Non-Ferrous",
    group: "Metal & Scrap",
    metaTitle: "Ferrous & Non-Ferrous Scrap Exporter USA | Coordinatez",
    metaDescription:
      "US exporter of ferrous and non-ferrous scrap. Understand the difference, the grades, and how industrial scrap moves from American suppliers to global buyers.",
    keywords: [
      "ferrous scrap exporter USA",
      "non-ferrous metal exporter USA",
      "industrial scrap exporter USA",
      "ferrous and non-ferrous scrap",
      "industrial metal scrap export",
    ],
    tagline:
      "One desk for both scrap families — ferrous by volume, non-ferrous by value.",
    intro: [
      "Almost all recyclable metal falls into one of two families, and the distinction shapes how it is priced, handled, and sold. Ferrous scrap contains iron and is magnetic; non-ferrous scrap does not contain iron and includes copper, aluminium, brass, lead, and more. Coordinatez trades and exports both from the United States, matching the right buyer to each stream.",
      "The two families behave very differently in a trade. Ferrous scrap moves in high volume at lower value per tonne and feeds steel mills; non-ferrous scrap moves in smaller quantities at much higher value and feeds smelters and refiners. Knowing which buyer wants which material — and how each expects it graded and documented — is central to what we do.",
    ],
    sections: [
      {
        heading: "Ferrous vs Non-Ferrous: The Practical Difference",
        body: "The simplest test is a magnet: ferrous metal is attracted to it, non-ferrous is not. But the practical difference for trading is value density and destination. The distinction below explains how each family behaves in an export transaction.",
        points: [
          "Ferrous — iron-bearing, magnetic; high volume, lower per-tonne value; feeds steel mills",
          "Non-ferrous — copper, aluminium, brass, lead; lower volume, higher value; feeds smelters and refiners",
          "Non-ferrous grades demand tighter specification and inspection",
          "Ferrous loads are managed for volume, packing, and consistent grade",
        ],
      },
      {
        heading: "Industrial Scrap",
        body: "A large share of traded scrap originates as industrial by-product — offcuts, turnings, obsolete equipment, and process residues from manufacturing and construction. This material is often well-characterised and consistent, which makes it attractive to mills and smelters. We help US industrial generators find export buyers and handle the transaction end to end.",
      },
      {
        heading: "Who Buys What",
        body: "Ferrous scrap goes to steel mills and foundries that need iron units for their furnaces. Non-ferrous scrap goes to smelters, refiners, and secondary producers that recover and re-alloy specific metals. We maintain relationships across both buyer types and match each stream to a counterparty that can use it, then coordinate inspection, documentation, and shipping.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between ferrous and non-ferrous scrap?",
        answer:
          "Ferrous scrap contains iron and is magnetic; non-ferrous scrap does not contain iron and includes metals like copper, aluminium, and brass. Ferrous moves in high volume at lower value and feeds steel mills, while non-ferrous moves in smaller quantities at higher value and feeds smelters.",
      },
      {
        question: "Do you handle industrial scrap from manufacturers?",
        answer:
          "Yes. Industrial by-product — offcuts, turnings, obsolete equipment, and process residues — is a core part of the trade. We help US industrial generators find qualified export buyers and manage inspection, documentation, and shipping through to delivery.",
      },
      {
        question: "Can you handle both families in one relationship?",
        answer:
          "Yes. We maintain buyer relationships across both steel mills and non-ferrous smelters and refiners, so a supplier with mixed streams can work with a single desk rather than splitting the material across multiple traders.",
      },
    ],
    related: ["scrap-metal-export", "metal-trading"],
  },
  {
    slug: "metal-trading",
    title: "Metal Trading",
    navLabel: "Metal Trading",
    group: "Trade Services",
    metaTitle: "Metal Trading Company USA | Coordinatez",
    metaDescription:
      "US metal trading company connecting buyers and sellers of primary and secondary metals. Contracts, Incoterms, market intelligence, and international delivery.",
    keywords: [
      "metal trading company USA",
      "metal exporter USA",
      "metal supplier USA",
      "international metal trading",
      "physical metal trading",
    ],
    tagline:
      "A physical metal trading desk connecting buyers and sellers across international markets.",
    intro: [
      "Metal trading, in the physical sense, is the business of matching a party who has metal with a party who needs it, and standing behind the contract that moves it between them. Coordinatez operates as a physical metal trading desk from Chicago, dealing in both primary metals — freshly produced material — and secondary metals recovered from scrap, and connecting suppliers with industrial buyers internationally.",
      "A trader earns their place by reducing risk and friction for both sides: finding the right counterparty, agreeing terms that are clear and enforceable, choosing Incoterms that fairly allocate cost and responsibility, and reading the market well enough to price a deal that actually closes. We bring that discipline to every transaction rather than simply passing along an offer.",
    ],
    sections: [
      {
        heading: "Physical Trading: Primary and Secondary Metals",
        body: "We trade physical metal that has to be produced, moved, and delivered — not paper contracts. That spans primary metals from producers and secondary metals recovered through recycling. In each case we take the transaction from offer to delivery, coordinating quality, logistics, and payment along the way.",
        points: [
          "Primary metals sourced from producers",
          "Secondary metals recovered from scrap streams",
          "Spot and contract-based transactions",
          "Quality inspection coordinated before shipment",
        ],
      },
      {
        heading: "Buyer and Seller Matching",
        body: "The core of trading is connecting the right two parties. We maintain relationships with suppliers and industrial buyers across the markets where we operate, and we match a specific requirement to a specific counterparty who can meet it on specification, quantity, and timing — then vet both sides before committing.",
      },
      {
        heading: "Contracts and Incoterms",
        body: "Every deal rests on a clear contract, and Incoterms are the shorthand that defines who is responsible for cost, risk, and logistics at each stage of shipment. We agree terms in writing and select the Incoterm that fits the transaction, so both parties know exactly where responsibility passes from seller to buyer.",
        points: [
          "Written contracts covering grade, quantity, packing, and delivery",
          "Incoterms selected to fairly allocate cost and risk",
          "Payment and letter-of-credit workflows coordinated",
        ],
      },
      {
        heading: "Price and Market Intelligence",
        body: "Metal prices move with global supply, demand, and currency, and a deal priced against stale information does not close. We track the reference markets relevant to the metals we trade and use that intelligence to price offers realistically and advise counterparties on timing.",
      },
    ],
    faqs: [
      {
        question: "Do you trade physical metal or financial contracts?",
        answer:
          "Physical metal only. We deal in material that has to be produced, inspected, shipped, and delivered — both primary metals from producers and secondary metals recovered from scrap. We are not a financial or futures trader.",
      },
      {
        question: "What are Incoterms and which do you trade on?",
        answer:
          "Incoterms are internationally recognised rules that define who bears cost, risk, and responsibility at each stage of a shipment. We agree the specific Incoterm in writing for each deal and select the one that fairly fits the transaction, so responsibility passing from seller to buyer is never ambiguous.",
      },
      {
        question: "Do you buy or sell metal?",
        answer:
          "Both, depending on the transaction. As a trading desk we connect a supplier with a buyer and stand behind the contract in between — sometimes buying to fill a buyer's requirement, sometimes finding a buyer for a supplier's material.",
      },
    ],
    related: ["scrap-metal-export", "import-export"],
  },
  {
    slug: "import-export",
    title: "Import & Export Services",
    navLabel: "Import & Export",
    group: "Trade Services",
    metaTitle: "Import Export Company USA | Coordinatez",
    metaDescription:
      "US import export company handling end-to-end international trade: sourcing, documentation, customs coordination, and logistics across the US-India corridor and beyond.",
    keywords: [
      "import export company USA",
      "international trade services",
      "global sourcing",
      "US India trade corridor",
      "import export services USA",
    ],
    tagline:
      "End-to-end import and export operations between the US, India, and global markets.",
    intro: [
      "Import and export services cover everything that has to happen for goods to cross a border cleanly — from finding the right supplier or buyer to clearing customs and delivering to the door. Coordinatez runs these operations from Chicago, with a home market in India, handling the transaction end to end so businesses can trade internationally without building the machinery themselves.",
      "The difficulty in international trade is rarely the goods; it is the coordination. Documentation has to be exact, customs requirements differ by country, payment has to be secured, and freight has to be booked and tracked across multiple parties. We act as the single accountable point that holds all of it together, so a shipment does not stall on a missing certificate or a mismatched invoice.",
    ],
    sections: [
      {
        heading: "End-to-End Trade Operations",
        body: "We manage the full arc of an import or export transaction rather than one slice of it. That means sourcing or placing the goods, agreeing terms, preparing documentation, coordinating customs and logistics, and following the shipment through to delivery — one relationship instead of a chain of disconnected vendors.",
        points: [
          "Global sourcing and buyer/supplier introductions",
          "Contract and Incoterms guidance",
          "Payment and letter-of-credit coordination",
          "Shipment tracking and exception handling",
        ],
      },
      {
        heading: "Documentation and Customs Coordination",
        body: "Clean paperwork is what keeps a shipment moving. We prepare and check the commercial documents an international transaction needs and coordinate customs requirements on both sides of the border, so goods clear without avoidable delay. We coordinate with brokers and authorities rather than acting as a licensed customs broker ourselves.",
        points: [
          "Commercial invoices, packing lists, and shipping documents",
          "Coordination with customs brokers and authorities",
          "Country-specific documentation requirements",
        ],
      },
      {
        heading: "Logistics",
        body: "We coordinate freight forwarders, carriers, and ports on both ends of a shipment — ocean and inland freight, container booking and consolidation, and the handoffs between them — with status reporting through transit so there are no silent gaps between origin and delivery.",
      },
      {
        heading: "The US-India Corridor",
        body: "The United States-to-India lane is our home corridor, backed by relationships and on-the-ground presence in both countries. We know the documentation, the ports, and the counterparties on that route well, and we extend the same end-to-end handling to other international markets where a transaction takes us.",
      },
    ],
    faqs: [
      {
        question: "What does an import export company actually do?",
        answer:
          "We manage the full transaction of moving goods across borders — sourcing or placing the goods, agreeing terms, preparing and checking documentation, coordinating customs and freight, and following the shipment to delivery. The goal is to be a single accountable point rather than a chain of disconnected vendors.",
      },
      {
        question: "Do you handle customs clearance yourselves?",
        answer:
          "We prepare and check the required trade documentation and coordinate closely with customs brokers and authorities on both sides of a shipment. We are not a licensed customs broker ourselves, but we manage the process so clearance is not held up by paperwork.",
      },
      {
        question: "Which trade lanes do you focus on?",
        answer:
          "Our home corridor is the United States and India, where we have relationships and presence on both ends. We handle shipments to and from other international markets as well, applying the same end-to-end documentation and logistics coordination.",
      },
    ],
    related: ["metal-trading", "scrap-metal-export"],
  },
];

export function getTradePageBySlug(slug: string): TradePage | undefined {
  return tradePages.find((p) => p.slug === slug);
}
