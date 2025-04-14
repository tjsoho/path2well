"use client";

import { useState, useEffect } from "react";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableImage } from "@/components/pageEditor/EditableImage";
import { motion } from "framer-motion";

interface TeamMember {
    image: string;
    name: string;
    role: string;
}

interface TeamContent {
    label: string;
    heading: string;
    subheading: string;
    team: string | TeamMember[];
    backgroundImage?: string;
}

interface TeamSectionProps {
    isEditing: boolean;
    content: TeamContent;
    onUpdate: (field: string, value: string) => void;
}

// Default team members
const defaultTeamMembers = [
    {
        image: "/images/team1.jpg",
        name: "Dr. Sarah Mitchell",
        role: "Medical Director"
    },
    {
        image: "/images/team2.jpg",
        name: "Dr. James Wilson",
        role: "Genetic Testing Specialist"
    },
    {
        image: "/images/team3.jpg",
        name: "Dr. Emily Chen",
        role: "IV Therapy Expert"
    }
];

export function TeamSection({ isEditing, content, onUpdate }: TeamSectionProps) {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
        try {
            const parsedTeam = typeof content.team === 'string'
                ? JSON.parse(content.team)
                : content.team;
            setTeamMembers(parsedTeam || defaultTeamMembers);
        } catch (error) {
            console.error('Error parsing team data:', error);
            setTeamMembers(defaultTeamMembers);
        }
    }, [content.team]);

    const handleTeamUpdate = (index: number, field: keyof TeamMember, value: string) => {
        const updatedTeam = [...teamMembers];
        updatedTeam[index] = { ...updatedTeam[index], [field]: value };
        onUpdate('team', JSON.stringify(updatedTeam));
    };

    // Ensure content has all required fields with safe defaults
    const safeContent = {
        label: content.label || "TEAM",
        heading: content.heading || "Meet Our Team",
        subheading: content.subheading || "Expert Healthcare Professionals",
        backgroundImage: content.backgroundImage || "/images/servicesbg4.png"
    };

    return (
        <section className="relative bg-brand-purple text-white py-24 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                <EditableImage
                    src={safeContent.backgroundImage}
                    alt="Technology Background"
                    fill
                    className="object-cover"
                    isEditing={isEditing}
                    onUpdate={(value) => onUpdate("backgroundImage", value)}
                    width={1920}
                    height={1080}
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
                                isEditing={isEditing}
                                content={safeContent.label}
                                onUpdate={(value) => onUpdate('label', value)}
                                className="text-white/70 text-sm tracking-[0.2em] uppercase"
                                id="label"
                                type="subtext"
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
                                isEditing={isEditing}
                                content={safeContent.heading}
                                onUpdate={(value) => onUpdate('heading', value)}
                                className="text-3xl md:text-4xl font-medium"
                                id="heading"
                                type="heading"
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
                                isEditing={isEditing}
                                content={safeContent.subheading}
                                onUpdate={(value) => onUpdate('subheading', value)}
                                className="text-white/70 text-lg"
                                id="subheading"
                                type="paragraph"
                            />
                        </motion.div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="rounded-3xl overflow-hidden aspect-square relative bg-white/10">
                                    <EditableImage
                                        isEditing={isEditing}
                                        src={member.image}
                                        alt={member.name}
                                        onUpdate={(value) => handleTeamUpdate(index, 'image', value)}
                                        className="w-full h-full object-cover"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                                {/* Text Content */}
                                <div className="mt-6 text-left pl-2">
                                    <EditableText
                                        isEditing={isEditing}
                                        content={member.name}
                                        onUpdate={(value) => handleTeamUpdate(index, 'name', value)}
                                        className="text-base font-medium mb-1"
                                        id={`team.${index}.name`}
                                        type="heading"
                                    />
                                    <EditableText
                                        isEditing={isEditing}
                                        content={member.role}
                                        onUpdate={(value) => handleTeamUpdate(index, 'role', value)}
                                        className="text-white/70 text-sm"
                                        id={`team.${index}.role`}
                                        type="paragraph"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 