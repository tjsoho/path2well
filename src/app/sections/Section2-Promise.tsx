"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableImage } from "@/components/pageEditor/EditableImage";

interface PromiseSectionProps {
  isEditing?: boolean;
  content: Record<string, string>;
  onUpdate?: (id: string, value: string) => void;
}

export function PromiseSection({
  isEditing = false,
  content = {
    // "promise-heading":
    //   "At <teal>Path2Well</teal>, we empower you to take <teal>control of your health</teal> through personalized, science-backed solutions.",
    // "promise-text":
    //   "We combine cutting-edge genetic testing with bespoke IV therapy to create a wellness plan uniquely <teal>tailored to your needs</teal>.",
  },
  onUpdate,
}: PromiseSectionProps) {
  // Ensure content has all required fields
  const safeContent = {
    "promise-heading":
      content["promise-heading"] ||
      "At Path2Well, we empower you to take control of your health through personalized, science-backed solutions.",
    "promise-text":
      content["promise-text"] ||
      "We combine cutting-edge genetic testing with bespoke IV therapy to create a wellness plan uniquely tailored to your needs.",
    "promise-image-1": content["promise-image-1"] || "/images/runners.png",
    "promise-image-2": content["promise-image-2"] || "/images/bikes.png",
  };

  const renderColoredText = (text: string) => {
    if (!text) return null;
    return text.split(/(<teal>.*?<\/teal>)/).map((part, index) => {
      if (part.startsWith("<teal>") && part.endsWith("</teal>")) {
        const content = part.replace(/<\/?teal>/g, "");
        return (
          <span key={index} className="text-brand-teal">
            {content}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section className="relative -mt-[15vh] min-h-[60vh]">
      {/* Split Background */}
      <div className="absolute inset-0">
        <div className="h-[130px] bg-[#001618]" />
        <div className="h-[calc(100%-130px)] bg-white" />
      </div>

      {/* Overlapping Images */}
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* First Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[260px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <EditableImage
              src={safeContent["promise-image-1"]}
              alt="Group Exercise"
              fill
              isEditing={isEditing}
              onUpdate={(newUrl) => onUpdate?.("promise-image-1", newUrl)}
            />
          </motion.div>

          {/* Second Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[260px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <EditableImage
              src={safeContent["promise-image-2"]}
              alt="Nurse with Patient"
              fill
              isEditing={isEditing}
              onUpdate={(newUrl) => onUpdate?.("promise-image-2", newUrl)}
            />
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-16 text-center pb-16">
        {/* Icon with Lines */}
        <div className="flex items-center justify-center gap-4 ">
                        <div className="w-24 h-[1px] bg-gradient-to-l from-brand-teal to-white" />
                        <div className="relative w-32 h-32">
                            <Image
                                src="/images/logo.png"
                                alt="Science Icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-brand-teal to-white" />
                    </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >


          <EditableText
            id="promise-text"
            type="paragraph"
            content={safeContent["promise-text"]}
            isEditing={isEditing}
            onUpdate={onUpdate}
            className="text-lg md:text-xl text-black"
            renderContent={renderColoredText}
          />
        </motion.div>
      </div>
    </section>
  );
}
