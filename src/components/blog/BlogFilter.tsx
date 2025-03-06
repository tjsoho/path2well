"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface BlogFilterProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function BlogFilter({ tags, onTagsChange }: BlogFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    onTagsChange(newSelectedTags);
  };

  return (
    <div className="sticky top-8">
      <div className="bg-white/80 backdrop-blur-md rounded-md shadow-sm p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-brand-brown-dark/20 focus:outline-none focus:border-brand-brown-dark transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown-dark/40" />
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-md shadow-sm p-6">
        <h3 className="text-lg font-kiona text-brand-brown-dark mb-6">
          Filter by Topics
        </h3>
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <label key={tag} className="cursor-pointer group w-fit">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
                className="hidden"
              />
              <span
                className={`transition-all block w-full px-4 py-2 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-brand-brown-dark text-brand-cream shadow-md"
                    : "bg-brand-brown-dark/5 text-brand-brown-dark group-hover:bg-brand-brown-dark/10"
                }`}
              >
                {tag}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
