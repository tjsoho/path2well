"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-geist-sans)]">
          About Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-[family-name:var(--font-geist-mono)]">
          Learn more about our mission and values
        </p>
      </motion.div>
    </section>
  );
} 