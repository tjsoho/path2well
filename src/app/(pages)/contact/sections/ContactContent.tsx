"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send, Loader2 } from "lucide-react";
import { EditableText } from '@/components/pageEditor/EditableText';
import { toast } from "react-hot-toast";

interface ContactContent {
    heroHeading: string;
    heroSubheading: string;
    phone: string;
    email: string;
    address: string;
    businessHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    };
}

interface ContactContentProps {
    content?: ContactContent;
    isEditing?: boolean;
    onUpdate?: (id: string, value: string) => void;
}

const defaultContent: ContactContent = {
    heroHeading: "Let's Connect",
    heroSubheading: "Take the first step towards optimal health and wellness",
    phone: "+1 (555) 123-4567",
    email: "contact@path2well.com",
    address: "123 Health Street\nWellness City, WC 12345",
    businessHours: {
        weekdays: "9:00 - 18:00",
        saturday: "10:00 - 15:00",
        sunday: "Closed"
    }
};

export function ContactContent({ content = defaultContent, isEditing = false, onUpdate }: ContactContentProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        type: "general",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success("Message sent successfully!");
        setIsSubmitting(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            type: "general",
        });
    };

    const safeContent = { ...defaultContent, ...content };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-kiona text-white mb-6"
                    >
                        <EditableText
                            id="heroHeading"
                            type="heading"
                            content={safeContent.heroHeading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white"
                        />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-white/80 max-w-2xl mx-auto font-kiona"
                    >
                        <EditableText
                            id="heroSubheading"
                            type="paragraph"
                            content={safeContent.heroSubheading}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-white/80"
                        />
                    </motion.p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="relative py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20">
                                <h2 className="text-2xl font-kiona text-white mb-6">
                                    Get in Touch
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                                            <Phone className="w-6 h-6 text-[#4ECDC4]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-kiona text-white">Phone</h3>
                                            <EditableText
                                                id="phone"
                                                type="paragraph"
                                                content={safeContent.phone}
                                                isEditing={isEditing}
                                                onUpdate={onUpdate}
                                                className="text-white/80 font-kiona"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                                            <Mail className="w-6 h-6 text-[#4ECDC4]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-kiona text-white">Email</h3>
                                            <EditableText
                                                id="email"
                                                type="paragraph"
                                                content={safeContent.email}
                                                isEditing={isEditing}
                                                onUpdate={onUpdate}
                                                className="text-white/80 font-kiona"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-[#4ECDC4]/10 rounded-lg">
                                            <MapPin className="w-6 h-6 text-[#4ECDC4]" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-kiona text-white">Location</h3>
                                            <EditableText
                                                id="address"
                                                type="paragraph"
                                                content={safeContent.address}
                                                isEditing={isEditing}
                                                onUpdate={onUpdate}
                                                className="text-white/80 font-kiona whitespace-pre-line"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20">
                                <h2 className="text-2xl font-kiona text-white mb-6">
                                    Business Hours
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-kiona">Monday - Friday</span>
                                        <EditableText
                                            id="businessHours.weekdays"
                                            type="paragraph"
                                            content={safeContent.businessHours.weekdays}
                                            isEditing={isEditing}
                                            onUpdate={onUpdate}
                                            className="text-[#4ECDC4] font-kiona"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-kiona">Saturday</span>
                                        <EditableText
                                            id="businessHours.saturday"
                                            type="paragraph"
                                            content={safeContent.businessHours.saturday}
                                            isEditing={isEditing}
                                            onUpdate={onUpdate}
                                            className="text-[#4ECDC4] font-kiona"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-kiona">Sunday</span>
                                        <EditableText
                                            id="businessHours.sunday"
                                            type="paragraph"
                                            content={safeContent.businessHours.sunday}
                                            isEditing={isEditing}
                                            onUpdate={onUpdate}
                                            className="text-[#4ECDC4] font-kiona"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-[#001618]/50 backdrop-blur-lg rounded-2xl p-8 border border-[#4ECDC4]/20"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                                            Inquiry Type
                                        </label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) =>
                                                setFormData({ ...formData, type: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="consultation">Book Consultation</option>
                                            <option value="partnership">Partnership</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#4ECDC4] text-sm mb-2 font-kiona">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona resize-none"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-3 bg-[#4ECDC4] text-[#001618] rounded-lg font-kiona hover:bg-[#4ECDC4]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
} 