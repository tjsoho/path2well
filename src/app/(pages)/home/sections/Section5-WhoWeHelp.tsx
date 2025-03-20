"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import { AnimatedListItem } from "@/components/ui/AnimatedListItem";

interface MarketCardProps {
  image: string;
  title: string;
  subtitle: string;
  onModalOpen: () => void;
  buttonRef: React.RefObject<HTMLDivElement>;
}

const MarketCard = ({
  image,
  title,
  subtitle,
  onModalOpen,
  buttonRef,
  index,
}: MarketCardProps & { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{
      duration: 0.6,
      delay: 0.2 + index * 0.2,
      ease: [0.4, 0, 0.2, 1],
    }}
    className="flex flex-col"
  >
    <div className="relative w-full max-w-[300px] aspect-[4/3] rounded-md overflow-hidden mb-6">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <h3 className="text-2xl md:text-3xl font-kiona text-brand-brown-dark mb-4">
      {title}
    </h3>
    <p className="text-brand-brown-dark mb-6 max-w-xs text-lg">{subtitle}</p>
    <div
      ref={buttonRef}
      className="[&_*]:border-brand-brown-dark [&>div>div>div]:bg-brand-brown-dark"
    >
      <PlusIcon onClick={onModalOpen} size="sm" />
    </div>
  </motion.div>
);

const marketData = [
  {
    image: "/images/family.jpeg",
    title: "YOUNG FAMILIES",
    subtitle:
      "Set your family up for success with smart financial planning from day one.",
    content: (
      <>
        <p className="text-lg mb-6">
          Starting a family is an exciting journey that comes with new financial
          responsibilities. We help young families build strong financial
          foundations through:
        </p>
        <ul className="space-y-4">
          {[
            "Education savings and college planning",
            "Life insurance and family protection",
            "Budget optimization for growing families",
          ].map((item, index) => (
            <AnimatedListItem key={item} index={index}>
              {item}
            </AnimatedListItem>
          ))}
        </ul>
      </>
    ),
  },
  {
    image: "/images/couch.jpeg",
    title: "MIDLIFE BUILDERS",
    subtitle:
      "With kids in high school and retirement on the horizon, now's the time to make your money work harder.",
    content: (
      <>
        <p className="text-lg mb-6">
          Your peak earning years are crucial for building lasting wealth. Our
          strategies help you:
        </p>
        <ul className="space-y-4">
          {[
            "Maximize retirement contributions",
            "Balance college savings with retirement",
            "Optimize tax strategies",
          ].map((item, index) => (
            <AnimatedListItem key={item} index={index}>
              {item}
            </AnimatedListItem>
          ))}
        </ul>
      </>
    ),
  },
  {
    image: "/images/retired.jpeg",
    title: "RETIREMENT READY",
    subtitle:
      "Ensure your wealth supports the lifestyle you want—now and for years to come.",
    content: (
      <>
        <p className="text-lg mb-6">
          Make your retirement dreams a reality with our comprehensive planning:
        </p>
        <ul className="space-y-4">
          {[
            "Income distribution strategies",
            "Estate planning and legacy",
            "Healthcare and long-term care planning",
          ].map((item, index) => (
            <AnimatedListItem key={item} index={index}>
              {item}
            </AnimatedListItem>
          ))}
        </ul>
      </>
    ),
  },
];

interface TargetMarketProps {
  content?: Record<string, string>;
}

export function TargetMarket({ content }: TargetMarketProps) {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const buttonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <section className="relative bg-brand-cream py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-kiona text-brand-brown-dark text-center mb-16"
        >
          Who We Help
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12 lg:gap-24">
          {marketData.map((item, index) => (
            <MarketCard
              key={item.title}
              {...item}
              index={index}
              onModalOpen={() => setActiveModal(index)}
              buttonRef={buttonRefs[index] as React.RefObject<HTMLDivElement>}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal !== null && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={marketData[activeModal].title}
          buttonRef={buttonRefs[activeModal]}
        >
          {marketData[activeModal].content}
        </Modal>
      )}
    </section>
  );
}
