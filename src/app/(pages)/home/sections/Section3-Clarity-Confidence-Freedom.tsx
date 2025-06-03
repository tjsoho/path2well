"use client";

import Image from "next/image";
import { EditableText } from "@/components/pageEditor/EditableText";
import { EditableImage } from "@/components/pageEditor/EditableImage";
import { motion } from "framer-motion";
import { Upload, Loader2, Calendar } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { GlowButton3 } from "@/components/ui/GlodButton3";

interface SupportSectionProps {
  isEditing?: boolean;
  content: {
    "clarity-heading": string;
    "clarity-text": string;
    "confidence-heading": string;
    "confidence-text": string;
    "freedom-heading": string;
    "freedom-text": string;
    "clarity-lab-image"?: string;
    "clarity-bikes-image"?: string;
    "clarity-doctor-image"?: string;
    "section3-title": string;
    "section3-description": string;
  };
  onUpdate?: (id: string, value: string) => void;
}

export function SupportSection({
  isEditing = false,
  content = {
    "clarity-heading": "Genetic Testing & Interpretation",
    "clarity-text":
      "Unlock the secrets of your DNA. Our comprehensive genetic testing reveals vital insights into your unique predispositions, helping you identify and address potential health concerns before they arise.",
    "confidence-heading": "Bespoke IV Therapy",
    "confidence-text":
      "Experience targeted, revitalising IV therapy, formulated precisely to address your individual health goals. Our range of infusions targets everything from boosting immunity and energy levels to promoting deep cellular hydration.",
    "freedom-heading": "Complimentary Consultation",
    "freedom-text":
      "Book your no-obligation consultation today and speak with a wellness expert. Discuss your health concerns, goals and discover your perfect personalised wellness plan.",
    "section3-title": "Cutting edge wellness solutions",
    "section3-description": "Discover our comprehensive range of cutting-edge wellness solutions, from genetic testing to personalized IV therapy. Take the next step towards optimal health.",
  },
  onUpdate,
}: SupportSectionProps) {
  const [uploadingLab, setUploadingLab] = useState(false);
  const [uploadingBikes, setUploadingBikes] = useState(false);
  const [uploadingDoctor, setUploadingDoctor] = useState(false);

  // Animation variants
  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  // Background image pulse animation
  const bgPulseVariants = {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const handleImageUpdate = (id: string, defaultImage: string) => {
    if (!onUpdate) return;

    // Set the appropriate loading state
    if (id === "clarity-lab-image") setUploadingLab(true);
    if (id === "clarity-bikes-image") setUploadingBikes(true);
    if (id === "clarity-doctor-image") setUploadingDoctor(true);

    // Update the image
    onUpdate(id, defaultImage);

    // Show a toast notification with white background
    toast.success("Image updated successfully", {
      style: {
        background: 'white',
        color: '#333',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      iconTheme: {
        primary: '#4CAF50',
        secondary: 'white',
      },
    });

    // Reset loading state after a short delay
    setTimeout(() => {
      if (id === "clarity-lab-image") setUploadingLab(false);
      if (id === "clarity-bikes-image") setUploadingBikes(false);
      if (id === "clarity-doctor-image") setUploadingDoctor(false);
    }, 1000);
  };

  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Background Image with Pulse Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full"
          variants={bgPulseVariants}
          animate="animate"
        >
          <Image
            src="/images/bg3.png"
            alt="Services Background"
            fill
            className="object-cover opacity-30"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col space-y-32">
          {/* Genetic Testing - Text Left, Image Right */}
          <motion.div
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={rowVariants}
          >
            <motion.div
              className="flex-1 w-full md:w-auto"
              variants={contentVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/icon2.png"
                    alt="Genetic Testing Icon"
                    width={24}
                    height={24}
                    className="mt-1 animate-spin-slow animate-scale-random-1"
                  />
                </div>
                <div className="space-y-4">
                  <EditableText
                    id="clarity-heading"
                    type="heading"
                    content={content["clarity-heading"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-xl text-white font-medium"
                  />
                  <EditableText
                    id="clarity-text"
                    type="paragraph"
                    content={content["clarity-text"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-gray-400"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-8"
                  >
                    <GlowButton3
                      href="/contact"
                      text="Book Consultation"
                      icon={Calendar}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 w-full md:w-auto mt-10 md:mt-0"
              variants={imageVariants}
            >
              <div className="relative">
                {/* Offset glow effect - Always show */}
                <div className="absolute -right-3 top-8 w-[90%] h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden h-[300px]">
                  {(!content["clarity-lab-image"] || content["clarity-lab-image"] === "") && (
                    <div
                      className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleImageUpdate("clarity-lab-image", "/images/lab.png")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {uploadingLab ? (
                          <Loader2 size={24} className="text-gray-400 animate-spin" />
                        ) : (
                          <Upload size={24} className="text-gray-400" />
                        )}
                        <span className="text-gray-400">
                          {uploadingLab ? "Uploading..." : "Upload Lab Image"}
                        </span>
                      </div>
                    </div>
                  )}
                  {content["clarity-lab-image"] && content["clarity-lab-image"] !== "" && (
                    <EditableImage
                      src={content["clarity-lab-image"]}
                      alt="Lab Work"
                      fill
                      className="w-full h-auto object-cover scale-105 rounded-xl"
                      isEditing={isEditing}
                      onUpdate={(newUrl) => onUpdate?.("clarity-lab-image", newUrl)}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* IV Therapy - Image Left, Text Right */}
          <motion.div
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={rowVariants}
          >
            <motion.div
              className="flex-1 w-full md:w-auto order-2 md:order-1"
              variants={imageVariants}
            >
              <div className="relative">
                {/* Offset glow effect - Always show */}
                <div className="absolute -left-3 top-8 w-full h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden h-[300px]">
                  {(!content["clarity-bikes-image"] || content["clarity-bikes-image"] === "") && (
                    <div
                      className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleImageUpdate("clarity-bikes-image", "/images/bikes.png")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {uploadingBikes ? (
                          <Loader2 size={24} className="text-gray-400 animate-spin" />
                        ) : (
                          <Upload size={24} className="text-gray-400" />
                        )}
                        <span className="text-gray-400">
                          {uploadingBikes ? "Uploading..." : "Upload Bikes Image"}
                        </span>
                      </div>
                    </div>
                  )}
                  {content["clarity-bikes-image"] && content["clarity-bikes-image"] !== "" && (
                    <EditableImage
                      src={content["clarity-bikes-image"]}
                      alt="Bikes"
                      fill
                      className="w-full h-auto object-cover"
                      isEditing={isEditing}
                      onUpdate={(newUrl) => onUpdate?.("clarity-bikes-image", newUrl)}
                    />
                  )}
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 w-full md:w-auto order-1 md:order-2 mt-10 md:mt-0"
              variants={contentVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/icon2.png"
                    alt="IV Therapy Icon"
                    width={24}
                    height={24}
                    className="mt-1 animate-spin-slow animate-scale-random-2"
                  />
                </div>
                <div className="space-y-4">
                  <EditableText
                    id="confidence-heading"
                    type="heading"
                    content={content["confidence-heading"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-xl text-white font-medium"
                  />
                  <EditableText
                    id="confidence-text"
                    type="paragraph"
                    content={content["confidence-text"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-gray-400"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-8"
                  >
                    <GlowButton3
                      href="/contact"
                      text="Book Consultation"
                      icon={Calendar}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Consultation - Text Left, Image Right */}
          <motion.div
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={rowVariants}
          >
            <motion.div
              className="flex-1 w-full md:w-auto"
              variants={contentVariants}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/icon2.png"
                    alt="Consultation Icon"
                    width={24}
                    height={24}
                    className="mt-1 animate-spin-fast animate-scale-random-3"
                  />
                </div>
                <div className="space-y-4">
                  <EditableText
                    id="freedom-heading"
                    type="heading"
                    content={content["freedom-heading"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-xl text-white font-medium"
                  />
                  <EditableText
                    id="freedom-text"
                    type="paragraph"
                    content={content["freedom-text"]}
                    isEditing={isEditing}
                    onUpdate={onUpdate}
                    className="text-gray-400"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-8"
                  >
                    <GlowButton3
                      href="/contact"
                      text="Book Consultation"
                      icon={Calendar}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 w-full md:w-auto mt-10 md:mt-0"
              variants={imageVariants}
            >
              <div className="relative">
                {/* Offset glow effect - Always show */}
                <div className="absolute -right-3 top-8 w-[90%] h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden h-[300px]">
                  {(!content["clarity-doctor-image"] || content["clarity-doctor-image"] === "") && (
                    <div
                      className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleImageUpdate("clarity-doctor-image", "/images/dr.png")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {uploadingDoctor ? (
                          <Loader2 size={24} className="text-gray-400 animate-spin" />
                        ) : (
                          <Upload size={24} className="text-gray-400" />
                        )}
                        <span className="text-gray-400">
                          {uploadingDoctor ? "Uploading..." : "Upload Doctor Image"}
                        </span>
                      </div>
                    </div>
                  )}
                  {content["clarity-doctor-image"] && content["clarity-doctor-image"] !== "" && (
                    <EditableImage
                      src={content["clarity-doctor-image"]}
                      alt="Doctor"
                      fill
                      className="w-full h-auto object-cover rounded-lg"
                      isEditing={isEditing}
                      onUpdate={(newUrl) => onUpdate?.("clarity-doctor-image", newUrl)}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Modern Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="mt-32 relative"
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4ECDC4]/10 via-[#4ECDC4]/5 to-[#4ECDC4]/10 rounded-3xl blur-2xl" />

          <div className="relative bg-[#001618]/50 backdrop-blur-lg rounded-3xl p-12 border border-[#4ECDC4]/20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
                <Image
                  src="/images/icon2.png"
                  alt="Services Icon"
                  width={48}
                  height={48}
                  className="animate-spin-slow"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl md:text-4xl font-kiona text-white"
              >
                <EditableText
                  id="section3-title"
                  type="heading"
                  content={content["section3-title"]}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="text-3xl md:text-4xl font-kiona text-white"
                />
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-white/80 font-kiona max-w-2xl mx-auto"
              >
                <EditableText
                  id="section3-description"
                  type="paragraph"
                  content={content["section3-description"]}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="text-lg text-white/80 font-kiona"
                />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <GlowButton3
                  href="/services"
                  text="Explore Our Services"
                  icon={Calendar}
                />

              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1.15) translate(-7.5%, -7.5%);
          }
          100% {
            transform: scale(1) translate(-7.5%, -7.5%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scale-random-1 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(90deg);
          }
          50% {
            transform: scale(1) rotate(180deg);
          }
          75% {
            transform: scale(1.1) rotate(270deg);
          }
        }

        @keyframes scale-random-2 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          33% {
            transform: scale(1.1) rotate(120deg);
          }
          66% {
            transform: scale(1) rotate(240deg);
          }
        }

        @keyframes scale-random-3 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(180deg);
          }
        }

        .animate-kenburns {
          animation: kenburns 20s ease-out infinite alternate;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-scale-random-1 {
          animation: scale-random-1 8s ease-in-out infinite;
        }

        .animate-scale-random-2 {
          animation: scale-random-2 12s ease-in-out infinite;
        }

        .animate-scale-random-3 {
          animation: scale-random-3 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}


