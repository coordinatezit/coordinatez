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
    { label: "AI Integration", href: "/technology/ai-integration" },
    { label: "AI Agents", href: "/technology/ai-agents" },
    { label: "AI Chatbots", href: "/technology/ai-chatbots" },
    { label: "Custom Software", href: "/technology/custom-software" },
    { label: "Web Development", href: "/technology/web-development" },
    { label: "Mobile App Development", href: "/technology/mobile-applications" },
    { label: "Business Automation", href: "/technology/business-automation" },
    { label: "Data Analytics", href: "/technology/data-analytics" },
  ],
  globalTrade: [
    { label: "Scrap Metal Export", href: "/global-trade/scrap-metal-export" },
    { label: "Aluminium Scrap Export", href: "/global-trade/aluminium-scrap" },
    { label: "Copper Scrap Export", href: "/global-trade/copper-scrap" },
    { label: "Ferrous & Non-Ferrous Scrap", href: "/global-trade/ferrous-non-ferrous" },
    { label: "Metal Trading", href: "/global-trade/metal-trading" },
    { label: "Import & Export", href: "/global-trade/import-export" },
  ],
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
