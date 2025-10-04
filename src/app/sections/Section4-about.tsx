"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";

interface WhatWeDoProps {
  isEditing?: boolean;
  content?: {
    "about-text": string;
  };
  onUpdate?: (id: string, value: string) => void;
}

export function WhatWeDo({ isEditing = false, content, onUpdate }: WhatWeDoProps) {
  const defaultContent = {
    "about-text": "Path2Well is dedicated to providing you with the tools and knowledge you need to live your healthiest, most vibrant life. My 10 years of experience in the health sector has equipped me to offer holistic health guidance, utilising cutting-edge technology and a compassionate approach.",
  };

  const finalContent = content || defaultContent;

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-purple-600 to-purple-800 py-20 md:py-32 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tech1.png"
          alt="Technology Background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-8">
          {/* ABOUT US heading */}
          <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={headingVariants}
            className="text-brand-teal font-kiona text-sm tracking-[0.2em] uppercase"
          >
            ABOUT US
          </motion.h3>

          {/* Main text content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={textVariants}
            className="text-white text-lg md:text-xl leading-relaxed"
          >
            <EditableText
              id="about-text"
              content={finalContent["about-text"]}
              isEditing={isEditing}
              onUpdate={onUpdate}
              type="paragraph"
              className="inline"
            />
          </motion.div>

          {/* Discover link */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={linkVariants}
            whileHover="hover"
            className="pt-2"
          >
            <Link
              href="/about"
              className="inline-flex items-center text-white text-sm hover:text-brand-teal transition-colors border-b border-white hover:border-brand-teal"
            >
              Discover our story
              <motion.svg
                className="ml-2 w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
