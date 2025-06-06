"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableTestimonial, Testimonial } from "@/components/pageEditor/EditableTestimonial";
import { EditableImage } from "@/components/pageEditor/EditableImage";

interface TestimonialsProps {
  isEditing?: boolean;
  content?: {
    heading?: string;
    subheading?: string;
    testimonials?: Array<Testimonial>;
    backgroundImage?: string;
  };
  onUpdate?: (id: string, value: string) => void;
}

const defaultTestimonials = [
  {
    name: "Amelia P.",
    image: "/images/staff1.png",
    quote: "Since starting my personalized plan at Path2Well, my energy levels have skyrocketed. I feel like a new person.",
    title: "Unlock your body&apos;s full potential",
  },
  {
    name: "David L.",
    image: "/images/staff2.png",
    quote: "I was hesitant about IV therapy, but the Path2Well team was amazing. The tailored infusion made a noticeable difference in my overall health.",
    title: "Bespoke IV therapy for optimal wellness.",
  },
  {
    name: "Sarah M.",
    image: "/images/staff3.png",
    quote: "The genetic testing revealed insights I never knew about my health. Now I can make informed decisions about my wellness journey.",
    title: "Discover your unique health profile",
  }
];

export function Testimonials({
  isEditing = false,
  content = {},
  onUpdate,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const safeContent = {
    ...content,
    backgroundImage: content.backgroundImage || "/images/newTech.png",
    testimonials: (() => {
      try {
        // If testimonials is a string, parse it
        if (typeof content.testimonials === 'string') {
          return JSON.parse(content.testimonials);
        }
        // If testimonials is already an array, use it
        if (Array.isArray(content.testimonials)) {
          return content.testimonials;
        }
        // If testimonials is undefined or null, use default testimonials
        return defaultTestimonials;
      } catch (error) {
        console.error('Error parsing testimonials:', error);
        return defaultTestimonials;
      }
    })()
  };

  // Ensure currentIndex is valid
  useEffect(() => {
    if (safeContent.testimonials.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= safeContent.testimonials.length) {
      setCurrentIndex(0);
    }
  }, [safeContent.testimonials.length, currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % safeContent.testimonials.length);
    }, 5000); // Increased to 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, safeContent.testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % safeContent.testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + safeContent.testimonials.length) % safeContent.testimonials.length);
  };

  // Handle testimonial field updates
  const handleTestimonialUpdate = (index: number, updatedTestimonial: Testimonial) => {
    if (onUpdate) {
      const updatedTestimonials = [...safeContent.testimonials];
      updatedTestimonials[index] = updatedTestimonial;
      onUpdate('testimonials', JSON.stringify(updatedTestimonials));
    }
  };

  const handleDeleteTestimonial = (index: number) => {
    if (onUpdate) {
      const updatedTestimonials = [...safeContent.testimonials];
      updatedTestimonials.splice(index, 1);
      onUpdate('testimonials', JSON.stringify(updatedTestimonials));
    }
  };

  const handleAddTestimonial = () => {
    if (onUpdate) {
      const newTestimonial = {
        name: "New Testimonial",
        image: "/images/staff1.png",
        quote: "Add your testimonial here",
        title: "Add title here",
      };
      const updatedTestimonials = [...safeContent.testimonials, newTestimonial];
      onUpdate('testimonials', JSON.stringify(updatedTestimonials));
    }
  };

  // Animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          src={safeContent.backgroundImage}
          alt="Technology Background"
          fill
          className="object-cover opacity-60"
          isEditing={isEditing}
          onUpdate={(newImageUrl) => onUpdate?.("backgroundImage", newImageUrl)}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-teal"></div>
            <span className="text-sm uppercase tracking-[0.2em] text-brand-teal">
              TESTIMONIALS
            </span>
          </div>
          <EditableText
            id="heading"
            type="heading"
            content={safeContent.heading || "Hear from our patients"}
            isEditing={isEditing}
            onUpdate={onUpdate}
            className="text-3xl md:text-4xl text-white mb-4"
          />
          <EditableText
            id="subheading"
            type="paragraph"
            content={safeContent.subheading || "We help people who are looking to improve their health and wellbeing."}
            isEditing={isEditing}
            onUpdate={onUpdate}
            className="text-gray-400"
          />
        </div>

        {/* Mobile View - Single Card with Navigation */}
        <div className="md:hidden">
          <div className="relative">
            {/* Fixed height container to prevent layout shifts */}
            <div className="h-[500px] relative overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden"
                >
                  {safeContent.testimonials.length > 0 ? (
                    <>
                      <div className="relative h-64">
                        <EditableImage
                          src={safeContent.testimonials[currentIndex].image}
                          alt={safeContent.testimonials[currentIndex].name}
                          fill
                          className="object-cover"
                          isEditing={isEditing}
                          onUpdate={(newImageUrl) => {
                            const updatedTestimonials = [...safeContent.testimonials];
                            updatedTestimonials[currentIndex] = {
                              ...updatedTestimonials[currentIndex],
                              image: newImageUrl,
                            };
                            onUpdate?.("testimonials", JSON.stringify(updatedTestimonials));
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-white text-xl mb-2">{safeContent.testimonials[currentIndex].name}</h3>
                        <p className="text-brand-teal text-sm mb-4">{safeContent.testimonials[currentIndex].title}</p>
                        <p className="text-white/80 italic">&quot;{safeContent.testimonials[currentIndex].quote}&quot;</p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 flex items-center justify-center h-full">
                      <p className="text-white text-center">No testimonials available yet.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls - Combined Arrows and Dots */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-sm"
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

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2">
                {safeContent.testimonials.map((_: Testimonial, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                      ? "bg-brand-teal w-4"
                      : "bg-brand-teal/30 hover:bg-brand-teal/50"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-sm"
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
          </div>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeContent.testimonials.map((testimonial: Testimonial, index: number) => (
            isEditing ? (
              <EditableTestimonial
                key={index}
                testimonial={testimonial}
                index={index}
                isEditing={isEditing}
                onUpdate={handleTestimonialUpdate}
                onDelete={handleDeleteTestimonial}
              />
            ) : (
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
            )
          ))}
          {isEditing && (
            <button
              onClick={handleAddTestimonial}
              className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-dashed border-brand-teal/30 hover:border-brand-teal/50 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-teal/10 flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-brand-teal"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <span className="mt-4 text-brand-teal font-medium">Add New Testimonial</span>
              <span className="mt-2 text-brand-teal/50 text-sm">Click to create a new testimonial card</span>
            </button>
          )}
        </div>

        {/* Show navigation arrows when there are more than 3 testimonials */}
        {safeContent.testimonials.length > 3 && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-brand-teal/20 hover:bg-brand-teal/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-brand-teal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-brand-teal/20 hover:bg-brand-teal/30 transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-brand-teal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile View - Add Testimonial Button */}
        {isEditing && (
          <div className="md:hidden mt-8">
            <button
              onClick={handleAddTestimonial}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-dashed border-brand-teal/30 hover:border-brand-teal/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-brand-teal"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <span className="text-brand-teal font-medium">Add New Testimonial</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
