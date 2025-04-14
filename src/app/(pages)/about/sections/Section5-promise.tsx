"use client";

import { motion } from "framer-motion";
import { EditableText } from "@/components/pageEditor/EditableText";
import Image from "next/image";
import { EditableImage } from "@/components/pageEditor/EditableImage";

interface PromiseCard {
    title: string;
    description: string;
    icon: string;
}

interface PromiseSectionProps {
    isEditing?: boolean;
    content?: {
        label?: string;
        heading?: string;
        subheading?: string;
        cards?: PromiseCard[];
    };
    onUpdate?: (id: string, value: string) => void;
}

const defaultCards = [
    {
        title: "Holistic Wellness",
        description: "A commitment to addressing the whole person, not just a single condition or symptom. This means integrating various approaches and collaborating with other healthcare providers.",
        icon: "/images/icon2.png"
    },
    {
        title: "Scientific Evidence",
        description: "Using evidence-based methods, including genetic and blood testing, to guide our approach. This demonstrates a commitment to using cutting-edge science for accurate diagnoses.",
        icon: "/images/icon2.png"
    },
    {
        title: "Long-Term Health Solutions",
        description: "Focusing on sustainable, long-term wellness rather than quick fixes. This means developing strategies that can be build lasting, positive health habits.",
        icon: "/images/icon2.png"
    },
    {
        title: "Empowerment",
        description: "Equipping clients with the knowledge and tools to take control of their health journey. We believe in educating and empowering clients to actively participate in their own wellness.",
        icon: "/images/icon2.png"
    }
];

export function PromiseSection({
    isEditing = false,
    content = {},
    onUpdate,
}: PromiseSectionProps) {
    // Parse cards data from content or use default
    const parseCards = () => {
        if (content?.cards) {
            try {
                if (typeof content.cards === 'string') {
                    return JSON.parse(content.cards);
                }
                return content.cards;
            } catch (error) {
                console.error('Error parsing cards data:', error);
                return defaultCards;
            }
        }
        return defaultCards;
    };

    // Ensure content has all required fields with safe defaults
    const safeContent = {
        label: content?.label || "OUR COMMITMENT",
        heading: content?.heading || "Our Promise to You",
        subheading: content?.subheading || "Our promise is simple: to provide the highest quality, most personalised care. Everything we do at Path2Well reflects our dedication to these core principles:",
        cards: parseCards()
    };

    // Handle card updates
    const handleCardUpdate = (index: number, field: keyof PromiseCard, value: string) => {
        if (!onUpdate) return;

        try {
            const updatedCards = [...safeContent.cards];
            updatedCards[index] = {
                ...updatedCards[index],
                [field]: value
            };

            onUpdate('cards', JSON.stringify(updatedCards));
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    return (
        <section className="relative bg-gradient-to-br from-white to-teal-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        {/* Label with line */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-brand-teal"></div>
                            <EditableText
                                id="label"
                                type="paragraph"
                                content={safeContent.label}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-brand-teal text-sm tracking-[0.2em] uppercase"
                            />
                            <div className="w-12 h-[1px] bg-brand-teal"></div>
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
                                content={safeContent.heading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900"
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
                                content={safeContent.subheading}
                                isEditing={isEditing}
                                onUpdate={onUpdate}
                                className="text-gray-600 text-lg"
                            />
                        </motion.div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {safeContent.cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-teal-200"
                            >
                                <div className="flex-shrink-0 mb-4">
                                    <div className="w-12 h-12 rounded-full border border-brand-teal flex items-center justify-center">
                                        <EditableImage
                                            src={card.icon}
                                            alt={card.title}
                                            width={28}
                                            height={28}
                                            className="animate-spin-slow animate-scale-random-1"
                                            isEditing={isEditing}
                                            onUpdate={(value) => handleCardUpdate(index, 'icon', value)}
                                        />
                                    </div>
                                </div>
                                <EditableText
                                    id={`cards.${index}.title`}
                                    type="heading"
                                    content={card.title}
                                    isEditing={isEditing}
                                    onUpdate={(value) => handleCardUpdate(index, 'title', value)}
                                    className="text-sm font-medium mb-2 text-gray-900"
                                />
                                <EditableText
                                    id={`cards.${index}.description`}
                                    type="paragraph"
                                    content={card.description}
                                    isEditing={isEditing}
                                    onUpdate={(value) => handleCardUpdate(index, 'description', value)}
                                    className="text-gray-600 text-sm leading-relaxed"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 