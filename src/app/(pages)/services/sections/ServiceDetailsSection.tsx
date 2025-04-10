'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
}

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.7,
            ease: [0.21, 0.45, 0.32, 0.9]  // Smooth easing curve
        }
    }
};

const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,  // Increased delay between items
            delayChildren: 0.3,     // Initial delay before starting
        }
    }
};

const decorativeCircles = [
    { size: '40px', opacity: '0.1', top: '15%', left: '10%' },
    { size: '60px', opacity: '0.15', top: '45%', left: '85%' },
    { size: '30px', opacity: '0.1', top: '75%', left: '25%' },
    { size: '50px', opacity: '0.12', top: '20%', left: '75%' },
    { size: '35px', opacity: '0.08', top: '60%', left: '15%' },
    { size: '45px', opacity: '0.1', top: '85%', left: '80%' },
];

export function ServiceDetailsSection({ content = defaultContent }: ServiceDetailsSectionProps) {
    const safeContent = { ...defaultContent, ...content };

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
                        <span className="text-teal-400 uppercase tracking-wider text-sm font-medium">
                            {safeContent.label}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl text-white font-bold">
                        {safeContent.heading}
                    </h2>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {safeContent.services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-[#020617]/30 backdrop-blur-xl border border-teal-400/20 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(20,184,166,0.15)] transition-all duration-500"
                        >
                            <h3 className="text-white text-xl font-bold font-sans mb-2 tracking-normal">
                                {service.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-6">
                                {service.subtitle}
                            </p>
                            <div className="text-3xl font-bold text-white mb-8">
                                {service.price}
                            </div>

                            <div className="mb-8">
                                <h4 className="text-white font-medium mb-4">What&apos;s included:</h4>
                                <motion.ul
                                    className="space-y-3"
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{
                                        amount: 0.3,
                                        margin: "-100px"
                                    }}
                                >
                                    {service.whatsIncluded.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            variants={listItemVariants}
                                            className="flex items-start gap-3 text-white/80 text-sm"
                                        >
                                            <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>

                            {service.benefits && (
                                <div className="mb-8">
                                    <h4 className="text-white font-medium mb-4">Benefits of {service.title.split(' ').slice(-1)[0]}:</h4>
                                    <motion.ul
                                        className="space-y-3"
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            amount: 0.3,
                                            margin: "-100px"
                                        }}
                                    >
                                        {service.benefits.map((benefit, i) => (
                                            <motion.li
                                                key={i}
                                                variants={listItemVariants}
                                                className="flex items-start gap-3 text-white/80 text-sm"
                                            >
                                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {benefit}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            )}

                            {service.disclaimer && (
                                <p className="text-white/60 text-xs italic mb-6">
                                    {service.disclaimer}
                                </p>
                            )}

                            <Link
                                href={service.ctaLink}
                                className="block w-full py-3 px-6 bg-transparent border border-teal-400 text-teal-400 text-center rounded-full hover:bg-teal-400 hover:text-black transition-all duration-300"
                            >
                                {service.ctaText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 