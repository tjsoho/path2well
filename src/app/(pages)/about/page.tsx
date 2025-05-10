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

export default function AboutPage() {
  const [heroContent, setHeroContent] = useState<SectionContent>({});
  const [journeyContent, setJourneyContent] = useState<SectionContent>({});
  const [approachContent, setApproachContent] = useState<SectionContent>({});
  const [teamContent, setTeamContent] = useState<SectionContent>({});
  const [promiseContent, setPromiseContent] = useState<SectionContent>({});
  const [beginContent, setBeginContent] = useState<SectionContent>({});
  const isEditing = false;

  useEffect(() => {
    async function fetchAll() {
      setHeroContent((await getSectionContent('Section1-Hero-About')) || {});
      setJourneyContent((await getSectionContent('Section2-Journey-About')) || {});
      setApproachContent((await getSectionContent('Section3-Approach-About')) || {});
      setTeamContent((await getSectionContent('Section4-Team-About')) || {});
      setPromiseContent((await getSectionContent('Section5-Promise-About')) || {});
      setBeginContent((await getSectionContent('Section6-Begin-About')) || {});
    }
    fetchAll();
  }, []);

  const handleUpdate = async (sectionId: string, field: string, value: string) => {
    try {
      // Fetch current content for the section
      const currentContent =
        (await getSectionContent(sectionId)) || {};
      const newContent = { ...currentContent, [field]: value };
      const { error } = await supabase
        .from('page_content')
        .upsert({
          page_id: 'about',
          section_id: sectionId,
          content: newContent
        });
      if (error) throw error;
      // Update local state for the correct section
      switch (sectionId) {
        case 'Section1-Hero-About':
          setHeroContent(newContent);
          break;
        case 'Section2-Journey-About':
          setJourneyContent(newContent);
          break;
        case 'Section3-Approach-About':
          setApproachContent(newContent);
          break;
        case 'Section4-Team-About':
          setTeamContent(newContent);
          break;
        case 'Section5-Promise-About':
          setPromiseContent(newContent);
          break;
        case 'Section6-Begin-About':
          setBeginContent(newContent);
          break;
      }
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

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
