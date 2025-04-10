"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
}

export function HeroSection({ content = defaultContent }: HeroSectionProps) {
  const safeContent = { ...defaultContent, ...content };

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
          <div className="relative bg-[#8450c7] p-8 rounded-tr-3xl w-[70vw] lg:w-[40vw] -mt-[3px] overflow-hidden">
            {/* Background Tech Pattern */}
            
            <div className="text-left text-white relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-4xl font-bold mb-6"
              >
                {safeContent.heroHeading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl"
              >
                {safeContent.heroSubheading}
              </motion.p>
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
          className="object-cover opacity-20 mix-blend-overlay brightness-75"
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Title Section with Decorative Elements */}
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-white opacity-60"></div>
              <span className="text-white uppercase tracking-wider text-sm">{safeContent.label}</span>
              <div className="w-8 h-[1px] bg-white opacity-60"></div>
            </div>
            <h2 className="text-4xl md:text-5xl text-white font-bold text-center">{safeContent.heading}</h2>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {safeContent.cards.map((card, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden border border-white/20">
                <div className="relative">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  {card.disclaimer && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                      <p className="text-white text-xs">{card.disclaimer}</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Button */}
          <div className="flex justify-center">
            <Link
              href={safeContent.ctaLink}
              className="group bg-white hover:bg-opacity-95 text-brand-purple px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300"
            >
              <span className="font-medium text-lg">{safeContent.ctaText}</span>
              <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center group-hover:bg-opacity-90 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" className="w-4 h-4">
                  <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 