"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPageSections } from "@/lib/pageSections";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

// Types
interface Page {
  id: string;
  name: string;
}

type SectionContent = Record<string, string>;
type SectionContents = Record<string, SectionContent>;

// Constants
const PAGES: Page[] = [
  { id: "home", name: "Home Page" },
  // Add other pages as needed
];

// Dynamic Section Imports
const sections = {
  "Section1-Hero": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section1-Hero").then(
        (mod) => mod.HeroSection
      ),
    { ssr: false }
  ),
  "Section2-Promise": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section2-Promise").then(
        (mod) => mod.PromiseSection
      ),
    { ssr: false }
  ),
  "Section3-Clarity-Confidence-Freedom": dynamic(
    () =>
      import(
        "@/app/(pages)/home/sections/Section3-Clarity-Confidence-Freedom"
      ).then((mod) => mod.SupportSection),
    { ssr: false }
  ),
  "Section4-WhatWeDo": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section4-WhatWeDo").then(
        (mod) => mod.WhatWeDo
      ),
    { ssr: false }
  ),
  "Section5-WhoWeHelp": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section5-WhoWeHelp").then(
        (mod) => mod.TargetMarket
      ),
    { ssr: false }
  ),
  "Section6-Testimonials": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section6-Testimonials").then(
        (mod) => mod.TestimonialsSection
      ),
    { ssr: false }
  ),
  "Section7-Quote": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section7-Quote").then(
        (mod) => mod.QuoteSection
      ),
    { ssr: false }
  ),
  "Section8-AboutUs": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section8-AboutUs").then(
        (mod) => mod.AboutMe
      ),
    { ssr: false }
  ),
  "Section9-Download": dynamic(
    () =>
      import("@/app/(pages)/home/sections/Section9-Download").then(
        (mod) => mod.DownloadSection
      ),
    { ssr: false }
  ),
} as const;

export function PageEditor() {
  // State
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [sectionContents, setSectionContents] = useState<SectionContents>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle text change
  const handleTextChange = (sectionId: string, key: string, value: string) => {
    console.log("Updating content:", { sectionId, key, value });
    setIsDirty(true);
    setSectionContents((prev) => {
      const newContents = {
        ...prev,
        [sectionId]: {
          ...(prev[sectionId] || {}),
          [key]: value,
        },
      };
      console.log("New section contents:", newContents);
      return newContents;
    });
  };

  // Extract content from all sections
  const extractContent = async () => {
    if (!selectedPage) return;

    try {
      const pageSections = getPageSections(selectedPage);
      const contents: SectionContents = {};

      for (const section of pageSections) {
        console.log(`Fetching content for section: ${section.id}`);
        const response = await fetch(
          `/api/sections/content?pageId=${selectedPage}&sectionId=${section.id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch content for section ${section.id}`);
        }

        const data = await response.json();
        console.log(`Received content for ${section.id}:`, data);
        contents[section.id] = data.content || {};
      }

      console.log("All fetched contents:", contents);
      setSectionContents(contents);
    } catch (error) {
      console.error("Error fetching section contents:", error);
      toast.error("Failed to load page content");
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      setIsSaving(true);
      const pageSections = getPageSections(selectedPage);

      for (const section of pageSections) {
        const content = sectionContents[section.id];
        if (!content) continue;

        const response = await fetch("/api/sections/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: selectedPage,
            sectionId: section.id,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save content for section ${section.id}`);
        }
      }

      setIsDirty(false);
      toast.success("All changes saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // Render page content
  const renderPageContent = () => {
    if (!selectedPage) return null;

    const pageSections = getPageSections(selectedPage);
    return (
      <div className="space-y-8">
        {pageSections.map((section) => {
          const Component = sections[section.id as keyof typeof sections];
          if (!Component) return null;

          const sectionContent = sectionContents[section.id] || {};

          return (
            <div key={section.id} className="relative">
              <Component
                content={sectionContent}
                isEditing={true}
                onUpdate={(key: string, value: string) =>
                  handleTextChange(section.id, key, value)
                }
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-black/95 rounded-xl border border-brand-teal shadow-[0_0_15px_rgba(1,141,141,0.3)] backdrop-blur-sm">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-brand-black/80 border-b border-brand-teal/20 rounded-t-xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Page Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg 
                        bg-brand-black/60 text-brand-white hover:bg-brand-teal/10 
                        border border-brand-teal/30 hover:border-brand-teal
                        transition-all duration-300"
            >
              <span className="min-w-[120px] font-chocolates">
                {selectedPage
                  ? PAGES.find((p) => p.id === selectedPage)?.name
                  : "Select Page"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-brand-teal transition-transform duration-300 ${
                  pagesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {pagesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-52 bg-brand-black/95 
                            rounded-lg border border-brand-teal/30 shadow-lg shadow-brand-teal/20 
                            backdrop-blur-sm py-1 z-50"
              >
                {PAGES.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setSelectedPage(page.id);
                      setPagesOpen(false);
                      extractContent();
                    }}
                    className="w-full text-left px-4 py-3 text-brand-white 
                            hover:bg-brand-teal/10 transition-colors duration-200
                            font-chocolates"
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          {selectedPage && (
            <div className="flex items-center gap-4">
              {isDirty && (
                <span className="text-pink-500 text-sm">
                  You have unsaved changes
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={!isDirty || isSaving}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg
                          transition-all duration-300
                          ${
                            !isDirty
                              ? "bg-brand-black/40 text-brand-white/50 border-transparent cursor-not-allowed"
                              : "bg-brand-teal text-brand-white hover:bg-brand-teal/90 border-brand-teal"
                          }`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Save All Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {selectedPage ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {renderPageContent()}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <p className="text-brand-white/70 text-center text-lg font-chocolates">
              Select a page to start editing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
