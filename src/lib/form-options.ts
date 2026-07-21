export const countryOptions = [
  "United States",
  "India",
  "Canada",
  "United Kingdom",
  "United Arab Emirates",
  "Germany",
  "Netherlands",
  "Singapore",
  "Australia",
  "Other",
];

// Business-interest routing for the contact form — mirrors the two divisions
// plus general/partnership/career inquiries.
export const inquiryInterestOptions = [
  "Technology & AI",
  "Global Trade",
  "General Inquiry",
  "Partnership",
  "Career",
] as const;

export type InquiryInterest = (typeof inquiryInterestOptions)[number];
