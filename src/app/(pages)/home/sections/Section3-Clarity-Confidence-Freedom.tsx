"use client";

import Image from "next/image";
import Link from "next/link";
import { EditableText } from "@/components/pageEditor/EditableText";

interface SupportSectionProps {
  isEditing?: boolean;
  content: {
    "clarity-heading": string;
    "clarity-text": string;
    "confidence-heading": string;
    "confidence-text": string;
    "freedom-heading": string;
    "freedom-text": string;
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
  },
  onUpdate,
}: SupportSectionProps) {
  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/servicesbg4.png"
          alt="Services Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col space-y-32">
          {/* Genetic Testing - Text Left, Image Right */}
          <div className="relative flex items-center gap-20">
            <div className="flex-1">
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
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Book consultation
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                {/* Offset glow effect */}
                <div className="absolute -right-3 top-8 w-[90%] h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/lab.png"
                    alt="Lab Work"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* IV Therapy - Image Left, Text Right */}
          <div className="relative flex items-center gap-20">
            <div className="flex-1">
              <div className="relative">
                {/* Offset glow effect */}
                <div className="absolute -left-3 top-8 w-full h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/bikes.png"
                    alt="Bikes"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
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
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Book consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation - Text Left, Image Right */}
          <div className="relative flex items-center gap-20">
            <div className="flex-1">
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
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Book consultation
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                {/* Offset glow effect */}
                <div className="absolute -right-3 top-8 w-[90%] h-[95%] rounded-2xl shadow-[0_0_15px_rgba(78,205,196,0.3)]" />
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/dr.png"
                    alt="Doctor"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
