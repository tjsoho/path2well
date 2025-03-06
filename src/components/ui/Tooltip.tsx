"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  text: string;
  isVisible: boolean;
  userType?: "clients" | "advisors";
  isActive?: boolean;
}

export function Tooltip({ text, isVisible }: TooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="absolute -bottom-10 left-0 whitespace-nowrap z-50"
        >
          <div className="relative px-3 py-1.5 text-[10px] tracking-wider uppercase rounded-md shadow-lg bg-brand-brown-light text-brand-black">
            {text}
            <div className="absolute -top-1 left-4 w-2 h-2 transform rotate-45 bg-brand-brown-light" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
