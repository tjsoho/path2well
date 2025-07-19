"use client";
import { useState } from "react";
import { HeroSection } from "./sections/HeroSection";
import { BeginSection } from "./sections/Section6-begin";
import { ServiceDetailsSection } from "./sections/ServiceDetailsSection";

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
interface ServiceDetail {
    title: string;
    subtitle: string;
    price: string;
    whatsIncluded: string[];
    benefits: string[];
    ctaText: string;
    ctaLink: string;
    disclaimer?: string;
}
interface ServiceDetailsContent {
    label: string;
    heading: string;
    services: ServiceDetail[];
}
interface BeginContent {
    heading: string;
    subheading: string;
    buttonText: string;
}

interface ServicesPageProps {
    heroContent: ServicesContent;
    serviceDetailsContent: ServiceDetailsContent;
    beginContent: BeginContent;
}

export default function ServicesPage({ heroContent, serviceDetailsContent, beginContent }: ServicesPageProps) {
    const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

    return (
        <main>
            <HeroSection content={heroContent} onCardClick={setActiveDetailIndex} />
            <ServiceDetailsSection content={serviceDetailsContent} activeDetailIndex={activeDetailIndex} />
            <BeginSection content={beginContent} />
        </main>
    );
} 