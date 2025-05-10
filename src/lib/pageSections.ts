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

const ABOUT_SECTIONS: Section[] = [
  { id: "Section1-Hero-About", name: "Hero Section" },
  { id: "Section2-Journey", name: "Journey Section" },
  { id: "Section3-Approach", name: "Approach Section" },
  { id: "Section4-Team", name: "Team Section" },
  { id: "Section5-Promise-About", name: "Promise Section" },
  { id: "Section6-Begin", name: "Begin Section" },
];

const SERVICES_SECTIONS: Section[] = [
  { id: "HeroSection", name: "Hero Section" },
  { id: "Section6-begin", name: "Begin Section" },
  { id: "ServiceDetailsSection", name: "Service Details Section" },
];

const PAGES = {
  home: HOME_SECTIONS,
  about: ABOUT_SECTIONS,
  services: SERVICES_SECTIONS,
  // Add other pages here as needed
};

export function getPageSections(pageId: string): Section[] {
  return PAGES[pageId as keyof typeof PAGES] || [];
} 