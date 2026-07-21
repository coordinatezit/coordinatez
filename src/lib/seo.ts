import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

// Open Graph / Twitter images are supplied automatically by the opengraph-image.tsx
// file convention (see src/app/opengraph-image.tsx) — no image URL needs to be set here.
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations.headquarters.addressLines[0],
      addressLocality: "Chicago",
      addressRegion: "Illinois",
      postalCode: "60606",
      addressCountry: "US",
    },
    department: [
      {
        "@type": "Organization",
        name: siteConfig.divisions.technology.name,
        description: siteConfig.divisions.technology.summary,
        url: `${siteConfig.url}${siteConfig.divisions.technology.href}`,
      },
      {
        "@type": "Organization",
        name: siteConfig.divisions.trade.name,
        description: siteConfig.divisions.trade.summary,
        url: `${siteConfig.url}${siteConfig.divisions.trade.href}`,
      },
    ],
    subOrganization: {
      "@type": "Organization",
      name: siteConfig.technologyBrand.name,
      url: siteConfig.technologyBrand.url,
      description: siteConfig.technologyBrand.relationshipStatement,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mehsana",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.us,
        contactType: "customer service",
        email: siteConfig.email.contact,
        areaServed: ["US", "IN"],
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

/**
 * LocalBusiness schema for the Chicago headquarters only — the location with a
 * legitimate physical presence eligible for a Google Business Profile.
 */
export function localBusinessJsonLd() {
  const hq = siteConfig.locations.headquarters;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone.us,
    email: siteConfig.email.contact,
    address: {
      "@type": "PostalAddress",
      streetAddress: hq.addressLines[0],
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60606",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hq.coordinates.lat,
      longitude: hq.coordinates.lon,
    },
  };
}

export function serviceJsonLd(service: { id: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/technology#${service.id}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function tradeServiceJsonLd(capability: { id: string; title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: capability.title,
    name: capability.title,
    description: capability.description,
    url: `${siteConfig.url}/global-trade#${capability.id}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.divisions.trade.name,
      url: siteConfig.url,
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    about: { "@type": "Organization", name: siteConfig.name },
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email.contact,
      telephone: siteConfig.phone.us,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    url: `${siteConfig.url}${article.path}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${article.path}` },
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  datePosted: string;
  location: string;
  employmentType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: job.location,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
