"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLDivElement | null>;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* Modal Container - This is the key change */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-lg"
            >
              <div className="relative bg-brand-brown-dark p-6 md:p-8 rounded-md shadow-xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-brand-cream hover:text-brand-brown-light transition-colors"
                >
                  <RiCloseLine className="w-6 h-6" />
                </button>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl font-kiona text-brand-cream mb-6"
                >
                  {title}
                </motion.h3>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-brand-cream prose prose-invert prose-cream max-w-none"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
