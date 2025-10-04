"use client";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";

const extensions = [
  StarterKit,
  Image,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Color,
  FontFamily,
];

export function TipTapContent({ content }: { content: string }) {
  let html = content;

  try {
    // Try to parse as JSON first
    const jsonContent = JSON.parse(content);
    html = generateHTML(jsonContent, extensions);
  } catch {
    // If parsing fails, assume content is already HTML
    
  }

  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
