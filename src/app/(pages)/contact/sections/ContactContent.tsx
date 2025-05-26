"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Mail, Send, Loader2, X } from "lucide-react";
import { EditableText } from '@/components/pageEditor/EditableText';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        mobile: "",
        message: "",
        type: "general",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "f1e09265-5b3e-4ff3-b68b-3308547c15cf",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    mobile: formData.mobile,
                    message: formData.message,
                    type: formData.type,
                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Form submitted successfully:", result);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    mobile: "",
                    message: "",
                    type: "general",
                });
                setShowSuccessModal(true);
            } else {
                console.error("Form submission failed:", result);
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        setTimeout(() => {
            router.push('/');
        }, 300);
    };

    const safeContent = { ...defaultContent, ...content };

    return (
        <>
            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#001618] border border-[#4ECDC4]/20 rounded-2xl p-8 max-w-md w-full relative"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mx-auto">
                                    <Send className="w-8 h-8 text-[#4ECDC4]" />
                                </div>
                                <h3 className="text-2xl font-kiona text-white">Thank You!</h3>
                                <p className="text-white/80 font-kiona">
                                    Thanks for your message. We&apos;ll be in touch with you shortly.
                                </p>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-6 px-6 py-3 bg-[#4ECDC4] text-[#001618] rounded-lg font-kiona hover:bg-[#4ECDC4]/90 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
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
                    </motion.div>
                    <motion.div
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
                    </motion.div>
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
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={(e) =>
                                                setFormData({ ...formData, mobile: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-lg bg-[#001618] border border-[#4ECDC4]/20 text-white focus:outline-none focus:border-[#4ECDC4] transition-colors font-kiona"
                                            placeholder="Your mobile number"
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