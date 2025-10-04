"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableImage } from "@/components/pageEditor/EditableImage";
import { EditableTeamMember, TeamMember } from "@/components/pageEditor/EditableTeamMember";
import { motion } from "framer-motion";

interface TeamContent {
    label?: string;
    heading?: string;
    subheading?: string;
    team?: string | TeamMember[];
    backgroundImage?: string;
}

interface TeamSectionProps {
    isEditing?: boolean;
    content?: TeamContent;
    onUpdate?: (field: string, value: string) => void;
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

export function TeamSection({
    isEditing = false,
    content = {},
    onUpdate
}: TeamSectionProps) {


    // Parse team data once during initialization
    const parseTeamData = useCallback(() => {
        try {
            // If team is a string, parse it
            if (typeof content.team === 'string') {
                
                try {
                    const parsedTeam = JSON.parse(content.team);
                    
                    return parsedTeam;
                } catch (parseError) {
                    console.error('Error parsing team JSON:', parseError);
                    return defaultTeamMembers;
                }
            }
            // If team is already an array, use it
            if (Array.isArray(content.team)) {
                
                return content.team;
            }
            // If team is undefined or null, use default team members
            
            return defaultTeamMembers;
        } catch (error) {
            console.error('Error parsing team data:', error);
            return defaultTeamMembers;
        }
    }, [content.team]);

    // Initialize state with parsed team data
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(parseTeamData());

    // Update team members when content.team changes
    useEffect(() => {
        
        const newTeamData = parseTeamData();
        
        setTeamMembers(newTeamData);
    }, [content.team, parseTeamData]);

    // Create a safe content object that updates with content changes
    const safeContent = useMemo(() => ({
        label: content.label ?? "TEAM",
        heading: content.heading ?? "Meet Our Team",
        subheading: content.subheading ?? "Expert Healthcare Professionals",
        backgroundImage: content.backgroundImage ?? "/images/servicesbg4.png",
    }), [content.label, content.heading, content.subheading, content.backgroundImage]);

    // Log content updates
    useEffect(() => {
        
    }, [safeContent, teamMembers]);

    // Handle team member field updates
    const handleTeamUpdate = (index: number, updatedMember: TeamMember) => {
        if (onUpdate) {
            // Create a new array with the updated team member
            const updatedTeam = [...teamMembers];
            updatedTeam[index] = updatedMember;

            // Update local state immediately
            setTeamMembers(updatedTeam);

            // Convert the array to a string to save in the database
            const teamString = JSON.stringify(updatedTeam);
            onUpdate('team', teamString);
        }
    };

    const handleDeleteTeamMember = (index: number) => {
        if (onUpdate) {
            const updatedTeam = [...teamMembers];
            updatedTeam.splice(index, 1);
            onUpdate('team', JSON.stringify(updatedTeam));
        }
    };

    const handleAddTeamMember = () => {
        if (onUpdate) {
            const newMember = {
                image: "/images/team1.jpg",
                name: "New Team Member",
                role: "Add role here",
            };
            const updatedTeam = [...teamMembers, newMember];
            onUpdate('team', JSON.stringify(updatedTeam));
        }
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
                    onUpdate={(value) => onUpdate?.("backgroundImage", value)}
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
                            {isEditing ? (
                                <EditableText
                                    id="label"
                                    type="subtext"
                                    content={safeContent.label}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-white/70 text-sm tracking-[0.2em] uppercase"
                                />
                            ) : (
                                <span className="text-white/70 text-sm tracking-[0.2em] uppercase">
                                    {safeContent.label}
                                </span>
                            )}
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
                            {isEditing ? (
                                <EditableText
                                    id="heading"
                                    type="heading"
                                    content={safeContent.heading}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-3xl md:text-4xl font-medium"
                                />
                            ) : (
                                <h2 className="text-3xl md:text-4xl font-medium">
                                    {safeContent.heading}
                                </h2>
                            )}
                        </motion.div>

                        {/* Subheading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="max-w-2xl mx-auto"
                        >
                            {isEditing ? (
                                <EditableText
                                    id="subheading"
                                    type="paragraph"
                                    content={safeContent.subheading}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-white/70 text-lg"
                                />
                            ) : (
                                <p className="text-white/70 text-lg">
                                    {safeContent.subheading}
                                </p>
                            )}
                        </motion.div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => {
                            
                            return (
                                <motion.div
                                    key={`team-member-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                    className="relative group"
                                >
                                    {isEditing ? (
                                        <EditableTeamMember
                                            member={member}
                                            index={index}
                                            isEditing={isEditing}
                                            onUpdate={handleTeamUpdate}
                                            onDelete={handleDeleteTeamMember}
                                        />
                                    ) : (
                                        <>
                                            {/* Card */}
                                            <div className="rounded-3xl overflow-hidden aspect-square relative bg-white/10">
                                                <EditableImage
                                                    isEditing={false}
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="w-full h-full object-cover"
                                                    width={400}
                                                    height={400}
                                                />
                                            </div>
                                            {/* Text Content */}
                                            <div className="mt-6 text-left pl-2">
                                                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                                                <p className="text-white/70 text-sm">{member.role}</p>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            );
                        })}
                        {isEditing && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + teamMembers.length * 0.1 }}
                                className="relative group"
                            >
                                <button
                                    onClick={handleAddTeamMember}
                                    className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-white/10 rounded-3xl border-2 border-dashed border-white/30 hover:border-white/50 transition-colors group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    </div>
                                    <span className="mt-4 text-white font-medium">Add New Team Member</span>
                                    <span className="mt-2 text-white/50 text-sm">Click to create a new team member card</span>
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 