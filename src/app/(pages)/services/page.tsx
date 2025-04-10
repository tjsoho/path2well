import { HeroSection } from "./sections/HeroSection";
import { BeginSection } from "./sections/Section6-begin";
import { ServiceDetailsSection } from "./sections/ServiceDetailsSection";
// import { ServicesSection } from "./sections/ServicesSection";
// import { PricingSection } from "./sections/PricingSection";

export default function ServicesPage() {
  return (
    <main>
      <HeroSection />
      <ServiceDetailsSection />
      <BeginSection />
    </main>
  );
} 