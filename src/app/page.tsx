import { HeroSection } from "./sections/Section1-Hero";
import { PromiseSection } from "./sections/Section2-Promise";
import { SupportSection } from "./sections/Section3-Clarity-Confidence-Freedom";
import { WhatWeDo } from "./sections/Section4-about";
import { Testimonials } from "./sections/Section5-WhoWeHelp";

import { supabase } from "@/lib/supabase";
import { DownloadSection } from "./sections/Section6-Download";
import { ServicesSection } from "./sections/Section7-Services";
import { PointerEffect } from "@/components/ui/PointerEffect";

// Add type for section content
type SectionContent = Record<string, string>;

// Define specific content types for each section
type HeroContent = { heading: string; subheading: string };
type PromiseContent = { "promise-heading": string; "promise-text": string };
type SupportContent = {
  "clarity-heading": string;
  "clarity-text": string;
  "confidence-heading": string;
  "confidence-text": string;
  "freedom-heading": string;
  "freedom-text": string;
  "section3-title": string;
  "section3-description": string;
  "clarity-lab-image"?: string;
  "clarity-bikes-image"?: string;
  "clarity-doctor-image"?: string;
};
type WhatWeDoContent = { "about-text": string };
type DownloadContent = {
  heading: string;
  subheading: string;
  benefits: Array<{ title: string; description: string; }>;
};
type ServicesContent = {
  heading: string;
  subheading: string;
};

async function getSectionContent(
  sectionId: string
): Promise<SectionContent | undefined> {
  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_id", "home")
    .eq("section_id", sectionId)
    .single();
  
  if (error) {
    console.error(`Error fetching content for ${sectionId}:`, error);
    return undefined;
  }

  return data?.content || undefined;
}

export default async function HomePage() {
  // Fetch content for each section
  const heroContent = await getSectionContent("Section1-Hero");
  const promiseContent = await getSectionContent("Section2-Promise");
  const supportContent = await getSectionContent(
    "Section3-Clarity-Confidence-Freedom"
  );
  const whatWeDoContent = await getSectionContent("Section4-WhatWeDo");
  const targetMarketContent = await getSectionContent("Section5-WhoWeHelp");
  const downloadContent = await getSectionContent("Section6-Download");
  const servicesContent = await getSectionContent("Section7-Services");

  return (
    <main>
      <PointerEffect />
      <HeroSection content={heroContent as HeroContent} />
      <PromiseSection content={promiseContent as PromiseContent} />
      <SupportSection content={supportContent as SupportContent} />
      <WhatWeDo content={whatWeDoContent as WhatWeDoContent} />
      <Testimonials content={targetMarketContent as SectionContent} />
      <DownloadSection content={downloadContent as unknown as DownloadContent} />
      <ServicesSection content={servicesContent as ServicesContent} />
    </main>
  );
}
