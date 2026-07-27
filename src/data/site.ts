// Central company constants. Update these values to correct or extend company info —
// every page, schema block, and email template reads from here.
export const siteConfig = {
  name: "Coordinatez",
  // Update with the registered legal entity name once provided.
  legalName: "Coordinatez",
  tagline: "Connecting Technology, Intelligence & Global Commerce",
  description:
    "Coordinatez is a global company headquartered in Chicago that operates two business divisions: Technology & AI Solutions and Global Import & Export. We help businesses build software, integrate AI, and trade across international markets.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coordinatez.com",
  keywords: [
    "Coordinatez",
    "IT services",
    "AI solutions",
    "AI integration",
    "custom software development",
    "business automation",
    "AI agents",
    "data analytics",
    "import export company",
    "international trade",
    "global sourcing",
    "commodity trading",
    "industrial materials",
    "metal trading",
  ],
  email: {
    // Public-facing addresses — update if the mailbox names differ on the coordinatez.com domain.
    contact: "support@coordinatez.com",
    careers: "info@coordinatez.com",
  },
  phone: {
    us: "+1 (872) 258-2235",
    // Placeholder — replace with the real India business line before launch.
    india: "+91 79905 12345",
  },
  divisions: {
    technology: {
      name: "Coordinatez Technology",
      shortName: "Technology & AI",
      href: "/technology",
      tagline: "Technology That Moves Business Forward.",
      summary:
        "IT services and AI solutions — web, mobile, custom software, AI integration, automation, data, and cloud — delivered from our development center in India for clients worldwide.",
    },
    trade: {
      name: "Coordinatez Global Trade",
      shortName: "Global Trade",
      href: "/global-trade",
      tagline: "Connecting Global Markets. Moving Business Forward.",
      summary:
        "International import & export — global sourcing, supplier networks, commodity and industrial-material trading, and logistics coordination between the United States, India, and global markets.",
    },
  },
  // Coorbitz is the dedicated IT Services & AI Solutions brand operating under Coordinatez.
  technologyBrand: {
    name: "Coorbitz",
    url: "https://coorbitz.com",
    relationshipStatement: "Coorbitz is the technology brand of Coordinatez.",
  },
  locations: {
    headquarters: {
      label: "Global Headquarters",
      company: "Coordinatez",
      role: "Corporate, Global Trade & Client Partnerships",
      city: "Chicago, Illinois",
      country: "United States",
      addressLines: ["71 S Wacker Dr, Suite 2400", "Chicago, IL 60606, USA"],
      coordinates: { lat: 41.8781, lon: -87.6298, label: "41.8781° N / 87.6298° W" },
      mapEmbedSrc: "https://www.google.com/maps?q=71+S+Wacker+Dr,+Chicago,+IL+60606&output=embed",
    },
    development: {
      label: "Technology & Development",
      company: "Coorbitz",
      role: "Technology & AI Solutions Division",
      city: "Mehsana, Gujarat",
      country: "India",
      addressLines: ["3rd Floor, Orbit Business Hub", "Mehsana, Gujarat 384002, India"],
      coordinates: { lat: 23.588, lon: 72.3693, label: "23.5880° N / 72.3693° E" },
      mapEmbedSrc: "https://www.google.com/maps?q=Mehsana,+Gujarat,+India&output=embed",
    },
  },
  businessHours: [
    { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM (CT) · 10:00 AM – 6:00 PM (IST)" },
    { days: "Saturday – Sunday", hours: "Closed" },
  ],
  // Add real profile URLs as they are created — the footer only renders entries that exist.
  social: {} as Partial<
    Record<"linkedin" | "twitter" | "facebook" | "instagram" | "github", string>
  >,
} as const;

export type SiteConfig = typeof siteConfig;
