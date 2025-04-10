import { HeroSection } from "./sections/HeroSection";
import { JourneySection } from "./sections/Section2-journey";
import { ApproachSection } from "./sections/Section3-approach";
import { TeamSection } from "./sections/Section4-team";
import { PromiseSection } from "./sections/Section5-promise";
import { BeginSection } from "./sections/Section6-begin";
import { supabase } from "@/lib/supabase";

// Add type for section content
type SectionContent = Record<string, string>;

// Define specific content types for each section
type HeroContent = {
  label: string;
  heading: string;
  subheading: string;
};

type JourneyContent = {
  heading: string;
  text: string;
};

type ApproachContent = {
  label: string;
  heading: string;
  text: string;
};

type TeamContent = {
  label: string;
  heading: string;
  subheading: string;
  team: Array<{
    image: string;
    name: string;
    role: string;
  }>;
};

type PromiseContent = {
  label: string;
  heading: string;
  subheading: string;
  cards: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

type BeginContent = {
  heading: string;
  buttonText: string;
};

async function getSectionContent(
  sectionId: string
): Promise<SectionContent | undefined> {
  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_id", "about")
    .eq("section_id", sectionId)
    .single();

  if (error) {
    console.error(`Error fetching content for ${sectionId}:`, error);
    return undefined;
  }

  return data?.content || undefined;
}

export default async function AboutPage() {
  // Fetch content for each section
  const heroContent = await getSectionContent("Section1-Hero");
  const journeyContent = await getSectionContent("Section2-Journey");
  const approachContent = await getSectionContent("Section3-Approach");
  const teamContent = await getSectionContent("Section4-Team");
  const promiseContent = await getSectionContent("Section5-Promise");
  const beginContent = await getSectionContent("Section6-Begin");

  return (
    <main>
      <HeroSection content={heroContent as HeroContent} />
      <JourneySection content={journeyContent as JourneyContent} />
      <ApproachSection content={approachContent as ApproachContent} />
      <TeamSection content={teamContent as TeamContent} />
      <PromiseSection content={promiseContent as PromiseContent} />
      <BeginSection content={beginContent as BeginContent} />
    </main>
  );
}
