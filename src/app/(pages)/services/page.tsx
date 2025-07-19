import ServicesPage from './ServicesPage';
import { supabase } from "@/lib/supabase";

async function getSectionContent(sectionId: string) {
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

export default async function ServicesPageWrapper() {
  const heroContent = await getSectionContent("HeroSection");
  const serviceDetailsContent = await getSectionContent("ServiceDetailsSection");
  const beginContent = await getSectionContent("Section6-begin");

  return (
    <ServicesPage
      heroContent={heroContent}
      serviceDetailsContent={serviceDetailsContent}
      beginContent={beginContent}
    />
  );
} 