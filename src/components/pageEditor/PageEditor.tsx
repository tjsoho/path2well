"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPageSections } from "@/lib/pageSections";
import dynamic from "next/dynamic";

// Types
interface Page {
  id: string;
  name: string;
}

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

  // Render section
  const renderSection = () => {
    if (!selectedSection) return null;
    const Component = sections[selectedSection as keyof typeof sections];
    if (!Component) return null;
    return <Component />;
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
          renderSection()
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
