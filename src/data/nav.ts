import { services } from "@/data/services";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Technology & AI", href: "/technology" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

// The footer service list is DERIVED from the single source of truth (services.ts)
// — the same data the /technology hub and sitemap use — so a service added in one
// place appears everywhere automatically.
export const footerNav = {
  technology: services.map((s) => ({ label: s.navLabel, href: `/technology/${s.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Global Presence", href: "/global-presence" },
    { label: "Chicago", href: "/locations/chicago" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
