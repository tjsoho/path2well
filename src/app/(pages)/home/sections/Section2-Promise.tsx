"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";

export const defaultContent = {
  "promise-heading": "Think of us as your financial friends",
  "promise-text":
    "Ready to simplify the complexities of money management so you can focus on what truly matters: your dreams.",
};

interface PromiseSectionProps {
  isEditing?: boolean;
  content?: typeof defaultContent;
  onUpdate?: (id: string, value: string) => void;
}

export function PromiseSection({
  isEditing = false,
  content = defaultContent,
  onUpdate,
}: PromiseSectionProps) {
  const textVariants = {
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

  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wallet.jpeg"
          alt="Luxury Wallet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={textVariants}>
            <EditableText
              id="promise-heading"
              type="heading"
              content={content["promise-heading"]}
              isEditing={isEditing}
              onUpdate={onUpdate}
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            className="w-[40px] h-[1px] bg-brand-cream mx-auto mb-12"
          />

          <motion.div variants={textVariants}>
            <EditableText
              id="promise-text"
              type="paragraph"
              content={content["promise-text"]}
              isEditing={isEditing}
              onUpdate={onUpdate}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
