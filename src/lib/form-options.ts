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

// Business-interest routing for the contact form — technology inquiries plus
// general/partnership/career inquiries. (Trade inquiries are handled by the
// separate Global Trade division at trade.coordinatez.com.)
export const inquiryInterestOptions = [
  "Technology & AI",
  "General Inquiry",
  "Partnership",
  "Career",
] as const;

export type InquiryInterest = (typeof inquiryInterestOptions)[number];
