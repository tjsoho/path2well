"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableImage } from "@/components/pageEditor/EditableImage";


interface HeroSectionProps {
  isEditing?: boolean;
  content: Record<string, string>;
  onUpdate?: (id: string, value: string) => void;
}

export function HeroSection({
  isEditing = false,
  content = {},
  onUpdate,
}: HeroSectionProps) {
  console.log("About HeroSection rendering with:", { isEditing, content });
  console.log("Content keys:", Object.keys(content));
  console.log("Content values:", Object.values(content));
  console.log("Content heading:", content.heading);
  console.log("Content subheading:", content.subheading);

  // Use content directly from the database without fallback
  const safeContent = {
    label: content.label || "ABOUT US",
    heading: content.heading || "ABOUT PATH2WELL:\nYOUR JOURNEY TO\nOPTIMAL WELLNESS\nBEGINS HERE.",
    subheading: content.subheading || "Discover the story behind our personalised approach to health\nand wellness.",
  };

  console.log("Safe content:", safeContent);

  // Star component with fixed point lengths and angles
  const Star = ({ className = "" }) => {
    // Pre-calculate all angles and store them
    const points = useMemo(() => {
      return Array.from({ length: 10 }, (_, i) => ({
        angle: (i * 36 * Math.PI) / 180,
        length: i % 2 === 0 ? 12 : 8
      }));
    }, []);

    return (
      <div className={`relative ${className}`}>
        <div className="absolute w-4 h-4">
          {points.map(({ angle, length }, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-brand-teal"
              style={{
                height: `${length}px`,
                transform: `rotate(${angle.toFixed(6)}rad) translateY(-50%)`,
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                boxShadow: '0 0 10px #4ECDC4, 0 0 20px #4ECDC4'
              }}
            />
          ))}
          <div className="absolute w-2 h-2 bg-brand-teal rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#4ECDC4,0_0_30px_#4ECDC4,0_0_45px_#4ECDC4]" />
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Star Animation Containers */}
      <div className="absolute inset-4 z-10">
        {/* First star - moving right and down */}
        <motion.div
          className="absolute w-4 h-4"
          animate={{
            x: ["0%", "100%", "100%", "0%", "0%"],
            y: ["0%", "0%", "100%", "100%", "0%"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Star />
        </motion.div>

        {/* Second star - moving left and up */}
        <motion.div
          className="absolute w-4 h-4 right-0 bottom-0"
          animate={{
            x: ["0%", "-100%", "-100%", "0%", "0%"],
            y: ["0%", "0%", "-100%", "-100%", "0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Star />
        </motion.div>
      </div>

      {/* Main Container with white border gap */}
      <div className="relative w-full h-[calc(100vh-0px)] rounded-2xl overflow-hidden bg-[#001618]">
        {/* Background Image Container */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 20,
            ease: "easeOut",
          }}
        >
          <EditableImage
            src={content["hero-background"] || "/images/HeroBG.png"}
            alt="Path2Well Hero"
            fill
            priority
            className="object-cover"
            isEditing={isEditing}
            onUpdate={(newUrl) => onUpdate?.("hero-background", newUrl)}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001618]/50 to-[#001618]" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex items-center justify-center h-full"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <EditableText
                  id="label"
                  type="subtext"
                  content={safeContent.label}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="text-brand-teal text-sm tracking-[0.2em]"
                />
                <EditableText
                  id="heading"
                  type="heading"
                  content={safeContent.heading}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="text-xl md:text-5xl font-bold text-white tracking-wider uppercase whitespace-pre-line leading-tight"
                />
              </div>
              <EditableText
                id="subheading"
                type="subtext"
                content={safeContent.subheading}
                isEditing={isEditing}
                onUpdate={onUpdate}
                className="text-lg text-brand-teal/80 whitespace-pre-line"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
