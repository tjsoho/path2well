import { getPageSections } from "@/lib/pageSections";
import { SectionContents, TestimonialsContent } from "../../../types/pageEditor";
import { DEFAULT_CONTENT } from "@/lib/defaultContent";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamic Section Imports
const sections = {
    // Home Page Sections
    "Section1-Hero": dynamic(() => import("@/app/(pages)/home/sections/Section1-Hero").then(mod => mod.HeroSection)),
    "Section2-Promise": dynamic(() => import("@/app/(pages)/home/sections/Section2-Promise").then(mod => mod.PromiseSection)),
    "Section3-Clarity-Confidence-Freedom": dynamic(() => import("@/app/(pages)/home/sections/Section3-Clarity-Confidence-Freedom").then(mod => mod.SupportSection)),
    "Section4-WhatWeDo": dynamic(() => import("@/app/(pages)/home/sections/Section4-about").then(mod => mod.WhatWeDo)),
    "Section5-WhoWeHelp": dynamic(() => import("@/app/(pages)/home/sections/Section5-WhoWeHelp").then(mod => mod.Testimonials)),
    "Section6-Download": dynamic(() => import("@/app/(pages)/home/sections/Section6-Download").then(mod => mod.DownloadSection)),
    "Section7-Services": dynamic(() => import("@/app/(pages)/home/sections/Section7-Services").then(mod => mod.ServicesSection)),

    // About Page Sections
    "Section1-Hero-About": dynamic(() => import("@/app/(pages)/about/sections/HeroSection").then(mod => mod.HeroSection)),
    "Section2-Journey": dynamic(() => import("@/app/(pages)/about/sections/Section2-journey").then(mod => mod.JourneySection)),
    "Section3-Approach": dynamic(() => import("@/app/(pages)/about/sections/Section3-approach").then(mod => mod.ApproachSection)),
    "Section4-Team": dynamic(() => import("@/app/(pages)/about/sections/Section4-team").then(mod => mod.TeamSection)),
    "Section5-Promise-About": dynamic(() => import("@/app/(pages)/about/sections/Section5-promise").then(mod => mod.PromiseSection)),
    "Section6-Begin": dynamic(() => import("@/app/(pages)/about/sections/Section6-begin").then(mod => mod.BeginSection)),

    // Services Page Sections
    "HeroSection": dynamic(() => import("@/app/(pages)/services/sections/HeroSection").then(mod => mod.HeroSection)),
    "ServiceDetailsSection": dynamic(() => import("@/app/(pages)/services/sections/ServiceDetailsSection").then(mod => mod.ServiceDetailsSection)),
    "Section6-begin": dynamic(() => import("@/app/(pages)/services/sections/Section6-begin").then(mod => mod.BeginSection)),

    // Contact Page Sections
    "ContactContent": dynamic(() => import("@/app/(pages)/contact/sections/ContactContent").then(mod => mod.ContactContent)),

    // Privacy Policy Page Sections
    // "PrivacyContent": dynamic(() => import("@/app/(pages)/privacy-policy/sections/PrivacyContent").then(mod => mod.PrivacyContent)),

    // Terms Page Sections
    // "TermsContent": dynamic(() => import("@/app/(pages)/terms-conditions/sections/TermsContent").then(mod => mod.TermsContent)),
} as const;

type SectionId = keyof typeof sections;

interface SectionRendererProps {
    selectedPage: string;
    sectionContents: SectionContents;
    onTextChange: (sectionId: string, key: string, value: string) => void;
}

export function SectionRenderer({ selectedPage, sectionContents, onTextChange }: SectionRendererProps) {
    const pageSections = getPageSections(selectedPage);

    return (
        <div className="space-y-8">
            {pageSections.map((section) => {
                const sectionId = section.id as SectionId;
                const Component = sections[sectionId];
                if (!Component) return null;

                const dbContent = sectionContents[section.id] || {};
                const defaultContent = DEFAULT_CONTENT[sectionId as keyof typeof DEFAULT_CONTENT] || {};

                // Check if dbContent has any non-empty values
                const hasValidDbContent = Object.values(dbContent).some(value => {
                    if (value === null || value === undefined || value === '') return false;
                    if (typeof value === 'string' && value.trim() === '') return false;
                    if (Array.isArray(value) && value.length === 0) return false;
                    return true;
                });

                // Use database content if it has valid values, otherwise use default
                const baseContent = hasValidDbContent ? { ...dbContent } : { ...defaultContent };

                // Parse testimonials data if it exists and we're in the testimonials section
                const content = sectionId === 'Section5-WhoWeHelp' ? {
                    ...baseContent,
                    testimonials: (() => {
                        try {
                            const testimonialsData = (baseContent as TestimonialsContent).testimonials;
                            if (typeof testimonialsData === 'string') {
                                return JSON.parse(testimonialsData);
                            }
                            return testimonialsData;
                        } catch (error) {
                            console.error('Error parsing testimonials:', error);
                            toast.error('Error parsing testimonials data');
                            // Fallback to default testimonials if parsing fails
                            return (defaultContent as TestimonialsContent).testimonials || [];
                        }
                    })()
                } : baseContent;

                console.log(`Rendering ${section.id}:`, {
                    dbContent,
                    dbContentKeys: Object.keys(dbContent),
                    dbContentValues: Object.values(dbContent),
                    defaultContent,
                    hasValidDbContent,
                    finalContent: content,
                    contentCheck: Object.entries(dbContent).map(([key, value]) => ({
                        key,
                        value,
                        isValid: value !== null && value !== undefined && value !== '' &&
                            (typeof value !== 'string' || value.trim() !== '') &&
                            (!Array.isArray(value) || value.length > 0)
                    }))
                });

                return (
                    <div key={section.id} className="relative">
                        <Component
                            // @ts-expect-error - Type mismatch is expected due to dynamic components
                            content={content}
                            isEditing={true}
                            onUpdate={(key, value) => onTextChange(section.id, key, value)}
                        />
                    </div>
                );
            })}
        </div>
    );
}