"use client";

import { HeroSection } from "./sections/HeroSection";
import { JourneySection } from "./sections/Section2-journey";
import { ApproachSection } from "./sections/Section3-approach";
import { TeamSection } from "./sections/Section4-team";
import { PromiseSection } from "./sections/Section5-promise";
import { BeginSection } from "./sections/Section6-begin";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

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
  console.log(`Fetching content for section: ${sectionId}`);
  const { data, error } = await supabase
    .from("page_content")
    .select("content, section_id")
    .eq("page_id", "about")
    .eq("section_id", sectionId)
    .single();

  if (error) {
    console.error(`Error fetching content for ${sectionId}:`, error);
    return undefined;
  }

  console.log(`Content fetched for ${sectionId}:`, data?.content);
  console.log(`Section ID in database: ${data?.section_id}`);
  return data?.content || undefined;
}

async function getAllPageContent(): Promise<Record<string, SectionContent>> {
  console.log("Fetching all content for About page");
  const { data, error } = await supabase
    .from("page_content")
    .select("section_id, content")
    .eq("page_id", "about");

  if (error) {
    console.error("Error fetching all content:", error);
    return {};
  }

  console.log("All content fetched:", data);

  // Convert array to object with section_id as key
  const contentMap: Record<string, SectionContent> = {};
  data?.forEach(item => {
    contentMap[item.section_id] = item.content;
  });

  console.log("Content map:", contentMap);
  return contentMap;
}

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
  heading: "Meet Our Team",
  subheading: "Expert Healthcare Professionals",
  team: JSON.stringify([
    {
      image: "/images/placeholder-profile.jpg",
      name: "Dr. Sarah Mitchell",
      role: "Medical Director"
    },
    {
      image: "/images/placeholder-profile.jpg",
      name: "Dr. James Wilson",
      role: "Genetic Testing Specialist"
    },
    {
      image: "/images/placeholder-profile.jpg",
      name: "Dr. Emily Chen",
      role: "IV Therapy Expert"
    }
  ])
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

export default function AboutPage() {
  const [allContent, setAllContent] = useState<Record<string, any>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getAllPageContent();
      console.log("Fetched all content:", content);
      setAllContent(content);
    };
    fetchContent();
  }, []);

  const handleUpdate = async (sectionId: string, field: string, value: string) => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .upsert({
          page_id: 'about',
          section_id: sectionId,
          content: { [field]: value }
        });

      if (error) throw error;

      // Update local state
      setAllContent(prev => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          [field]: value
        }
      }));
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  // Get content for each section
  const heroContent = allContent['Section1-Hero-About'] || defaultHeroContent;
  const journeyContent = allContent['Section2-Journey-About'] || defaultJourneyContent;
  const approachContent = allContent['Section3-Approach-About'] || defaultApproachContent;
  const teamContent = allContent['Section4-Team-About'] || defaultTeamContent;
  const promiseContent = allContent['Section5-Promise-About'] || defaultPromiseContent;
  const beginContent = allContent['Section6-Begin-About'] || defaultBeginContent;

  console.log("Team content:", teamContent);

  return (
    <main>
      <HeroSection
        isEditing={isEditing}
        content={heroContent}
        onUpdate={(field, value) => handleUpdate('Section1-Hero-About', field, value)}
      />
      <JourneySection
        isEditing={isEditing}
        content={journeyContent}
        onUpdate={(field, value) => handleUpdate('Section2-Journey-About', field, value)}
      />
      <ApproachSection
        isEditing={isEditing}
        content={approachContent}
        onUpdate={(field, value) => handleUpdate('Section3-Approach-About', field, value)}
      />
      <TeamSection
        isEditing={isEditing}
        content={teamContent}
        onUpdate={(field, value) => handleUpdate('Section4-Team-About', field, value)}
      />
      <PromiseSection
        isEditing={isEditing}
        content={promiseContent}
        onUpdate={(field, value) => handleUpdate('Section5-Promise-About', field, value)}
      />
      <BeginSection
        isEditing={isEditing}
        content={beginContent}
        onUpdate={(field, value) => handleUpdate('Section6-Begin-About', field, value)}
      />
    </main>
  );
}
