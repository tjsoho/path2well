"use client";

import { motion } from "framer-motion";
import { EditableText } from '@/components/pageEditor/EditableText';

interface TermsContent {
    heroHeading: string;
    heroSubheading: string;
    lastUpdated: string;
    sections: {
        title: string;
        content: string;
    }[];
}

interface TermsContentProps {
    content?: TermsContent;
    isEditing?: boolean;
    onUpdate?: (id: string, value: string) => void;
}

const defaultContent: TermsContent = {
    heroHeading: "Terms and Conditions",
    heroSubheading: "Please read these terms carefully before using our services.",
    lastUpdated: "Last Updated: March 15, 2024",
    sections: [
        {
            title: "Agreement to Terms",
            content: "By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services."
        },
        {
            title: "Services",
            content: "We provide various wellness and health-related services, including but not limited to:\n\n• Genetic testing and interpretation\n• IV therapy treatments\n• Wellness consultations\n• Health assessments\n\nAll services are subject to availability and may be modified or discontinued at any time."
        },
        {
            title: "User Responsibilities",
            content: "As a user of our services, you agree to:\n\n• Provide accurate and complete information\n• Maintain the confidentiality of your account\n• Not use our services for any illegal purposes\n• Not attempt to interfere with or disrupt our services\n• Comply with all applicable laws and regulations"
        },
        {
            title: "Medical Disclaimer",
            content: "Our services are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
        },
        {
            title: "Payment Terms",
            content: "Payment is required at the time of service unless otherwise arranged. We accept various payment methods, and all prices are subject to change without notice. Refunds are handled on a case-by-case basis."
        },
        {
            title: "Intellectual Property",
            content: "All content, including but not limited to text, graphics, logos, and software, is the property of Path2Well and is protected by intellectual property laws. You may not use our content without our express written permission."
        },
        {
            title: "Limitation of Liability",
            content: "To the maximum extent permitted by law, Path2Well shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services."
        },
        {
            title: "Contact Information",
            content: "If you have any questions about these Terms and Conditions, please contact us at:\n\nEmail: legal@path2well.com\nPhone: +1 (555) 123-4567\nAddress: 123 Health Street, Wellness City, WC 12345"
        }
    ]
};

export function TermsContent({ content = defaultContent, isEditing = false, onUpdate }: TermsContentProps) {
    const safeContent = { ...defaultContent, ...content };

    return (
        <div className="min-h-screen bg-[#001618] text-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-kiona mb-6">
                        <EditableText
                            id="heroHeading"
                            type="heading"
                            content={safeContent.heroHeading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white"
                        />
                    </h1>
                    <p className="text-xl text-white/80 font-kiona">
                        <EditableText
                            id="heroSubheading"
                            type="paragraph"
                            content={safeContent.heroSubheading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white/80"
                        />
                    </p>
                    <p className="text-sm text-white/60 mt-4">
                        <EditableText
                            id="lastUpdated"
                            type="paragraph"
                            content={safeContent.lastUpdated}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white/60"
                        />
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {safeContent.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20"
                        >
                            <h2 className="text-2xl font-kiona text-[#4ECDC4] mb-4">
                                <EditableText
                                    id={`sections.${index}.title`}
                                    type="heading"
                                    content={section.title}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-[#4ECDC4]"
                                />
                            </h2>
                            <div className="text-white/80 font-kiona whitespace-pre-line">
                                <EditableText
                                    id={`sections.${index}.content`}
                                    type="paragraph"
                                    content={section.content}
                                    isEditing={isEditing}
                                    onUpdate={onUpdate}
                                    className="text-white/80"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 