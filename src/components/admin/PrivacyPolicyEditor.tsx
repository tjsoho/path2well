"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { EditableText } from "@/components/pageEditor/EditableText";
import { Button } from "@/components/ui/Button";
import { Trash, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

interface PolicySection {
    title: string;
    content: string;
}

interface PrivacyPolicyContent {
    heroHeading?: string;
    heroSubheading?: string;
    sections: PolicySection[];
}

export function PrivacyPolicyEditor() {
    const [content, setContent] = useState<PrivacyPolicyContent | null>(null);
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
            .eq("page_id", "privacy-policy")
            .eq("section_id", "PrivacyContent")
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
                { title: "New Policy Title", content: "Policy details..." },
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
            .eq("page_id", "privacy-policy")
            .eq("section_id", "PrivacyContent");
        setSaving(false);
        if (!error) {
            toast.success("Privacy Policy updated!");
            setIsEditing(false);
        } else {
            toast.error("Failed to save. Try again.");
        }
    }

    function PublishToast({ tId }: { tId: string }) {
        const [seconds, setSeconds] = useState(120);
        const intervalRef = useRef<NodeJS.Timeout | null>(null);

        useEffect(() => {
            intervalRef.current = setInterval(() => {
                setSeconds((s) => Math.max(s - 1, 0));
            }, 1000);
            return () => clearInterval(intervalRef.current!);
        }, [tId]);

        useEffect(() => {
            if (seconds === 0) {
                toast.dismiss(tId);
                if (intervalRef.current) clearInterval(intervalRef.current);
                // Show refresh toast and reload page
                const refreshToastId = toast("Page Refresh in 3 seconds", { duration: 3000 });
                setTimeout(() => {
                    toast.dismiss(refreshToastId);
                }, 3000);
                window.location.reload();
            }
        }, [seconds, tId]);

        return (
            <div className="flex flex-col items-center gap-2 p-4 bg-[#71cec4] rounded-lg">
                <div className="text-lg font-bold text-brand-black">Publishing your changes...</div>
                <div className="text-sm text-brand-black">Please wait <span className="font-mono">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span> for content to be updated.</div>
                <button
                    className="mt-2 px-3 py-1 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
                    onClick={() => toast.dismiss(tId)}
                >
                    Close
                </button>
            </div>
        );
    }

    async function handlePublish() {
        const deployHookUrl = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK_URL;
        if (!deployHookUrl) {
            toast.error("Deploy hook URL is not configured");
            return;
        }
        toast.custom((t) => <PublishToast tId={t.id} />, { duration: 120000 });
        try {
            await fetch(deployHookUrl, { method: "POST" });
        } catch {
            toast.error("Failed to trigger deployment");
        }
    }

    if (loading) return <div className="text-[#4ECDC4]">Loading...</div>;
    if (!content) return <div className="text-pink-400">No privacy policy found.</div>;

    return (
        <div className="rounded-xl border-2 border-[#4ECDC4]/30 bg-[#001618]/90 shadow-lg shadow-brand-teal/20 p-6 backdrop-blur-xl my-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-wide font-kiona drop-shadow">Privacy Policy Editor</h2>
                <div className="flex gap-2">
                    <Button onClick={() => setIsEditing((v) => !v)} variant="secondary" className="border-[#4ECDC4] text-[#4ECDC4]">
                        {isEditing ? "Stop Editing" : "Edit"}
                    </Button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 font-bold text-white hover:bg-pink-500/70 border-brand-teal transition-all duration-300"
                        onClick={handlePublish}
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                        >
                            <path d="M12 19V6M5 12l7-7 7 7" />
                        </svg>
                        <span>Publish</span>
                    </button>
                </div>
            </div>
            <div className="mb-8">
                <EditableText
                    id="heroHeading"
                    type="heading"
                    content={content.heroHeading || "Privacy Policy"}
                    isEditing={isEditing}
                    onUpdate={handleUpdateField}
                    className="text-3xl md:text-4xl text-white mb-4 font-kiona"
                />
                <EditableText
                    id="heroSubheading"
                    type="paragraph"
                    content={content.heroSubheading || "Your privacy is our priority."}
                    isEditing={isEditing}
                    onUpdate={handleUpdateField}
                    className="text-lg text-white/80 mb-2 font-kiona"
                />
            </div>
            <div className="space-y-6">
                {content.sections?.map((section: PolicySection, idx: number) => (
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
                                title="Delete policy section"
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
                        <Plus className="w-5 h-5" /> Add Policy Section
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