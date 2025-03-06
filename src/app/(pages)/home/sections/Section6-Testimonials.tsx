"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Their guidance has been invaluable in securing our family's financial future. We feel confident and empowered in our decisions.",
    author: "Sarah & Michael Thompson",
    role: "Young Family",
  },
  {
    quote:
      "They helped us balance our children's education with our retirement goals. Their expertise made all the difference.",
    author: "David & Lisa Anderson",
    role: "Midlife Builders",
  },
  {
    quote:
      "Our retirement transition was seamless thanks to their comprehensive planning and personal attention to detail.",
    author: "Robert & Patricia Wilson",
    role: "Retired Couple",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/coupleHouse.jpeg"
          alt="Couple in front of house"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="md:ml-auto md:w-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="text-brand-cream"
            >
              {/* Quote */}
              <motion.blockquote className="text-2xl md:text-3xl lg:text-4xl font-kiona mb-8">
                &quot;{testimonials[current].quote}&quot;
              </motion.blockquote>

              {/* Author */}
              <div>
                <p className="text-xl font-kiona mb-2">
                  {testimonials[current].author}
                </p>
                <p className="text-brand-brown-light">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-brand-cream"
                    : "w-2 bg-brand-cream/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
