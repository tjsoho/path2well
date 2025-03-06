"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { EditableText } from "@/components/pageEditor/EditableText";

export const defaultContent = {
  "hero-heading": "Welcome To Walker Lane",
  "hero-subtext": "YOUR FINANCIAL ADVISORS",
};

interface HeroSectionProps {
  isEditing?: boolean;
  content?: typeof defaultContent;
  onUpdate?: (id: string, value: string) => void;
}

export function HeroSection({
  isEditing = false,
  content = defaultContent,
  onUpdate,
}: HeroSectionProps) {
  console.log("HeroSection rendering with:", { isEditing, content });

  const [userType, setUserType] = useState<"clients" | "advisors">("clients");
  const [hoveredButton, setHoveredButton] = useState<
    "clients" | "advisors" | null
  >(null);

  // Simplified button variants for clearer animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1, ease: "easeInOut" },
    },
  };

  // Ensure content has all required fields
  const safeContent = {
    ...defaultContent,
    ...content,
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
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
        <Image
          src="/images/boatHero.jpeg"
          alt="Luxury Boat"
          fill
          priority
          className="object-cover md:object-center object-[70%_center]"
        />
      </motion.div>

      {/* Overlay - Made darker */}
      <div className="absolute inset-0 bg-black/65 " />

      {/* User Type Selector - Desktop Only */}
      {!isEditing && (
        <div className="absolute top-4 left-8 z-50 hidden md:flex gap-4">
          <div className="relative">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setUserType("clients")}
              onMouseEnter={() => setHoveredButton("clients")}
              onMouseLeave={() => setHoveredButton(null)}
              className={`px-6 py-2 text-sm border rounded-md ${
                userType === "clients"
                  ? "bg-brand-brown-light text-brand-black border-brand-brown-light"
                  : "bg-transparent text-brand-brown-light border-brand-brown-light"
              }`}
            >
              CLIENTS
            </motion.button>
            <Tooltip
              text="For Individual Investors"
              isVisible={hoveredButton === "clients"}
              userType="clients"
              isActive={userType === "clients"}
            />
          </div>

          <div className="relative">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setUserType("advisors")}
              onMouseEnter={() => setHoveredButton("advisors")}
              onMouseLeave={() => setHoveredButton(null)}
              className={`px-6 py-2 text-sm border rounded-md ${
                userType === "advisors"
                  ? "bg-brand-brown-light text-brand-black border-brand-brown-light"
                  : "bg-transparent text-brand-brown-light border-brand-brown-light"
              }`}
            >
              ADVISORS
            </motion.button>
            <Tooltip
              text="For Financial Advisors"
              isVisible={hoveredButton === "advisors"}
              userType="advisors"
              isActive={userType === "advisors"}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center min-h-screen"
      >
        <div className="max-w-7xl mx-auto text-center px-4 pt-20 text-brand-cream">
          <EditableText
            id="hero-heading"
            type="heading"
            content={safeContent["hero-heading"]}
            isEditing={isEditing}
            onUpdate={onUpdate}
          />
          <EditableText
            id="hero-subtext"
            type="subtext"
            content={safeContent["hero-subtext"]}
            isEditing={isEditing}
            onUpdate={onUpdate}
          />
        </div>
      </motion.div>
    </section>
  );
}
