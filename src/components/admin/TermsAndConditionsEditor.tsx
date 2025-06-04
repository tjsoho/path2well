"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { EditableText } from "@/components/pageEditor/EditableText";
import { Button } from "@/components/ui/Button";
import { Trash, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

interface TermsSection {
    title: string;
    content: string;
}

interface TermsContent {
    heroHeading?: string;
    heroSubheading?: string;
    sections: TermsSection[];
}

export function TermsAndConditionsEditor() {
    const [content, setContent] = useState<TermsContent | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    async function fetchContent() {
        setLoading(true);
        const { data } = await supabase
            .from("page_content")
            .select("content")
            .eq("page_id", "terms")
            .eq("section_id", "TermsContent")
            .single();
        if (data) setContent(data.content);
        setLoading(false);
    }

    function handleUpdateField(id: string, value: string) {
        setContent((prev) => prev ? { ...prev, [id]: value } : null);
    }

    function handleUpdateSection(index: number, key: "title" | "content", value: string) {
        setContent((prev) => {
            if (!prev) return prev;
            const updated = { ...prev };
            updated.sections[index][key] = value;
            return updated;
        });
    }

    function handleAddSection() {
        setContent((prev) => prev ? ({
            ...prev,
            sections: [
                ...(prev.sections || []),
                { title: "New Terms Title", content: "Terms details..." },
            ],
        }) : null);
    }

    function handleDeleteSection(index: number) {
        setContent((prev) => prev ? ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index),
        }) : null);
    }

    async function handleSave() {
        setSaving(true);
        const { error } = await supabase
            .from("page_content")
            .update({ content })
            .eq("page_id", "terms")
            .eq("section_id", "TermsContent");
        setSaving(false);
        if (!error) {
            toast.success("Terms & Conditions updated!");
            setIsEditing(false);
        } else {
            toast.error("Failed to save. Try again.");
        }
    }

    if (loading) return <div className="text-[#4ECDC4]">Loading...</div>;
    if (!content) return <div className="text-pink-400">No terms found.</div>;

    return (
        <div className="rounded-xl border-2 border-[#4ECDC4]/30 bg-[#001618]/90 shadow-lg shadow-brand-teal/20 p-6 backdrop-blur-xl mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-wide font-kiona drop-shadow">Terms & Conditions Editor</h2>
                <Button onClick={() => setIsEditing((v) => !v)} variant="secondary" className="border-[#4ECDC4] text-[#4ECDC4]">
                    {isEditing ? "Stop Editing" : "Edit"}
                </Button>
            </div>
            <div className="mb-8">
                <EditableText
                    id="heroHeading"
                    type="heading"
                    content={content.heroHeading || "Terms & Conditions"}
                    isEditing={isEditing}
                    onUpdate={handleUpdateField}
                    className="text-3xl md:text-4xl text-white mb-4 font-kiona"
                />
                <EditableText
                    id="heroSubheading"
                    type="paragraph"
                    content={content.heroSubheading || "Please read these terms carefully."}
                    isEditing={isEditing}
                    onUpdate={handleUpdateField}
                    className="text-lg text-white/80 mb-2 font-kiona"
                />
            </div>
            <div className="space-y-6">
                {content.sections?.map((section: TermsSection, idx: number) => (
                    <div key={idx} className="relative bg-[#001618]/80 border border-[#4ECDC4]/10 rounded-lg p-6 mb-2">
                        <EditableText
                            id={`sections.${idx}.title`}
                            type="heading"
                            content={section.title}
                            isEditing={isEditing}
                            onUpdate={(_, value) => handleUpdateSection(idx, "title", value)}
                            className="text-xl text-[#4ECDC4] font-bold mb-2"
                        />
                        <EditableText
                            id={`sections.${idx}.content`}
                            type="paragraph"
                            content={section.content}
                            isEditing={isEditing}
                            onUpdate={(_, value) => handleUpdateSection(idx, "content", value)}
                            className="text-white/80 mb-2"
                        />
                        {isEditing && (
                            <button
                                onClick={() => handleDeleteSection(idx)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-all duration-300"
                                title="Delete terms section"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
                {isEditing && (
                    <button
                        onClick={handleAddSection}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4ECDC4] text-[#001618] font-bold rounded-lg hover:bg-[#4ECDC4]/90 transition-colors mt-2 shadow-md shadow-[#4ECDC4]/20"
                    >
                        <Plus className="w-5 h-5" /> Add Terms Section
                    </button>
                )}
            </div>
            {isEditing && (
                <div className="flex justify-end mt-8 gap-4">
                    <Button onClick={handleSave} disabled={saving} className="bg-[#4ECDC4] text-[#001618] font-bold hover:bg-[#4ECDC4]/90">
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            )}
        </div>
    );
} 