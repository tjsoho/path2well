

interface Section {
  id: string;
  name: string;
  content?: string;  // Optional since it might need to be fetched separately
}

const HOME_SECTIONS: Section[] = [
  { id: "Section1-Hero", name: "Hero Section" },
  { id: "Section2-Promise", name: "Promise Section" },
  { id: "Section3-Clarity-Confidence-Freedom", name: "Support Section" },
  { id: "Section4-WhatWeDo", name: "What We Do" },
  { id: "Section5-WhoWeHelp", name: "Who We Help" },
  { id: "Section6-Download", name: "Download" },
  { id: "Section7-Services", name: "Services" },
];

const PAGES = {
  home: HOME_SECTIONS,
  // Add other pages here as needed
};

export function getPageSections(pageId: string): Section[] {
  return PAGES[pageId as keyof typeof PAGES] || [];
} 