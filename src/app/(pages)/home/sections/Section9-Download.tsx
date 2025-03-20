"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";

interface DownloadSectionProps {
  content?: Record<string, string>;
}

export function DownloadSection({ content }: DownloadSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and download here
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
  };

  return (
    <section className="relative bg-[url('/images/wall.jpeg')] bg-cover bg-center py-20 md:py-32">
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="block text-brand-cream mb-4"
          >
            Just For You
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-cream mb-8"
          >
            Download Our Financial Blueprint
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-brand-cream text-brand-brown-dark px-8 py-4 rounded-md text-lg font-kiona transition-colors hover:bg-brand-brown-light"
            >
              Get Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Download Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Get Your Financial Blueprint"
          buttonRef={buttonRef}
        >
          <div className="bg-gradient-to-b from-brand-brown to-brand-brown-dark p-8 rounded-md w-[600px] max-w-full mx-auto">
            <h3 className="text-2xl font-kiona text-brand-brown-dark mb-6 text-center max-w-[400px] mx-auto">
              Enter Your Details to Download Your Free Financial Blueprint
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-brand-brown-dark mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-md bg-brand-cream text-brand-brown-dark placeholder-brand-brown-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-brand-brown-dark mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-md bg-brand-cream text-brand-brown-dark placeholder-brand-brown-dark/50 focus:outline-none focus:ring-2 focus:ring-brand-brown-dark"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-brown-dark text-brand-cream px-8 py-4 rounded-md text-lg font-kiona transition-colors hover:bg-brand-brown-dark/80"
              >
                Download Now
              </button>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
}
