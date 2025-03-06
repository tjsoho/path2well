/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Droplet,
  Type,
} from "lucide-react";
import Image from "@tiptap/extension-image";
import { FontFamily } from "@tiptap/extension-font-family";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface TipTapEditorProps {
  content: string | object;
  onChange: (content: string) => void;
  postId?: string;
}

const MenuBar = ({ editor, postId }: { editor: any; postId?: string }) => {
  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      try {
        toast.loading("Uploading image...", { id: "imageUpload" });

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `blog-content-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("blog-images").getPublicUrl(filePath);

        if (postId) {
          const { error: dbError } = await supabase
            .from("blog_content_images")
            .insert([
              {
                post_id: postId,
                image_url: publicUrl,
              },
            ]);

          if (dbError) {
            console.error("Error tracking image:", dbError);
          }
        }

        editor.chain().focus().setImage({ src: publicUrl }).run();
        toast.success("Image uploaded successfully", { id: "imageUpload" });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", { id: "imageUpload" });
      }
    };

    input.click();
  };

  const addLink = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border-b border-brand-brown-dark/20 p-4 flex flex-wrap gap-2">
      <div className="flex items-center gap-1 pr-2 border-r border-brand-brown-dark/20">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("bold") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("italic") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("underline") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-brand-brown-dark/20">
        <select
          onChange={(event) => {
            const tag = event.target.value;
            if (tag === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(tag) })
                .run();
            }
          }}
          className="p-2 rounded hover:bg-gray-100 text-gray-700 focus:outline-none"
        >
          <option value="paragraph">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-brand-brown-dark/20">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-brand-brown-dark/10"
              : ""
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-brand-brown-dark/10"
              : ""
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-brand-brown-dark/10"
              : ""
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-brand-brown-dark/10"
              : ""
          }`}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-brand-brown-dark/20">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("bulletList") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("orderedList") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-brand-brown-dark/20">
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("link") ? "bg-brand-brown-dark/10" : ""
          }`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4 text-gray-700" />
        </button>
        <div className="relative" title="Text Color">
          <button className="p-2 rounded hover:bg-gray-100 flex items-center gap-1">
            <Droplet className="w-4 h-4 text-gray-700" />
            <input
              type="color"
              onInput={(event) => {
                editor.chain().focus().setColor(event.target.value).run();
              }}
              className="w-0 h-0 opacity-0 absolute inset-0 cursor-pointer"
              title="Text Color"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export function TipTapEditor({ content, onChange, postId }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
      Image,
      FontFamily,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content:
      typeof content === "string"
        ? content
          ? JSON.parse(content)
          : { type: "doc", content: [{ type: "paragraph" }] }
        : content,
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-brand-brown-dark/20 rounded-md overflow-hidden">
      <MenuBar editor={editor} postId={postId} />
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none text-gray-700"
      />
    </div>
  );
}
