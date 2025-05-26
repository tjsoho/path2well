"use client";

import { EditableText } from "@/components/pageEditor/EditableText";
import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface ServicesProps {
    isEditing?: boolean;
    content?: {
        heading?: string;
        subheading?: string;
    };
    onUpdate?: (id: string, value: string) => void;
}

export function ServicesSection({
    isEditing = false,
    content = {},
    onUpdate,
}: ServicesProps) {
    const safeContent = {
        heading: content.heading || "Begin your journey to optimal health today.",
        subheading: content.subheading || "Path2Well offers a future-forward approach to wellness,\nblending cutting-edge science with personalised care.",
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 0.2,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="relative bg-brand-teal rounded-xl overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Tech pattern overlay */}
                    <motion.div
                        className="absolute inset-0"
                        variants={imageVariants}
                    >
                        <Image
                            src="/images/bg1.png"
                            alt="Tech pattern"
                            fill
                            className="object-cover opacity-80"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="relative p-12 md:p-16">
                        <div className="max-w-2xl">
                            <motion.div variants={itemVariants}>
                                <EditableText
                                    id="heading"
                                    type="heading"
                                    content={safeContent.heading}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-3xl md:text-4xl text-white font-light mb-6 whitespace-pre-line"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <EditableText
                                    id="subheading"
                                    type="paragraph"
                                    content={safeContent.subheading}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-white/80 text-lg mb-8"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    icon={Search}
                                    iconPosition="left"
                                    className="mt-4"
                                    // directo to /services
                                    
                                >
                                    Explore our services
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 