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
    <div className="sticky top-4 md:top-8">
      {/* Search Box */}
      <div className="bg-[#001618]/40 backdrop-blur-lg rounded-xl border border-[#4ECDC4]/20 shadow-lg shadow-[#4ECDC4]/10 p-3 md:p-4 mb-4 md:mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-2 md:py-2.5 bg-transparent border-b border-[#4ECDC4]/30 focus:outline-none focus:border-[#4ECDC4]/50 text-white placeholder-[#4ECDC4]/50 transition-colors text-sm md:text-base"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4ECDC4]/50 pointer-events-none" />
        </div>
      </div>

      {/* Tags Filter */}
      <div className="bg-[#001618]/40 backdrop-blur-lg rounded-xl border border-[#4ECDC4]/20 shadow-lg shadow-[#4ECDC4]/10 p-3 md:p-4">
        <h3 className="text-base md:text-lg font-kiona text-white mb-3 md:mb-4 tracking-wider">
          Filter by Topics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
          {tags.map((tag) => (
            <label key={tag} className="cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
                className="hidden"
              />
              <span
                className={`transition-all block w-full text-center px-2 py-1.5 rounded-full text-xs md:text-sm ${selectedTags.includes(tag)
                  ? "bg-[#4ECDC4] text-[#001618] shadow-md shadow-[#4ECDC4]/20"
                  : "bg-[#4ECDC4]/10 text-white group-hover:bg-[#4ECDC4]/20 border border-[#4ECDC4]/20"
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
