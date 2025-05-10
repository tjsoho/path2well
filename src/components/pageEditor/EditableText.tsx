"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

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
  const [isEditingInPlace, setIsEditingInPlace] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update editedContent when content prop changes
  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditingInPlace && textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at the end of the text
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditingInPlace]);

  const handleClick = () => {
    if (isEditing && !isEditingInPlace) {
      setIsEditingInPlace(true);
    }
  };

  const handleSave = async () => {
    if (onUpdate && editedContent !== content) {
      await onUpdate(id, editedContent);
    }
    setIsEditingInPlace(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditingInPlace(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
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
    <div
      className={`group relative ${isEditing
        ? "hover:bg-brand-teal/5 rounded-lg transition-all duration-300"
        : ""
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditingInPlace ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full bg-brand-black/80 text-white p-3 rounded-lg border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
            rows={type === "paragraph" ? 5 : 2}
            style={{
              minHeight: type === "heading" ? "60px" : "120px",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit"
            }}
          />
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <Component
            onClick={handleClick}
            className={`${className} ${isEditing
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
                         ${isHovered
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
                         ${isHovered ? "border-pink-500/50" : "border-transparent"
                }`}
            />
          )}
        </>
      )}
    </div>
  );
}
