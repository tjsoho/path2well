"use client";

import { useEffect, useState } from "react";
import { EditableText } from "@/components/pageEditor/EditableText";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EditableBenefitCard, Benefit } from "@/components/pageEditor/EditableBenefitCard";
import { supabase } from "@/lib/supabase";
import React from "react";

interface DownloadSectionProps {
    isEditing?: boolean;
    content?: {
        heading?: string;
        subheading?: string;
        benefits?: Benefit[];
    };
    onUpdate?: (id: string, value: string) => void;
}

interface PDFFile {
    id: string;
    name: string;
    url: string;
    is_active: boolean;
}

const defaultBenefits = [
    {
        title: "Reclaim Your Energy",
        description: "Feel revitalized and ready to conquer your day with tailored IV therapy and targeted wellness plans."
    },
    {
        title: "Boost Your Immunity",
        description: "Strengthen your body's natural defenses and reduce your susceptibility to illness with our personalized health protocols."
    },
    {
        title: "Optimise Your Performance",
        description: "Elevate your physical and mental performance to peak levels with science-backed strategies designed to meet your specific needs."
    },
    {
        title: "Deepen Your Understanding",
        description: "Gain invaluable insights into your genetic predispositions and unlock the secrets to your optimal health journey."
    },
    {
        title: "Experience Personalised Care",
        description: "Benefit from a truly individualised approach, receiving bespoke treatments and unwavering support every step of the way."
    },
    {
        title: "Achieve Lasting Well-being",
        description: "Enjoy a life of enhanced health and wellness, experiencing sustainable results that transform how you feel and function."
    }
];

export function DownloadSection({
    isEditing = false,
    content = {},
    onUpdate,
}: DownloadSectionProps) {
    const [activePDF, setActivePDF] = useState<PDFFile | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchActivePDF();
    }, []);

    const fetchActivePDF = async () => {
        try {
            const { data, error } = await supabase
                .from('pdf_downloads')
                .select('*')
                .eq('is_active', true)
                .single();

            if (error) throw error;
            setActivePDF(data);
        } catch (error) {
            console.error('Error fetching active PDF:', error);
        }
    };

    const safeContent = {
        heading: content.heading || "Download your guide to a healthier life",
        subheading: content.subheading || "Ready to take control of your wellness journey? Download our complimentary guide packed with expert tips, advice, and insights to help you achieve optimal health and lasting well-being.",
        benefits: (() => {
            try {
                if (Array.isArray(content.benefits)) {
                    return content.benefits;
                }
                if (typeof content.benefits === 'string') {
                    const parsed = JSON.parse(content.benefits);
                    return Array.isArray(parsed) ? parsed : defaultBenefits;
                }
                return defaultBenefits;
            } catch (error) {
                console.error('Error parsing benefits:', error);
                return defaultBenefits;
            }
        })(),
    };

    const handleBenefitUpdate = (index: number, updatedBenefit: Benefit) => {
        if (!onUpdate) return;

        const newBenefits = [...safeContent.benefits];
        newBenefits[index] = updatedBenefit;
        onUpdate('benefits', JSON.stringify(newBenefits));
    };

    const handleDownload = () => {
        if (isEditing) return;
        if (activePDF?.url) {
            setShowModal(true);
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        if (!leadName.trim() || !leadEmail.trim()) {
            setError("Please enter your name and email.");
            setIsSubmitting(false);
            return;
        }
        // Basic email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(leadEmail)) {
            setError("Please enter a valid email address.");
            setIsSubmitting(false);
            return;
        }
        try {
            const { error: insertError } = await supabase
                .from("leads")
                .insert([{ name: leadName, email: leadEmail }]);
            if (insertError) throw insertError;
            setShowModal(false);
            setLeadName("");
            setLeadEmail("");
            setTimeout(() => {
                if (activePDF?.url) {
                    window.open(activePDF.url, '_blank');
                }
            }, 200);
        } catch {
            setError("Failed to save your info. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative bg-white py-20 md:py-32 overflow-hidden">
            {/* Modal for lead capture */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-xl border-2 border-[#4ECDC4]/30 bg-[#001618]/90 shadow-lg shadow-brand-teal/20 p-8 backdrop-blur-xl">
                        <button
                            className="absolute top-2 right-2 text-[#4ECDC4]/60 hover:text-[#4ECDC4] text-2xl"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-center text-[#4ECDC4] tracking-wide font-kiona drop-shadow">Get Your Free Guide</h2>
                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[#4ECDC4] mb-1 font-semibold">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#001618] border border-[#4ECDC4]/30 rounded-md px-4 py-2 text-white placeholder-[#4ECDC4]/40 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                                    value={leadName}
                                    onChange={e => setLeadName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-[#4ECDC4] mb-1 font-semibold">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#001618] border border-[#4ECDC4]/30 rounded-md px-4 py-2 text-white placeholder-[#4ECDC4]/40 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] transition-all"
                                    value={leadEmail}
                                    onChange={e => setLeadEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            {error && <div className="text-pink-400 text-sm font-semibold">{error}</div>}
                            <button
                                type="submit"
                                className="w-full bg-[#4ECDC4] text-[#001618] font-bold py-2 rounded-lg hover:bg-[#4ECDC4]/90 transition-colors disabled:opacity-50 mt-2 shadow-md shadow-[#4ECDC4]/20"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Get the Guide"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Gradient circle background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-1/2 h-[600px] -left-64 top-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-brand-teal/10 to-white"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Benefits Grid - Left Column */}
                    <div className="relative order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            {safeContent.benefits.map((benefit, index) => (
                                <EditableBenefitCard
                                    key={index}
                                    benefit={benefit}
                                    index={index}
                                    isEditing={isEditing}
                                    onUpdate={handleBenefitUpdate}
                                    totalBenefits={safeContent.benefits.length}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content - Right Column */}
                    <div className="lg:pl-12 flex flex-col justify-center order-1 lg:order-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-[1px] bg-brand-teal"></div>
                            <span className="text-sm uppercase tracking-[0.2em] text-brand-teal">
                                BENEFITS
                            </span>
                        </div>

                        <EditableText
                            id="heading"
                            type="heading"
                            content={safeContent.heading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-3xl md:text-4xl text-black mb-6"
                        />

                        <EditableText
                            id="subheading"
                            type="paragraph"
                            content={safeContent.subheading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-gray-600 mb-8"
                        />

                        <Button
                            icon={Download}
                            iconPosition="left"
                            className="self-start"
                            onClick={handleDownload}
                            disabled={!activePDF}
                        >
                            {activePDF ? 'Download your free guide' : 'Guide not available'}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
