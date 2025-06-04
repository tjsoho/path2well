import { Page } from "@/types/pageEditor";

export const PAGES: Page[] = [
  { id: "home", name: "Home Page", slug: "home", sections: [] },
  { id: "about", name: "About Page", slug: "about", sections: [] },
  { id: "contact", name: "Contact Page", slug: "contact", sections: [] },
  { id: "services", name: "Services Page", slug: "services", sections: [] },
  // Add other pages as needed
];

export const DEFAULT_SUPPORT_CONTENT = {
  "clarity-heading": "Genetic Testing & Interpretation",
  "clarity-text":
    "Unlock the secrets of your DNA. Our comprehensive genetic testing reveals vital insights into your unique predispositions, helping you identify and address potential health concerns before they arise.",
  "confidence-heading": "Bespoke IV Therapy",
  "confidence-text":
    "Experience targeted, revitalising IV therapy, formulated precisely to address your individual health goals. Our range of infusions targets everything from boosting immunity and energy levels to promoting deep cellular hydration.",
  "freedom-heading": "Complimentary Consultation",
  "freedom-text":
    "Book your no-obligation consultation today and speak with a wellness expert. Discuss your health concerns, goals and discover your perfect personalised wellness plan.",
};
