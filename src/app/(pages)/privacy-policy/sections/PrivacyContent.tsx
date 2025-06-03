import { motion } from "framer-motion";
import { EditableText } from '@/components/pageEditor/EditableText';

interface PrivacyContentProps {
    content?: {
        heroHeading?: string;
        heroSubheading?: string;
        lastUpdated?: string;
        sections?: {
            title: string;
            content: string;
        }[];
    };
    isEditing?: boolean;
    onUpdate?: (id: string, value: string) => void;
}

export function PrivacyContent({ content = {}, isEditing = false, onUpdate }: PrivacyContentProps) {
    const safeContent = {
        heroHeading: content.heroHeading || "Privacy Policy",
        heroSubheading: content.heroSubheading || "Your privacy is our priority. Learn how we protect and manage your data.",
        lastUpdated: content.lastUpdated || "Last Updated: March 15, 2024",
        sections: content.sections || [
            {
                title: "Information We Collect",
                content: "We collect information that you provide directly to us, including but not limited to:\n\n• Personal identification information (Name, email address, phone number)\n• Health and wellness information\n• Payment information\n• Communication preferences\n\nWe also collect information automatically through cookies and similar technologies when you use our website."
            },
            {
                title: "How We Use Your Information",
                content: "We use the information we collect to:\n\n• Provide and maintain our services\n• Process your transactions\n• Send you important updates and notifications\n• Improve our services and user experience\n• Comply with legal obligations\n• Protect our rights and prevent fraud"
            },
            {
                title: "Data Security",
                content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure."
            },
            {
                title: "Your Rights",
                content: "You have the right to:\n\n• Access your personal information\n• Correct inaccurate data\n• Request deletion of your data\n• Object to processing of your data\n• Data portability\n• Withdraw consent\n\nTo exercise these rights, please contact us using the information provided below."
            },
            {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@path2well.com\nPhone: +1 (555) 123-4567\nAddress: 123 Health Street, Wellness City, WC 12345"
            }
        ]
    };

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