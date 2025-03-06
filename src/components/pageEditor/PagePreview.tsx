"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface PagePreviewProps {
  pageId: string;
  sectionId: string;
}

export function PagePreview({ pageId, sectionId }: PagePreviewProps) {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamically import the section component
    const loadComponent = async () => {
      const section = await import(
        `@/app/(pages)/${pageId}/sections/${sectionId}`
      );
      setComponent(() => section.default);
    };

    loadComponent();
  }, [pageId, sectionId]);

  if (!Component) return <div>Loading preview...</div>;

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <Component isPreview />
    </div>
  );
} 