export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Technology & AI", href: "/technology" },
  { label: "Global Trade", href: "/global-trade" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export const footerNav = {
  technology: [
    { label: "Web Development", href: "/technology#web-development" },
    { label: "Custom Software", href: "/technology#custom-software" },
    { label: "AI Integration", href: "/technology#ai-integration" },
    { label: "AI Agents", href: "/technology#ai-agents" },
    { label: "Business Automation", href: "/technology#business-automation" },
    { label: "Data Analytics", href: "/technology#data-analytics" },
    { label: "Cloud Solutions", href: "/technology#cloud-solutions" },
  ],
  globalTrade: [
    { label: "Global Sourcing", href: "/global-trade#global-sourcing" },
    { label: "Import & Export", href: "/global-trade#import-export" },
    { label: "Commodity Trading", href: "/global-trade#commodity-trading" },
    { label: "Industrial Materials", href: "/global-trade#industrial-materials" },
    { label: "Metal & Scrap Trading", href: "/global-trade#metal-scrap" },
    { label: "Logistics Coordination", href: "/global-trade#logistics" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Global Presence", href: "/global-presence" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
