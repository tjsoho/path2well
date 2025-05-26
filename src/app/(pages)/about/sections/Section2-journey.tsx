"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";

interface JourneySectionProps {
    isEditing?: boolean;
    content?: Record<string, string>;
    onUpdate?: (id: string, value: string) => void;
}

export function JourneySection({
    isEditing = false,
    content = {},
    onUpdate,
}: JourneySectionProps) {
    const safeContent = {
        heading: content.heading || "My Journey to Path2Well",
        text: content.text || "Write a compelling and personal story about your background, what inspired you to create Path2Well, and your passion for helping others achieve optimal health. Be authentic and connect emotionally with your readers. Highlight any relevant qualifications or experience, but focus on the story rather than a simple list of credentials."
    };

    return (
        <section className="relative bg-gradient-to-b from-white to-gray-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Icon with Lines */}
                    <div className="flex items-center justify-center gap-4 ">
                        <div className="w-24 h-[1px] bg-gradient-to-l from-brand-teal to-white" />
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/logo.png"
                                alt="Science Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-brand-teal to-white" />
                    </div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6"
                    >
                        <EditableText
                            id="heading"
                            type="heading"
                            content={safeContent.heading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-2xl md:text-3xl font-medium text-brand-teal"
                        />
                        <EditableText
                            id="text"
                            type="paragraph"
                            content={safeContent.text}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-black/80 text-lg leading-relaxed"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
