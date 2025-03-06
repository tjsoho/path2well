"use client";

import { useState } from "react";
// import { PagePreview } from "./PagePreview";
import { PageSectionEditor } from "./PageSectionEditor";
import { getPageSections } from "@/lib/pageSections";
import { ChevronDown } from "lucide-react";
import { DevicePreview } from "./DevicePreview";

export function PageEditor() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  const pages = [
    { id: "home", name: "Home Page" },
    // Add other pages as needed
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-brand-brown-dark/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Pages Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setPagesOpen(!pagesOpen);
                setSectionsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-brand-brown-dark/5 text-brand-brown-dark"
            >
              <span className="min-w-[100px]">
                {selectedPage
                  ? pages.find((p) => p.id === selectedPage)?.name
                  : "Select Page"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  pagesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {pagesOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-brand-brown-dark/10 py-1 z-50">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setSelectedPage(page.id);
                      setPagesOpen(false);
                      setSelectedSection(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-brown-dark/5 text-brand-brown-dark"
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-brand-brown-dark/10" />

          {/* Sections Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSectionsOpen(!sectionsOpen);
                setPagesOpen(false);
              }}
              disabled={!selectedPage}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-brand-brown-dark ${
                selectedPage
                  ? "hover:bg-brand-brown-dark/5"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="min-w-[120px]">
                {selectedSection
                  ? getPageSections(selectedPage!).find(
                      (s) => s.id === selectedSection
                    )?.name
                  : "Select Section"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sectionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sectionsOpen && selectedPage && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-brand-brown-dark/10 py-1 z-50">
                {getPageSections(selectedPage).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setSelectedSection(section.id);
                      setSectionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-brand-brown-dark/5 text-brand-brown-dark"
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {selectedSection ? (
          <DevicePreview>
            <PageSectionEditor
              pageId={selectedPage!}
              sectionId={selectedSection}
            />
          </DevicePreview>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-brand-brown-dark text-center">
              Select a page and section to start editing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
