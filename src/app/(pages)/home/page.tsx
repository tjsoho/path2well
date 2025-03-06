import { HeroSection } from "./sections/Section1-Hero";
import { PromiseSection } from "./sections/Section2-Promise";
import { SupportSection } from "./sections/Section3-Clarity-Confidence-Freedom";
import { WhatWeDo } from "./sections/Section4-WhatWeDo";
import { TargetMarket } from "./sections/Section5-WhoWeHelp";
import { TestimonialsSection } from "./sections/Section6-Testimonials";
import { QuoteSection } from "./sections/Section7-Quote";
import { AboutMe } from "./sections/Section8-AboutUs";
import { DownloadSection } from "./sections/Section9-Download";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PromiseSection />
      <SupportSection />
      <WhatWeDo />
      <TargetMarket />
      <TestimonialsSection />
      <QuoteSection />
      <AboutMe />
      <DownloadSection />
    </main>
  );
}
