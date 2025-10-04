"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { getPageSections } from "@/lib/pageSections";
import { SectionContents } from "../../../types/pageEditor";
import { PageSelector } from "./PageSelector";
import { SaveButton } from "./SaveButton";
import { SectionRenderer } from "./SectionRenderer";
import Loader from "../ui/Loader";

export function PageEditor() {
  // State
  const [selectedPage, setSelectedPage] = useState<string>("home"); // Set default page to "home"
  const [sectionContents, setSectionContents] = useState<SectionContents>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract content from all sections
  const extractContent = useCallback(async () => {
    if (!selectedPage) return;
    setIsLoading(true);
    try {
      const pageSections = getPageSections(selectedPage);
      const contents: SectionContents = {};

      const fetchPromises = pageSections.map(async (section) => {
        const url = `/api/sections/content?pageId=${selectedPage}&sectionId=${section.id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch content for section ${section.id}`);
        }

        const data = await response.json();

        const sectionContent = data.content || {};
        if (sectionContent.testimonials && typeof sectionContent.testimonials === "string") {
          try {
            sectionContent.testimonials = JSON.parse(sectionContent.testimonials);
          } catch (e) {
            console.error(`Failed to parse testimonials JSON for section ${section.id}`, e);
          }
        }

        contents[section.id] = sectionContent;
      });

      await Promise.all(fetchPromises);

      setSectionContents(contents);
      setIsDirty(false);
    } catch (error) {
      console.error("Error fetching section contents:", error);
      toast.error("Failed to load page content");
    } finally {
      setIsLoading(false);
    }
  }, [selectedPage]);

  // Load content when component mounts or page changes
  useEffect(() => {
    if (selectedPage) {
      
      extractContent();
    }
  }, [selectedPage, extractContent]);

  // Handle text change
  const handleTextChange = async (sectionId: string, field: string, value: string) => {
    

    if (!selectedPage) {
      
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

  const handlePublish = async () => {
    const deployHookUrl = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL;
    if (!deployHookUrl) {
      toast.error("Deploy hook URL is not configured");
      return;
    }

    // Custom Toast Component
    function PublishToast({ tId }: { tId: string }) {
      const [seconds, setSeconds] = useState(120);
      const intervalRef = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
        intervalRef.current = setInterval(() => {
          setSeconds((s) => Math.max(s - 1, 0));
        }, 1000);
        return () => clearInterval(intervalRef.current!);
      }, [tId]);

      useEffect(() => {
        if (seconds === 0) {
          toast.dismiss(tId);
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Show refresh toast and reload page
          const refreshToastId = toast("Page Refresh in 3 seconds", { duration: 3000 });
          setTimeout(() => {
            toast.dismiss(refreshToastId);
          }, 3000);
          window.location.reload();
        }
      }, [seconds, tId]);

      return (
        <div className="flex flex-col items-center gap-2 p-4 bg-[#71cec4] rounded-lg">
          <div className="text-lg font-bold text-brand-black">Publishing your changes...</div>
          <div className="text-sm text-brand-black">Please wait <span className="font-mono">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span> for content to be updated.</div>
          <button
            className="mt-2 px-3 py-1 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
            onClick={() => toast.dismiss(tId)}
          >
            Close
          </button>
        </div>
      );
    }

    toast.custom((t) => <PublishToast tId={t.id} />, { duration: 120000 });

    try {
      await fetch(deployHookUrl, { method: "POST" });
    } catch {
      toast.error("Failed to trigger deployment");
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
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 font-bold text-brand-white hover:bg-pink-500/70 border-brand-teal transition-all duration-300"
                onClick={handlePublish}
                type="button"
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
                  <path d="M12 19V6M5 12l7-7 7 7" />
                </svg>
                <span>Publish</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {selectedPage ? (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {isLoading ? (
              <Loader />
            ) : (
              <SectionRenderer
                selectedPage={selectedPage}
                sectionContents={sectionContents}
                onTextChange={handleTextChange}
              />
            )}
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
