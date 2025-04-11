"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";

interface ApproachSectionProps {
    isEditing?: boolean;
    content?: {
        label: string;
        heading: string;
        text: string;
    };
    onUpdate?: (id: string, value: string) => void;
}

export function ApproachSection({
    isEditing = false,
    content = {
        label: "PHILOSOPHY",
        heading: "Our Approach to Personalised Wellness",
        text: "At Path2Well, we believe true wellness is achieved through a unique blend of scientific precision and holistic care. We go beyond addressing symptoms; we delve into the root causes of your health concerns.\n\nOur approach begins with cutting-edge genetic and blood testing, providing a deep understanding of your unique biological blueprint.\n\nThis data, combined with our expertise in IV therapy and integrative wellness strategies, allows us to create a truly personalised plan designed to optimise your health and well-being from the inside out. We don't just treat; we empower you to take control of your health journey."
    },
    onUpdate,
}: ApproachSectionProps) {
    return (
        <section className="relative bg-[#001618] text-white py-24 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="/images/tech4.png"
                    alt="Technology Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-[1px] bg-brand-teal"></div>
                                <EditableText
                                    id="label"
                                    type="subtext"
                                    content={content.label}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-brand-teal text-sm tracking-[0.2em] uppercase"
                                />
                            </div>
                            <EditableText
                                id="heading"
                                type="heading"
                                content={content.heading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
                            />
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <EditableText
                            id="text"
                            type="paragraph"
                            content={content.text}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white/80 text-lg leading-relaxed whitespace-pre-line"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 