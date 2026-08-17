import { tradePages } from "@/data/trade-pages";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

// The footer capability list is DERIVED from the single source of truth
// (trade-pages.ts) — the same data the home grid and sitemap use — so a
// capability added in one place appears everywhere automatically.
export const footerNav = {
  capabilities: tradePages.map((p) => ({ label: p.navLabel, href: `/${p.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
