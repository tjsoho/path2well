"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface ImageEditorProps {
  images: Record<string, string>;
  onImageChange: (key: string, value: string) => void;
}

export function ImageEditor({ images, onImageChange }: ImageEditorProps) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOver(key);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  };

  const handleDrop = async (e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOver(null);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file, key);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, key);
    }
  };

  const handleImageUpload = async (file: File, key: string) => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your server/storage
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        onImageChange(key, data.url);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-lg font-chocolates text-brand-white mb-4">Images</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(images).map(([key, src]) => (
          <div key={key} className="space-y-2">
            <label className="block text-brand-white/90 font-chocolates">
              {key}
            </label>
            <div
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors
                ${
                  dragOver === key
                    ? "border-brand-teal"
                    : "border-brand-teal/30"
                }
                ${!src ? "bg-brand-black/40" : ""}`}
              onDragOver={(e) => handleDragOver(e, key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, key)}
            >
              {src ? (
                <Image src={src} alt={key} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-brand-teal/50" />
                </div>
              )}

              <label
                className="absolute inset-0 cursor-pointer flex items-center justify-center
                          bg-black/0 hover:bg-black/40 transition-colors group"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, key)}
                />
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity
                               text-white font-chocolates flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Change Image
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
