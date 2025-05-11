"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from '@/components/pageEditor/EditableText';
import { EditableServiceCard } from '@/components/pageEditor/EditableServiceCard';

interface ServiceCard {
  image: string;
  title: string;
  description: string;
  disclaimer?: string;
}

interface ServicesContent {
  label: string;
  heading: string;
  heroHeading: string;
  heroSubheading: string;
  cards: ServiceCard[];
  ctaText: string;
  ctaLink: string;
}

const defaultContent: ServicesContent = {
  label: "Services",
  heading: "Our Service for You",
  heroHeading: "Unlock Your Optimal Wellness",
  heroSubheading: "Discover our personalised services",
  cards: [
    {
      image: "/images/service2.png",
      title: "Understand Your Unique Blueprint",
      description: "Unlock the secrets of your DNA with our comprehensive genetic testing. We interpret your results to create a personalized wellness plan."
    },
    {
      image: "/images/service3.png",
      title: "Revitalise with Tailored IV Infusions",
      description: "Experience targeted, nourishing IV therapy, formulated precisely to address your individual health goals."
    },
    {
      image: "/images/service1.png",
      title: "Your Personalised Wellness Journey Begins Here",
      description: "Book a no-obligation consultation with one of our wellness experts to discuss your health goals and create a personalized plan."
    }
  ],
  ctaText: "Book Your Free Consultation",
  ctaLink: "/consultation"
};

interface HeroSectionProps {
  content?: ServicesContent;
  isEditing?: boolean;
  onUpdate?: (id: string, value: string) => void;
}

export function HeroSection({ content = defaultContent, isEditing = false, onUpdate }: HeroSectionProps) {
  const safeContent = { ...defaultContent, ...content };

  // Ensure cards is always an array
  const cards = Array.isArray(safeContent.cards)
    ? safeContent.cards
    : typeof safeContent.cards === 'string'
      ? JSON.parse(safeContent.cards)
      : [];

  return (
    <section className="relative">
      {/* Background Image Section */}
      <div className="relative min-h-[90vh]">
        <Image
          src="/images/runners.png"
          alt="Runners"
          layout="fill"
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 flex items-end">
          {/* Purple Block */}
          <div className="relative bg-[#844dc6] p-8 rounded-tr-3xl w-[70vw] lg:w-[40vw] -mt-[3px] overflow-hidden">
            {/* Background Tech Pattern */}

            <div className="text-left text-white relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-4xl font-bold mb-6"
              >
                <EditableText
                  id="heroHeading"
                  type="heading"
                  content={safeContent.heroHeading}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="text-white"
                />
              </motion.h1>
              <EditableText
                id="heroSubheading"
                type="paragraph"
                content={safeContent.heroSubheading}
                isEditing={isEditing}
                onUpdate={onUpdate}
                className="text-xl text-white"
              />
            </div>
          </div>

          {/* Rounded SVG */}
          <Image
            src="/images/rounded2.svg"
            alt="Decorative curve"
            width={100}
            height={200}
            className="h-full w-auto block"
            style={{ marginBottom: '-1px', marginLeft: '-1px' }}
          />
        </div>
      </div>

      {/* Purple Section */}
      <div className="relative min-h-[100vh] bg-brand-purple flex items-center justify-center overflow-hidden">
        {/* Background Tech Pattern */}
        <Image
          src="/images/tech3.png"
          alt="Technology Pattern"
          layout="fill"
          className="object-cover opacity-30 mix-blend-overlay brightness-75"
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Title Section with Decorative Elements */}
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-white opacity-60"></div>
              <EditableText
                id="label"
                type="subtext"
                content={safeContent.label}
                isEditing={isEditing}
                onUpdate={onUpdate}
                className="text-white uppercase tracking-wider text-sm"
              />
              <div className="w-8 h-[1px] bg-white opacity-60"></div>
            </div>
            <EditableText
              id="heading"
              type="heading"
              content={safeContent.heading}
              isEditing={isEditing}
              onUpdate={onUpdate}
              className="text-4xl md:text-5xl text-white font-bold text-center"
            />
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cards.map((card: ServiceCard, index: number) => (
              <EditableServiceCard
                key={index}
                card={card}
                index={index}
                isEditing={isEditing}
                onUpdate={(idx, updatedCard) => {
                  const updatedCards = [...cards];
                  updatedCards[idx] = updatedCard;
                  if (onUpdate) onUpdate('cards', JSON.stringify(updatedCards));
                }}
              />
            ))}
          </div>

          {/* Consultation Button */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative grid overflow-hidden rounded-full px-8 py-4 shadow-[0_1000px_0_0_hsl(0_0%_100%)_inset] transition-colors duration-200"
            >
              <span>
                <span
                  className="spark mask-gradient animate-flip before:animate-kitrotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]"
                />
              </span>
              <span
                className="backdrop absolute inset-px rounded-full bg-white transition-colors duration-200"
              />
              <a
                href={safeContent.ctaLink}
                className="group z-10 flex items-center gap-3"
              >
                <EditableText
                  id="ctaText"
                  type="paragraph"
                  content={safeContent.ctaText}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                  className="font-medium text-lg text-brand-purple"
                />
                <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center group-hover:bg-opacity-90 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" className="w-4 h-4">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 