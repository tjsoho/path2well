"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { EditableText } from "@/components/pageEditor/EditableText";

interface TestimonialsProps {
  isEditing?: boolean;
  content?: {
    heading?: string;
    subheading?: string;
    testimonials?: Array<{
      name: string;
      image: string;
      quote: string;
      title: string;
    }>;
  };
  onUpdate?: (id: string, value: string) => void;
}

const defaultTestimonials = [
  {
    name: "Amelia P.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote: "Since starting my personalized plan at Path2Well, my energy levels have skyrocketed. I feel like a new person.",
    title: "Unlock your body&apos;s full potential",
  },
  {
    name: "David L.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    quote: "I was hesitant about IV therapy, but the Path2Well team was amazing. The tailored infusion made a noticeable difference in my overall health.",
    title: "Bespoke IV therapy for optimal wellness.",
  },
  {
    name: "Sarah M.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    quote: "The genetic testing revealed insights I never knew about my health. Now I can make informed decisions about my wellness journey.",
    title: "Discover your unique health profile",
  }
];

export function Testimonials({
  isEditing = false,
  content = {},
  onUpdate,
}: TestimonialsProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const safeContent = {
    heading: content.heading || "Hear from our patients",
    subheading: content.subheading || "We help people who are looking to improve their health and wellbeing.",
    testimonials: content.testimonials || defaultTestimonials,
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % Math.ceil(safeContent.testimonials.length / 3));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + Math.ceil(safeContent.testimonials.length / 3)) % Math.ceil(safeContent.testimonials.length / 3));
  };

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tech2.png"
          alt="Technology Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm uppercase tracking-[0.2em] text-brand-teal">
              TESTIMONIALS
            </span>
            <div className="w-12 h-[1px] bg-brand-teal"></div>
          </div>
          <EditableText
            id="heading"
            type="heading"
            content={safeContent.heading}
            isEditing={isEditing}
            onUpdate={onUpdate}
            className="text-3xl md:text-4xl text-white mb-4"
          />
          <EditableText
            id="subheading"
            type="paragraph"
            content={safeContent.subheading}
            isEditing={isEditing}
            onUpdate={onUpdate}
            className="text-gray-400"
          />
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end mb-8 gap-4">
          <button
            onClick={prevPage}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={nextPage}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeContent.testimonials
            .slice(currentPage * 3, (currentPage + 1) * 3)
            .map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl mb-2">{testimonial.name}</h3>
                  <p className="text-brand-teal text-sm mb-4">{testimonial.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
