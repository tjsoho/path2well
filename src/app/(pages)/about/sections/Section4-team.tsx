"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";

interface TeamMember {
    image: string;
    name: string;
    role: string;
}

interface TeamSectionProps {
    isEditing?: boolean;
    content?: {
        label: string;
        heading: string;
        subheading: string;
        team: TeamMember[];
    };
    onUpdate?: (id: string, value: string) => void;
}

export function TeamSection({
    isEditing = false,
    content = {
        label: "TEAM",
        heading: "Meet the Path2Well Team",
        subheading: "Allow for now 3 team members with an image, name and brief bio. Make these cards that can grow in rows and columns as the business grows.",
        team: [
            {
                image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2940&auto=format&fit=crop",
                name: "Cameroon Williamson",
                role: "Chief Executive Officer and Co-Founder"
            },
            {
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2940&auto=format&fit=crop",
                name: "Cameroon Williamson",
                role: "Chief Executive Officer and Co-Founder"
            },
            {
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2938&auto=format&fit=crop",
                name: "Cameroon Williamson",
                role: "Chief Executive Officer and Co-Founder"
            }
        ]
    },
    onUpdate,
}: TeamSectionProps) {
    return (
        <section className="relative bg-brand-purple text-white py-24 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                <Image
                    src="/images/servicesbg4.png"
                    alt="Technology Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        {/* Label with lines */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-white/30"></div>
                            <EditableText
                                id="label"
                                type="paragraph"
                                content={content.label}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-white/70 text-sm tracking-[0.2em] uppercase"
                            />
                            <div className="w-12 h-[1px] bg-white/30"></div>
                        </div>

                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <EditableText
                                id="heading"
                                type="heading"
                                content={content.heading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-3xl md:text-4xl font-medium"
                            />
                        </motion.div>

                        {/* Subheading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-2xl mx-auto"
                        >
                            <EditableText
                                id="subheading"
                                type="paragraph"
                                content={content.subheading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-white/70 text-lg"
                            />
                        </motion.div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="rounded-3xl overflow-hidden aspect-square">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={400}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                {/* Text Content */}
                                <div className="mt-6 text-left pl-2">
                                    <h3 className="text-base font-medium mb-1">{member.name}</h3>
                                    <p className="text-white/70 text-sm">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 