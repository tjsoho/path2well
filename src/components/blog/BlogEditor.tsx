"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TipTapEditor } from "./TipTapEditor";
import toast from "react-hot-toast";
import Image from "next/image";
import { BlogPosts } from "./BlogPosts";
import { Info, Upload, X } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  image_url: string;
}

interface SaveError {
  message: string;
}

export function BlogEditor() {
  const [post, setPost] = useState<BlogPost>({
    title: "",
    subtitle: "",
    content: "",
    tags: [],
    image_url: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [view, setView] = useState<"editor" | "posts">("editor");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!post.tags.includes(tagInput.trim())) {
        setPost((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageLoading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("blog-images").getPublicUrl(filePath);

      setPost((prev) => ({ ...prev, image_url: publicUrl }));
      toast.success("Image uploaded successfully", { id: toastId });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setImageLoading(false);
    }
  };

  // Update the triggerImageUpload function to handle the correct event type
  const triggerImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleImageUpload({ target } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    input.click();
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleEdit = (postToEdit: BlogPost) => {
    // Parse the JSON content if it's a string
    const parsedContent =
      typeof postToEdit.content === "string"
        ? JSON.parse(postToEdit.content)
        : postToEdit.content;

    setPost({
      ...postToEdit,
      content: parsedContent,
    });
    setView("editor");
    setIsEditing(true);
  };

  const handleSave = async (status: "draft" | "published") => {
    const toastId = toast.loading("Saving post...");

    try {
      if (!post.title) {
        toast.error("Title is required", { id: toastId });
        return;
      }

      if (!post.content) {
        toast.error("Content is required", { id: toastId });
        return;
      }

      const slug = createSlug(post.title);

      if (isEditing && post.id) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update({
            ...post,
            slug,
            status,
          })
          .eq("id", post.id)
          .select()
          .single();

        if (error) throw new Error(error.message);

        toast.success("Post updated successfully!", { id: toastId });
      } else {
        // Create new post
        const { error } = await supabase
          .from("blog_posts")
          .insert([
            {
              ...post,
              slug,
              status,
            },
          ])
          .select()
          .single();

        if (error) throw new Error(error.message);

        toast.success(
          status === "published" ? "Post published!" : "Draft saved!",
          { id: toastId }
        );
      }

      resetForm();
      setIsEditing(false);
    } catch (err) {
      console.error("Save error:", err);
      const error = err as SaveError;
      toast.error(error.message || "Failed to save post", { id: toastId });
    }
  };

  const resetForm = () => {
    setPost({
      title: "",
      subtitle: "",
      content: "",
      tags: [],
      image_url: "",
    });
    setTagInput("");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#001618] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setView("editor")}
              className={`px-4 py-2 rounded-full transition-colors ${view === "editor"
                ? "bg-[#4ECDC4] text-[#001618]"
                : "bg-[#4ECDC4]/10 text-[#4ECDC4] hover:bg-[#4ECDC4]/20"
                }`}
            >
              Editor
            </button>
            <button
              onClick={() => setView("posts")}
              className={`px-4 py-2 rounded-full transition-colors ${view === "posts"
                ? "bg-[#4ECDC4] text-[#001618]"
                : "bg-[#4ECDC4]/10 text-[#4ECDC4] hover:bg-[#4ECDC4]/20"
                }`}
            >
              All Posts
            </button>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-full hover:bg-[#4ECDC4]/20 transition-colors"
          >
            Back to Admin
          </Link>
        </div>

        {view === "editor" ? (
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-md shadow-lg shadow-brand-teal/30 p-6 mb-6">
                {/* Title */}
                <div className="mb-6">
                  <label className="block text-[#4ECDC4] text-sm mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) =>
                      setPost((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full text-white px-4 py-2 border border-[#4ECDC4]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] bg-[#001618] placeholder-white/50"
                    placeholder="Enter post title"
                  />
                </div>

                {/* Subtitle */}
                <div className="mb-6">
                  <label className="block text-[#4ECDC4] text-sm mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={post.subtitle}
                    onChange={(e) =>
                      setPost((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    className="w-full text-white px-4 py-2 border border-[#4ECDC4]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] bg-[#001618] placeholder-white/50"
                    placeholder="Enter post subtitle"
                  />
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label className="block text-[#4ECDC4] text-sm mb-2">
                    Content
                  </label>
                  <TipTapEditor
                    content={post.content}
                    onChange={(content) =>
                      setPost((prev) => ({ ...prev, content }))
                    }
                    postId={post.id}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleSave("draft")}
                  className="px-4 py-2 border border-[#4ECDC4] text-[#4ECDC4] rounded-full hover:bg-[#4ECDC4]/10"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave("published")}
                  className="px-4 py-2 bg-[#4ECDC4] text-[#001618] rounded-full hover:bg-[#4ECDC4]/90"
                >
                  Publish
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80">
              {/* Featured Image */}
              <div className="bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-md shadow-lg shadow-brand-teal/30 p-6 mb-6">
                <h3 className="text-lg font-kiona text-[#4ECDC4] mb-4">
                  Featured Image
                </h3>
                <div className="mb-4">
                  {post.image_url ? (
                    <div className="relative">
                      <div className="relative h-48 w-full mb-2">
                        <Image
                          src={post.image_url}
                          alt="Featured"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <button
                        onClick={() =>
                          setPost((prev) => ({ ...prev, image_url: "" }))
                        }
                        className="absolute top-2 right-2 p-1 bg-[#001618] rounded-full shadow-md hover:bg-[#4ECDC4]/10"
                      >
                        <X className="w-4 h-4 text-[#4ECDC4]" />
                      </button>
                      <p className="text-sm text-white/60 truncate">
                        {post.image_url.split("/").pop()}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={triggerImageUpload}
                      className={`h-48 border-2 border-dashed border-[#4ECDC4]/20 rounded-md flex items-center justify-center cursor-pointer hover:border-[#4ECDC4]/40 transition-colors ${imageLoading ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                      <div className="text-center">
                        <Upload
                          className={`w-8 h-8 text-[#4ECDC4]/40 mx-auto mb-2 ${imageLoading ? "animate-pulse" : ""
                            }`}
                        />
                        <span className="text-sm text-white/60">
                          {imageLoading
                            ? "Uploading..."
                            : "Click to upload image"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-[#001618] border-2 border-[#4ECDC4]/20 rounded-md shadow-lg shadow-brand-teal/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-kiona text-[#4ECDC4]">
                    Blog Tags
                  </h3>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-[#4ECDC4]/40 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#001618] border border-[#4ECDC4]/20 rounded-md shadow-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Add tags to your blog that are one or two word
                      descriptions so when people search for topics they will
                      find this blog.
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#4ECDC4]/10 text-[#4ECDC4] rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 px-3 py-2 border border-[#4ECDC4]/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] bg-[#001618] placeholder-white/50 text-sm"
                    placeholder="Add a tag"
                  />
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Press Enter to add a tag
                </p>
              </div>
            </div>
          </div>
        ) : (
          <BlogPosts onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
}
