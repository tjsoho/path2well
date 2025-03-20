"use client";

import { useState } from "react";
import { ContentEditorModal } from "./ContentEditorModal";
import { Pencil } from "lucide-react";

export interface EditableTextProps {
  id: string;
  type: "heading" | "subtext" | "paragraph";
  content: string;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
  className?: string;
  renderContent?: (text: string) => React.ReactNode;
}

export function EditableText({
  id,
  type,
  content = "",
  isEditing = false,
  onUpdate,
  className = "",
  renderContent,
}: EditableTextProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isEditing) {
      setIsModalOpen(true);
    }
  };

  const handleSave = async (newContent: string) => {
    if (onUpdate) {
      await onUpdate(id, newContent);
    }
  };

  const Component = type === "heading" ? "h2" : "p";

  const renderTextWithBreaks = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line || "\u00A0"}
      </span>
    ));
  };

  const renderedContent = renderContent
    ? renderContent(content || "")
    : renderTextWithBreaks(content || "");

  return (
    <>
      <div
        className={`group relative ${
          isEditing
            ? "hover:bg-brand-teal/5 rounded-lg transition-all duration-300"
            : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Component
          onClick={handleClick}
          className={`${className} ${
            isEditing
              ? "cursor-pointer transition-all duration-300 rounded-lg p-2"
              : ""
          }`}
        >
          {renderedContent}
        </Component>

        {/* Edit Icon */}
        {isEditing && (
          <div
            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2.5 
                       rounded-full bg-pink-500 text-white shadow-lg
                       transform transition-all duration-300 cursor-pointer
                       hover:bg-pink-600 hover:scale-110
                       ${
                         isHovered
                           ? "opacity-100 translate-x-0"
                           : "opacity-0 translate-x-2"
                       }`}
            onClick={handleClick}
          >
            <Pencil className="w-5 h-5" />
          </div>
        )}

        {/* Edit Indicator */}
        {isEditing && (
          <div
            className={`absolute inset-0 rounded-lg border-2 border-dashed 
                       pointer-events-none transition-all duration-300
                       ${
                         isHovered ? "border-pink-500/50" : "border-transparent"
                       }`}
          />
        )}
      </div>

      <ContentEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={content || ""}
        onSave={handleSave}
        title={`Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        type={type}
        helpText={
          type === "heading"
            ? "Use <teal>text</teal> to highlight text in teal color"
            : undefined
        }
      />
    </>
  );
}
