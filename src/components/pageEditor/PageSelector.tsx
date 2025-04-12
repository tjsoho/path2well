import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Page } from "@/types/pageEditor";
import { PAGES } from "@/lib/pageEditorConstants";

interface PageSelectorProps {
    selectedPage: string | null;
    onPageSelect: (pageId: string) => void;
}

export function PageSelector({ selectedPage, onPageSelect }: PageSelectorProps) {
    const [pagesOpen, setPagesOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg 
                  bg-brand-black/60 text-brand-white hover:bg-brand-teal/10 
                  border border-brand-teal/30 hover:border-brand-teal
                  transition-all duration-300"
            >
                <span className="min-w-[120px] font-chocolates">
                    {selectedPage
                        ? PAGES.find((p) => p.id === selectedPage)?.name
                        : "Select Page"}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-brand-teal transition-transform duration-300 ${pagesOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {pagesOpen && (
                <div
                    className="absolute top-full left-0 mt-2 w-52 bg-brand-black/95 
                      rounded-lg border border-brand-teal/30 shadow-lg shadow-brand-teal/20 
                      backdrop-blur-sm py-1 z-50"
                >
                    {PAGES.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => {
                                onPageSelect(page.id);
                                setPagesOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-brand-white 
                      hover:bg-brand-teal/10 transition-colors duration-200
                      font-chocolates"
                        >
                            {page.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
} 