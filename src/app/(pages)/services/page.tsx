import { HeroSection } from "./sections/HeroSection";
import { BeginSection } from "./sections/Section6-begin";
import { ServiceDetailsSection } from "./sections/ServiceDetailsSection";
import { supabase } from "@/lib/supabase";

// Define the correct types for each section
interface ServiceCard {
  image: string;
  title: string;
  description: string;
  disclaimer?: string;
}
interface ServicesContent {
  label: string;
  heading: string;
  heroHeading: string;
  heroSubheading: string;
  cards: ServiceCard[];
  ctaText: string;
  ctaLink: string;
}
interface ServiceDetail {
  title: string;
  subtitle: string;
  price: string;
  whatsIncluded: string[];
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  disclaimer?: string;
}
interface ServiceDetailsContent {
  label: string;
  heading: string;
  services: ServiceDetail[];
}
interface BeginContent {
  heading: string;
  subheading: string;
  buttonText: string;
}

type SectionContent = Record<string, unknown>;

async function getSectionContent(
  sectionId: string
): Promise<SectionContent | undefined> {
  const { data, error } = await supabase
    .from("page_content")
    .select("content")
    .eq("page_id", "services")
    .eq("section_id", sectionId)
    .single();
  if (error) {
    console.error(`Error fetching content for ${sectionId}:`, error);
    return undefined;
  }
  return data?.content || undefined;
}

export default async function ServicesPage() {
  // Fetch content for each section server-side
  const heroContent = await getSectionContent("HeroSection");
  const serviceDetailsContent = await getSectionContent("ServiceDetailsSection");
  const beginContent = await getSectionContent("Section6-begin");

  return (
    <main>
      <HeroSection content={heroContent as unknown as ServicesContent} />
      <ServiceDetailsSection content={serviceDetailsContent as unknown as ServiceDetailsContent} />
      <BeginSection content={beginContent as unknown as BeginContent} />
    </main>
  );
} 