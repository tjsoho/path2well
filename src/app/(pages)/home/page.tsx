import { HeroSection } from "./sections/Section1-Hero";
import { PromiseSection } from "./sections/Section2-Promise";
import { SupportSection } from "./sections/Section3-Clarity-Confidence-Freedom";
import { WhatWeDo } from "./sections/Section4-about";
import { TargetMarket } from "./sections/Section5-WhoWeHelp";
import { TestimonialsSection } from "./sections/Section6-Testimonials";
import { QuoteSection } from "./sections/Section7-Quote";
import { AboutMe } from "./sections/Section8-AboutUs";
import { DownloadSection } from "./sections/Section9-Download";
import { supabase } from "@/lib/supabase";

// Add type for section content
type SectionContent = Record<string, string>;

// Define specific content types for each section
type HeroContent = { heading: string; subheading: string };
type PromiseContent = { "promise-heading": string; "promise-text": string };
type SupportContent = {
  "clarity-heading": string;
  "confidence-heading": string;
  "freedom-heading": string;
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
  const testimonialsContent = await getSectionContent("Section6-Testimonials");
  const quoteContent = await getSectionContent("Section7-Quote");
  const aboutContent = await getSectionContent("Section8-AboutUs");
  const downloadContent = await getSectionContent("Section9-Download");

  return (
    <main>
      <HeroSection content={heroContent as HeroContent} />
      <PromiseSection content={promiseContent as PromiseContent} />
      <SupportSection content={supportContent as SupportContent} />
      <WhatWeDo content={whatWeDoContent as SectionContent} />
      <TargetMarket content={targetMarketContent as SectionContent} />
      <TestimonialsSection content={testimonialsContent as SectionContent} />
      <QuoteSection content={quoteContent as SectionContent} />
      <AboutMe content={aboutContent as SectionContent} />
      <DownloadSection content={downloadContent as SectionContent} />
    </main>
  );
}
