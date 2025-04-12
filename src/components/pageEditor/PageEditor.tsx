"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { getPageSections } from "@/lib/pageSections";
import { SectionContents } from "../../../types/pageEditor";
import { PageSelector } from "./PageSelector";
import { SaveButton } from "./SaveButton";
import { SectionRenderer } from "./SectionRenderer";

export function PageEditor() {
  // State
  const [selectedPage, setSelectedPage] = useState<string>("home"); // Set default page to "home"
  const [sectionContents, setSectionContents] = useState<SectionContents>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Extract content from all sections
  const extractContent = useCallback(async () => {
    if (!selectedPage) return;

    try {
      const pageSections = getPageSections(selectedPage);
      const contents: SectionContents = {};

      console.log('Starting content extraction for page:', selectedPage);

      for (const section of pageSections) {
        console.log(`Fetching content for section: ${section.id}`);

        const url = `/api/sections/content?pageId=${selectedPage}&sectionId=${section.id}`;
        console.log('Fetching from URL:', url);

        const response = await fetch(url);
        console.log(`Response status for ${section.id}:`, response.status);

        if (!response.ok) {
          console.error(`Failed to fetch content for section ${section.id}:`, {
            status: response.status,
            statusText: response.statusText,
            url: response.url
          });
          throw new Error(`Failed to fetch content for section ${section.id}`);
        }

        const data = await response.json();
        console.log(`Raw API response for ${section.id}:`, {
          data,
          contentType: typeof data.content,
          contentKeys: data.content ? Object.keys(data.content) : [],
          contentValues: data.content ? Object.values(data.content) : []
        });

        // Parse testimonials JSON if present
        const sectionContent = data.content || {};
        if (sectionContent.testimonials && typeof sectionContent.testimonials === 'string') {
          try {
            sectionContent.testimonials = JSON.parse(sectionContent.testimonials);
          } catch (e) {
            console.error(`Failed to parse testimonials JSON for section ${section.id}:`, e);
            // Keep the string value if parsing fails
          }
        }

        contents[section.id] = sectionContent;
        console.log(`Stored content for ${section.id}:`, {
          content: contents[section.id],
          keys: Object.keys(contents[section.id]),
          values: Object.values(contents[section.id])
        });
      }

      console.log("Final contents to be set:", {
        contents,
        sections: Object.keys(contents),
        sampleContent: contents["Section4-WhatWeDo"],
        sampleKeys: contents["Section4-WhatWeDo"] ? Object.keys(contents["Section4-WhatWeDo"]) : []
      });

      setSectionContents(contents);
      setIsDirty(false);
    } catch (error) {
      console.error("Error fetching section contents:", error);
      toast.error("Failed to load page content");
    }
  }, [selectedPage]);

  // Load content when component mounts or page changes
  useEffect(() => {
    if (selectedPage) {
      console.log('Loading content for page:', selectedPage);
      extractContent();
    }
  }, [selectedPage, extractContent]);

  // Handle text change
  const handleTextChange = async (sectionId: string, field: string, value: string) => {
    console.log(`Handling text change for section ${sectionId}, field ${field}:`, value);

    if (!selectedPage) {
      console.error('No page selected');
      return;
    }

    const newContents = { ...sectionContents };
    if (!newContents[sectionId]) {
      newContents[sectionId] = {};
    }

    // Handle testimonials specially - ensure they're stored as a string in the database
    if (field === 'testimonials') {
      try {
        // If value is already a string, try parsing it to validate JSON
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        // Store the stringified version
        newContents[sectionId][field] = JSON.stringify(parsed);
      } catch (e) {
        console.error('Invalid testimonials JSON:', e);
        toast.error('Invalid testimonials format');
        return;
      }
    } else {
      newContents[sectionId][field] = value;
    }

    setSectionContents(newContents);

    try {
      // Use the update endpoint instead of content endpoint
      const response = await fetch('/api/sections/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageId: selectedPage,
          sectionId,
          content: newContents[sectionId],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
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

        console.log(`Saving content for ${section.id}:`, content);

        const response = await fetch("/api/sections/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: selectedPage,
            sectionId: section.id,
            content: content,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save content for section ${section.id}`);
        }

        const result = await response.json();
        console.log(`Save result for ${section.id}:`, result);
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
            onPageSelect={setSelectedPage}
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
