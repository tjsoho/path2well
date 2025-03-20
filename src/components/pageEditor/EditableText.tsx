"use client";

interface EditableTextProps {
  id: string;
  type: "heading" | "paragraph" | "subtext";
  content: string;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
  className?: string;
}

export function EditableText({
  id,
  type,
  content,
  isEditing,
  onUpdate,
  className = "",
}: EditableTextProps) {
  console.log("EditableText rendering:", { id, type, content, isEditing });

  // Function to render text with line breaks
  const renderTextWithBreaks = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line || "\u00A0"}
      </span>
    ));
  };

  if (!isEditing) {
    // Regular display mode - using original text colors
    switch (type) {
      case "heading":
        return (
          <h1
            className={`text-xl md:text-5xl mb-4 font-kiona text-brand-brown-light ${className}`}
          >
            {renderTextWithBreaks(content || "No content")}
          </h1>
        );
      case "paragraph":
        return (
          <p
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-none ${className}`}
          >
            {renderTextWithBreaks(content || "No content")}
          </p>
        );
      case "subtext":
        return (
          <p className={`text-2xl mb-8 max-w-2xl mx-auto ${className}`}>
            {renderTextWithBreaks(content || "No content")}
          </p>
        );
      default:
        return <div className={className}>Invalid type</div>;
    }
  }

  // Edit mode - keep dark text for better visibility
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm  mb-2 font-semibold">
        {id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </label>
      <textarea
        value={content || ""}
        onChange={(e) => onUpdate?.(id, e.target.value)}
        className={`w-full px-3 py-2 border border-brand-brown-dark/20 rounded-md text-brand-brown-dark ${className}`}
        rows={type === "paragraph" ? 4 : 2}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
