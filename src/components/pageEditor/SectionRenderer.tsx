import { getPageSections } from "@/lib/pageSections";
import { SectionContents } from "../../../types/pageEditor";
import { DEFAULT_CONTENT } from "@/lib/defaultContent";
import dynamic from "next/dynamic";

// Dynamic Section Imports
const sections = {
    "Section1-Hero": dynamic(() => import("@/app/(pages)/home/sections/Section1-Hero").then(mod => mod.HeroSection)),
    "Section2-Promise": dynamic(() => import("@/app/(pages)/home/sections/Section2-Promise").then(mod => mod.PromiseSection)),
    "Section3-Clarity-Confidence-Freedom": dynamic(() => import("@/app/(pages)/home/sections/Section3-Clarity-Confidence-Freedom").then(mod => mod.SupportSection)),
    "Section4-WhatWeDo": dynamic(() => import("@/app/(pages)/home/sections/Section4-about").then(mod => mod.WhatWeDo)),
    "Section5-WhoWeHelp": dynamic(() => import("@/app/(pages)/home/sections/Section5-WhoWeHelp").then(mod => mod.Testimonials)),
    "Section6-Download": dynamic(() => import("@/app/(pages)/home/sections/Section6-Download").then(mod => mod.DownloadSection)),
    "Section7-Services": dynamic(() => import("@/app/(pages)/home/sections/Section7-Services").then(mod => mod.ServicesSection)),
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
                const defaultContent = DEFAULT_CONTENT[sectionId] || {};

                // Merge the content and type it correctly based on the section ID
                const content = {
                    ...defaultContent,
                    ...dbContent
                };

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