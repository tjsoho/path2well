"use client";

import { motion } from "framer-motion";
import React from "react";

interface PlusIconProps {
  onClick: () => void;
  size?: "sm" | "lg";
}

export const PlusIcon = React.forwardRef<HTMLDivElement, PlusIconProps>(
  ({ onClick, size = "lg" }, ref) => (
    <motion.div
      ref={ref}
      className={`relative border border-brand-cream rounded-full cursor-pointer ${
        size === "sm" ? "w-8 h-8" : "w-12 h-12"
      }`}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: 180 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-cream ${
            size === "sm" ? "w-4 h-[1px]" : "w-6 h-[1px]"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-cream ${
            size === "sm" ? "w-[1px] h-4" : "w-[1px] h-6"
          }`}
        />
      </motion.div>
    </motion.div>
  )
);

PlusIcon.displayName = "PlusIcon";
