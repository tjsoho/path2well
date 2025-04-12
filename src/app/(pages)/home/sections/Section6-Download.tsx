"use client";

import { motion } from "framer-motion";
import { EditableText } from "@/components/pageEditor/EditableText";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DownloadSectionProps {
    isEditing?: boolean;
    content?: {
        heading?: string;
        subheading?: string;
        benefits?: Array<{
            title: string;
            description: string;
        }>;
    };
    onUpdate?: (id: string, value: string) => void;
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
    const safeContent = {
        heading: content.heading || "Download your guide to a healthier life",
        subheading: content.subheading || "Ready to take control of your wellness journey? Download our complimentary guide packed with expert tips, advice, and insights to help you achieve optimal health and lasting well-being.",
        benefits: content.benefits || defaultBenefits,
    };

    return (
        <section className="relative bg-white py-20 md:py-32 overflow-hidden">
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
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-100px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="relative bg-white rounded-lg p-4 border border-brand-teal/30 shadow-[0_0_10px_rgba(11,165,165,0.1)] hover:shadow-[0_0_15px_rgba(11,165,165,0.2)] transition-shadow"
                                >
                                    {/* Connector Lines */}
                                    {index < safeContent.benefits.length - 1 && (
                                        <>
                                            {/* Horizontal connector */}
                                            {index % 2 !== 1 && (
                                                <div className="hidden lg:block absolute right-[-1rem] top-1/2 w-8 h-[1px] bg-gradient-to-r from-brand-teal/50 to-transparent"></div>
                                            )}
                                            {/* Vertical connector */}
                                            {index < safeContent.benefits.length - 2 && (
                                                <div className="hidden lg:block absolute bottom-[-1rem] left-1/2 w-[1px] h-8 bg-gradient-to-b from-brand-teal/50 to-transparent"></div>
                                            )}
                                        </>
                                    )}

                                    {/* Dot */}
                                    <div className="w-3 h-3 rounded-full border border-brand-teal flex items-center justify-center mb-3">
                                        <div className="w-1 h-1 rounded-full bg-brand-teal"></div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-black font-medium mb-1 text-xs md:text-sm">{benefit.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{benefit.description}</p>
                                </motion.div>
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
                        >
                            Download your free guide
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
