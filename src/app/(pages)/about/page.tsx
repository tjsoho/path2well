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

  // Default content for each section
  const defaultHeroContent: HeroContent = {
    label: "ABOUT US",
    heading: "ABOUT PATH2WELL:\nYOUR JOURNEY TO\nOPTIMAL WELLNESS\nBEGINS HERE.",
    subheading: "Discover the story behind our personalised approach to health\nand wellness."
  };

  const defaultJourneyContent: JourneyContent = {
    heading: "Our Journey",
    text: "Path2Well was founded with a simple mission: to empower individuals to take control of their health through personalized, science-backed solutions."
  };

  const defaultApproachContent: ApproachContent = {
    label: "OUR APPROACH",
    heading: "Our Holistic Approach",
    text: "We believe in addressing the whole person, not just symptoms. Our approach combines cutting-edge genetic testing with bespoke IV therapy to create a wellness plan uniquely tailored to your needs."
  };

  const defaultTeamContent: TeamContent = {
    label: "TEAM",
    heading: "Meet the Path2Well Team",
    subheading: "Allow for now 3 team members with an image, name and brief bio. Make these cards that can grow in rows and columns as the business grows.",
    team: [
      {
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2940&auto=format&fit=crop",
        name: "Cameroon Williamson",
        role: "Chief Executive Officer and Co-Founder"
      },
      {
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop",
        name: "Cameroon Williamson",
        role: "Chief Executive Officer and Co-Founder"
      },
      {
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2938&auto=format&fit=crop",
        name: "Cameroon Williamson",
        role: "Chief Executive Officer and Co-Founder"
      }
    ]
  };

  const defaultPromiseContent: PromiseContent = {
    label: "OUR COMMITMENT",
    heading: "Our Promise to You",
    subheading: "Our promise is simple: to provide the highest quality, most personalised care. Everything we do at Path2Well reflects our dedication to these core principles:",
    cards: [
      {
        title: "Holistic Wellness",
        description: "A commitment to addressing the whole person, not just a single condition or symptom. This means integrating various approaches and collaborating with other healthcare providers.",
        icon: "/images/icon2.png"
      },
      {
        title: "Scientific Evidence",
        description: "Using evidence-based methods, including genetic and blood testing, to guide our approach. This demonstrates a commitment to using cutting-edge science for accurate diagnoses.",
        icon: "/images/icon2.png"
      },
      {
        title: "Long-Term Health Solutions",
        description: "Focusing on sustainable, long-term wellness rather than quick fixes. This means developing strategies that can be build lasting, positive health habits.",
        icon: "/images/icon2.png"
      },
      {
        title: "Empowerment",
        description: "Equipping clients with the knowledge and tools to take control of their health journey. We believe in educating and empowering clients to actively participate in their own wellness.",
        icon: "/images/icon2.png"
      }
    ]
  };

  const defaultBeginContent: BeginContent = {
    heading: "Begin Your Journey",
    buttonText: "Get Started"
  };

  return (
    <main>
      <HeroSection content={heroContent ? { ...defaultHeroContent, ...heroContent } as HeroContent : defaultHeroContent} />
      <JourneySection content={journeyContent ? { ...defaultJourneyContent, ...journeyContent } as JourneyContent : defaultJourneyContent} />
      <ApproachSection content={approachContent ? { ...defaultApproachContent, ...approachContent } as ApproachContent : defaultApproachContent} />
      <TeamSection content={teamContent ? { ...defaultTeamContent, ...teamContent } as TeamContent : defaultTeamContent} />
      <PromiseSection content={promiseContent ? { ...defaultPromiseContent, ...promiseContent } as PromiseContent : defaultPromiseContent} />
      <BeginSection content={beginContent ? { ...defaultBeginContent, ...beginContent } as BeginContent : defaultBeginContent} />
    </main>
  );
}
