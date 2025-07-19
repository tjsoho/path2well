"use client";
import { useState } from "react";
import { HeroSection } from "./sections/HeroSection";
import { BeginSection } from "./sections/Section6-begin";
import { ServiceDetailsSection } from "./sections/ServiceDetailsSection";

export default function ServicesPage({ heroContent, serviceDetailsContent, beginContent }) {
    const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

    return (
        <main>
            <HeroSection content={heroContent} onCardClick={setActiveDetailIndex} />
            <ServiceDetailsSection content={serviceDetailsContent} activeDetailIndex={activeDetailIndex} />
            <BeginSection content={beginContent} />
        </main>
    );
} 