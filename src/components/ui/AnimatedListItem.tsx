"use client";

import { motion } from "framer-motion";
import { RiCheckLine } from "react-icons/ri";

interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
}

export function AnimatedListItem({ children, index }: AnimatedListItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="flex items-start"
    >
      <RiCheckLine className="w-5 h-5 mt-0.5 mr-3 text-brand-brown-light flex-shrink-0" />
      <span>{children}</span>
    </motion.li>
  );
}
