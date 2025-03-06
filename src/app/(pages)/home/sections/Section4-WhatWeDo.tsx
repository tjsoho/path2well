"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function WhatWeDo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative bg-brand-brown-dark py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Subtitle */}
          <motion.h3
            variants={itemVariants}
            className="text-lg md:text-xl text-brand-cream mb-4"
          >
            WHAT WE DO
          </motion.h3>
          <div className="w-[60px] mx-auto h-[0.5px] bg-brand-cream mb-4 lg:mb-8"></div>

          {/* Main Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-cream mb-12"
          >
            Wealth Management & Investment Guidance
          </motion.h2>

          {/* Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/services"
              className="inline-block bg-brand-cream text-brand-brown px-8 py-4 rounded-md text-lg font-kiona font-bold transition-colors hover:bg-brand-brown-light"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
