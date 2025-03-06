"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { AnimatedListItem } from "@/components/ui/AnimatedListItem";

export function QuoteSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const listItems = [
    "Clear, jargon-free communication",
    "Tailored strategies for your unique situation",
    "Long-term partnership focused on your success",
  ];

  return (
    <section className="relative bg-brand-brown py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-cream mb-8"
          >
            &quot;Personalized, honest advice{" "}
            <span className="inline-block w-8 h-[2px] bg-brand-cream mx-3 align-middle"></span>{" "}
            just for you.&quot;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="[&_*]:border-brand-cream [&>div>div>div]:bg-brand-cream"
            ref={buttonRef}
          >
            <PlusIcon onClick={() => setIsModalOpen(true)} size="lg" />
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          title="Our Commitment"
          buttonRef={buttonRef}
        >
          <>
            <p className="text-lg mb-6">
              We believe in providing straightforward, personalized financial
              guidance that puts your interests first. Our approach is built on:
            </p>
            <ul className="space-y-4">
              {listItems.map((item, index) => (
                <AnimatedListItem key={item} index={index}>
                  {item}
                </AnimatedListItem>
              ))}
            </ul>
          </>
        </Modal>
      )}
    </section>
  );
}
