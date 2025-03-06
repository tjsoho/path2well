interface Section {
  id: string;
  name: string;
}

const HOME_SECTIONS: Section[] = [
  { id: "Section1-Hero", name: "Hero Section" },
  { id: "Section2-Promise", name: "Promise Section" },
  { id: "Section3-Clarity-Confidence-Freedom", name: "Support Section" },
  { id: "Section4-WhatWeDo", name: "What We Do" },
  { id: "Section5-WhoWeHelp", name: "Target Market" },
  { id: "Section6-Testimonials", name: "Testimonials" },
  { id: "Section7-Quote", name: "Quote Section" },
  { id: "Section8-AboutUs", name: "About Me" },
  { id: "Section9-Download", name: "Download Section" }
];

const PAGES = {
  home: HOME_SECTIONS,
  // Add other pages here as needed
};

export function getPageSections(pageId: string): Section[] {
  return PAGES[pageId as keyof typeof PAGES] || [];
} 