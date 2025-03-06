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
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    heading: "",
    subheading: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Handle text change
  const handleTextChange = (key: string, value: string) => {
    console.log("Updating content:", key, value);
    setIsDirty(true);
    setSectionContent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Render section with updated content
  const renderSection = () => {
    if (!selectedSection) return null;
    const Component = sections[selectedSection as keyof typeof sections];
    if (!Component) return null;
    return (
      <Component
        // @ts-ignore - We know the content structure matches what the component expects
        content={sectionContent}
        isEditing={isEditing}
        onUpdate={handleTextChange}
      />
    );
  };

  // Handle save
  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log("Saving content:", sectionContent);

      const response = await fetch("/api/sections/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: selectedPage,
          sectionId: selectedSection,
          content: sectionContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      setIsDirty(false);
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (isDirty) {
      if (
        confirm("You have unsaved changes. Are you sure you want to close?")
      ) {
        setIsEditing(false);
        setPreviewMode(false);
      }
    } else {
      setIsEditing(false);
      setPreviewMode(false);
    }
  };

  // Extract content from section
  const extractContent = async () => {
    if (!selectedSection || !selectedPage) return;

    try {
      const response = await fetch(
        `/api/sections/content?pageId=${selectedPage}&sectionId=${selectedSection}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data = await response.json();
      const content = data.content || { heading: "", subheading: "" };

      console.log("Fetched content:", content);
      setSectionContent(content as SectionContent);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching section content:", error);
      setSectionContent({ heading: "", subheading: "" });
      setIsEditing(true);
    }
  };

  // Handle edit click
  const handleEditClick = () => {
    extractContent();
  };

  return (
    <div className="min-h-screen bg-brand-black/95 rounded-xl border border-brand-teal shadow-[0_0_15px_rgba(1,141,141,0.3)] backdrop-blur-sm">
      {/* Navigation */}
      <div className="bg-brand-black/80 border-b border-brand-teal/20 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
          {/* Page Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPagesOpen(!pagesOpen);
                setSectionsOpen(false);
              }}
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
                      setSelectedSection(null);
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

          <div className="h-8 w-px bg-brand-teal/20" />

          {/* Sections Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSectionsOpen(!sectionsOpen);
                setPagesOpen(false);
              }}
              disabled={!selectedPage}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg
                        border transition-all duration-300
                        ${
                          selectedPage
                            ? "bg-brand-black/60 text-brand-white hover:bg-brand-teal/10 border-brand-teal/30 hover:border-brand-teal"
                            : "bg-brand-black/40 text-brand-white/50 border-transparent cursor-not-allowed"
                        }`}
            >
              <span className="min-w-[140px] font-chocolates">
                {selectedSection
                  ? getPageSections(selectedPage!).find(
                      (s) => s.id === selectedSection
                    )?.name
                  : "Select Section"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-brand-teal transition-transform duration-300 ${
                  sectionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sectionsOpen && selectedPage && (
              <div
                className="absolute top-full left-0 mt-2 w-52 bg-brand-black/95 
                            rounded-lg border border-brand-teal/30 shadow-lg shadow-brand-teal/20 
                            backdrop-blur-sm py-1 z-50"
              >
                {getPageSections(selectedPage).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setSelectedSection(section.id);
                      setSectionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-brand-white 
                            hover:bg-brand-teal/10 transition-colors duration-200
                            font-chocolates"
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Header */}
      {selectedSection && (
        <div className="bg-brand-black/60 border-b border-brand-teal/20">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-brand-teal/70 font-chocolates">
                {PAGES.find((p) => p.id === selectedPage)?.name}
              </span>
              <span className="text-brand-teal/40 mx-2">/</span>
              <span className="text-brand-white font-chocolates">
                {
                  getPageSections(selectedPage!).find(
                    (s) => s.id === selectedSection
                  )?.name
                }
              </span>
            </div>
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 
                        bg-brand-black/80 text-brand-white hover:bg-brand-teal/10 
                        border border-brand-teal/30 hover:border-brand-teal
                        rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              <span className="font-chocolates">Edit Content</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        {selectedSection ? (
          <div>
            {/* Edit Section */}
            <div
              className={`
                w-full bg-brand-black/95 border-b border-brand-teal/30 backdrop-blur-sm
                transform transition-all duration-300 ease-in-out origin-top
                ${
                  isEditing
                    ? "h-auto opacity-100"
                    : "h-0 opacity-0 overflow-hidden"
                }
              `}
            >
              {/* Edit Controls */}
              <div className="max-w-7xl mx-auto">
                <div className="border-b border-brand-teal/20 p-4 flex justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {isDirty && (
                      <span className="text-brand-teal/70 font-chocolates text-sm">
                        You have unsaved changes
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPreviewMode(!previewMode)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                              bg-brand-black/60 text-brand-white hover:bg-brand-teal/10 
                              border border-brand-teal/30 hover:border-brand-teal
                              transition-all duration-300"
                    >
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
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span className="font-chocolates">
                        {previewMode ? "Edit" : "Preview"}
                      </span>
                    </button>
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
                      ) : (
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
                      )}
                      <span className="font-chocolates">
                        {isSaving ? "Saving..." : "Save"}
                      </span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                              bg-brand-black/60 text-brand-white hover:bg-brand-teal/10 
                              border border-brand-teal/30 hover:border-brand-teal
                              transition-all duration-300"
                    >
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      <span className="font-chocolates">Close</span>
                    </button>
                  </div>
                </div>

                {/* Content Fields */}
                <div className={`p-6 space-y-6 ${previewMode ? "hidden" : ""}`}>
                  {Object.entries(sectionContent).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-brand-teal font-chocolates">
                        {key === "heading" ? "Heading" : "Sub Heading"}
                      </label>
                      <textarea
                        value={value}
                        onChange={(e) => handleTextChange(key, e.target.value)}
                        className="w-full min-h-[100px] p-4 rounded-lg
                                 bg-white text-brand-black
                                 border border-brand-teal/30 focus:border-brand-teal
                                 outline-none transition-all duration-300
                                 font-chocolates resize-y"
                      />
                    </div>
                  ))}
                </div>

                {/* Preview */}
                {previewMode && (
                  <div className="p-6">
                    <div className="bg-white rounded-lg p-6">
                      {Object.entries(sectionContent).map(([key, value]) => (
                        <div key={key} className="mb-4">
                          {key === "heading" ? (
                            <h2 className="text-2xl font-bold text-brand-black mb-2">
                              {value}
                            </h2>
                          ) : (
                            <p className="text-brand-black">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section Content */}
            <div
              data-section-content
              className={`transition-opacity duration-300 ${
                isEditing ? "opacity-50" : "opacity-100"
              }`}
            >
              {renderSection()}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-20">
            <p className="text-brand-white/70 text-center text-lg font-chocolates">
              Select a page and section to start editing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
