"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { getPageSections } from "@/lib/pageSections";
import { SectionContents } from "../../../types/pageEditor";
import { PageSelector } from "./PageSelector";
import { SaveButton } from "./SaveButton";
import { SectionRenderer } from "./SectionRenderer";

export function PageEditor() {
  // State
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [sectionContents, setSectionContents] = useState<SectionContents>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle text change
  const handleTextChange = (sectionId: string, key: string, value: string) => {
    console.log("Updating content:", { sectionId, key, value });
    setIsDirty(true);
    setSectionContents((prev: SectionContents) => {
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

  return (
    <div className="min-h-screen bg-brand-black/95 rounded-xl border border-brand-teal shadow-[0_0_15px_rgba(1,141,141,0.3)] backdrop-blur-sm">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-brand-black/80 border-b border-brand-teal/20 rounded-t-xl backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <PageSelector
            selectedPage={selectedPage}
            onPageSelect={(pageId) => {
              setSelectedPage(pageId);
              extractContent();
            }}
          />

          {/* Actions */}
          {selectedPage && (
            <div className="flex items-center gap-4">
              {isDirty && (
                <span className="text-pink-500 text-sm">
                  You have unsaved changes
                </span>
              )}
              <SaveButton
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {selectedPage ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <SectionRenderer
              selectedPage={selectedPage}
              sectionContents={sectionContents}
              onTextChange={handleTextChange}
            />
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
