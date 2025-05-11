'use client';

import Image from "next/image";
import { motion } from "framer-motion";

import { EditableText } from '@/components/pageEditor/EditableText';
import { EditableServiceDetailCard } from '@/components/pageEditor/EditableServiceDetailCard';

interface ServiceDetail {
    title: string;
    subtitle: string;
    price: string;
    whatsIncluded: string[];
    benefits: string[];
    ctaText: string;
    ctaLink: string;
    disclaimer?: string;
}

interface ServiceDetailsContent {
    label: string;
    heading: string;
    services: ServiceDetail[];
}

const defaultContent: ServiceDetailsContent = {
    label: "PRICING",
    heading: "Our Detailed Service Descriptions",
    services: [
        {
            title: "Unlock the Power of Your Genes",
            subtitle: "Understanding your unique genetic makeup is the cornerstone of truly personalized medicine.",
            price: "$178",
            whatsIncluded: [
                "A comprehensive genetic testing kit, sent directly to your home for easy collection.",
                "A detailed report outlining genetic predispositions and relevant insights.",
                "A one-on-one consultation to discuss your results and create a personalized wellness plan. This includes recommendations for diet, lifestyle modifications, supplements and IV therapies to support your optimal health.",
                "Ongoing support and guidance from our wellness team as you implement your personalized plan."
            ],
            benefits: [
                "Identify potential health risks before they manifest.",
                "Tailor your diet and lifestyle to your genetic profile for optimal results.",
                "Personalize your supplement regimen for maximum effectiveness.",
                "Make informed decisions about your health journey."
            ],
            ctaText: "Book Your Genetic Testing",
            ctaLink: "/book-genetic-testing"
        },
        {
            title: "Experience the Revitalising Power of IV Therapy",
            subtitle: "IV therapy offers a powerful and effective way to deliver essential nutrients.",
            price: "$178",
            whatsIncluded: [
                "A thorough consultation to determine the most suitable IV therapy for your needs.",
                "A comfortable and relaxing treatment in a private setting.",
                "Post-treatment care instructions and advice."
            ],
            benefits: [
                "Rapid nutrient delivery for quick results",
                "Improved energy levels, immunity, and overall well-being",
                "Enhanced hydration and detoxification",
                "Targeted solutions for specific health concerns"
            ],
            ctaText: "Book Your IV Therapy Session",
            ctaLink: "/book-iv-therapy",
            disclaimer: "IV therapy is not a replacement for traditional medical care. Consult your doctor before starting any new treatment."
        },
        {
            title: "Let's Discuss Your Wellness Goals",
            subtitle: "Your journey to optimal health begins with a conversation. Our complimentary consultations are personalized to your needs.",
            price: "$178",
            whatsIncluded: [
                "A comprehensive discussion of your health history and current wellness status.",
                "A thorough assessment of your individual needs and goals.",
                "A personalized explanation of how our services can help you achieve your objectives.",
                "A chance to ask any questions you may have."
            ],
            benefits: [
                "A clear understanding of your health status and any potential issues.",
                "A customized plan tailored to meet your specific needs and goals.",
                "An opportunity to book your chosen services."
            ],
            ctaText: "Book Your Wellness Goals Session",
            ctaLink: "/book-consultation"
        }
    ]
};

interface ServiceDetailsSectionProps {
    content?: ServiceDetailsContent;
    isEditing?: boolean;
    onUpdate?: (id: string, value: string) => void;
}

// const listItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//         opacity: 1,
//         x: 0,
//         transition: {
//             duration: 0.7,
//             ease: [0.21, 0.45, 0.32, 0.9]  // Smooth easing curve
//         }
//     }
// };

// const containerVariants = {
//     hidden: {
//         opacity: 0
//     },
//     visible: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.15,  // Increased delay between items
//             delayChildren: 0.3,     // Initial delay before starting
//         }
//     }
// };

const decorativeCircles = [
    { size: '40px', opacity: '0.1', top: '15%', left: '10%' },
    { size: '60px', opacity: '0.15', top: '45%', left: '85%' },
    { size: '30px', opacity: '0.1', top: '75%', left: '25%' },
    { size: '50px', opacity: '0.12', top: '20%', left: '75%' },
    { size: '35px', opacity: '0.08', top: '60%', left: '15%' },
    { size: '45px', opacity: '0.1', top: '85%', left: '80%' },
];

export function ServiceDetailsSection({ content = defaultContent, isEditing = false, onUpdate }: ServiceDetailsSectionProps) {
    const safeContent = { ...defaultContent, ...content };

    // Ensure services is always an array
    const services = Array.isArray(safeContent.services)
        ? safeContent.services
        : typeof safeContent.services === 'string'
            ? JSON.parse(safeContent.services)
            : [];

    const handleDeleteService = (index: number) => {
        if (onUpdate) {
            const updatedServices = [...services];
            updatedServices.splice(index, 1);
            onUpdate('services', JSON.stringify(updatedServices));
        }
    };

    const handleAddService = () => {
        if (onUpdate) {
            const newService = {
                title: "New Service",
                subtitle: "Add service description here",
                price: "$0",
                whatsIncluded: ["Add what's included"],
                benefits: ["Add benefits"],
                ctaText: "Book Now",
                ctaLink: "/book",
            };
            const updatedServices = [...services, newService];
            onUpdate('services', JSON.stringify(updatedServices));
        }
    };

    return (
        <section className="relative bg-[#020617] py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <Image
                    src="/images/tech1.png"
                    alt="Background Pattern"
                    layout="fill"
                    className="object-cover opacity-60"
                />
                {/* Decorative Circles */}
                <div className="absolute inset-0">
                    {decorativeCircles.map((circle, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-white/10"
                            style={{
                                width: circle.size,
                                height: circle.size,
                                top: circle.top,
                                left: circle.left,
                                opacity: circle.opacity,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-teal-400"></div>
                        <EditableText
                            id="label"
                            type="subtext"
                            content={safeContent.label}
                            isEditing={isEditing}
                            onUpdate={onUpdate}
                            className="text-teal-400 uppercase tracking-wider text-sm font-medium"
                        />
                    </div>
                    <EditableText
                        id="heading"
                        type="heading"
                        content={safeContent.heading}
                        isEditing={isEditing}
                        onUpdate={onUpdate}
                        className="text-3xl md:text-4xl text-white font-bold"
                    />
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service: ServiceDetail, index: number) => (
                        <EditableServiceDetailCard
                            key={index}
                            service={service}
                            index={index}
                            isEditing={isEditing}
                            onUpdate={(idx, updatedService) => {
                                const updatedServices = [...services];
                                updatedServices[idx] = updatedService;
                                if (onUpdate) onUpdate('services', JSON.stringify(updatedServices));
                            }}
                            onDelete={handleDeleteService}
                        />
                    ))}
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + services.length * 0.1 }}
                            className="relative group"
                        >
                            <button
                                onClick={handleAddService}
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
                                <span className="mt-4 text-white font-medium">Add New Service Detail</span>
                                <span className="mt-2 text-white/50 text-sm">Click to create a new service detail card</span>
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
} 