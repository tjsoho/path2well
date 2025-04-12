interface PageSection {
  id: string;
  pageId: string;
  sectionId: string;
  order: number;
  content: {
    headings?: { [key: string]: string };
    paragraphs?: { [key: string]: string };
    subtext?: { [key: string]: string };
  };
}

interface Page {
  id: string;
  name: string;
  slug: string;
  sections: PageSection[];
}

// New types for the editor
export type Testimonial = {
  name: string;
  image: string;
  quote: string;
  title: string;
};

export type Benefit = {
  title: string;
  description: string;
};

export type HeroContent = {
  heading: string;
  subheading: string;
};

export type PromiseContent = {
  heading: string;
  subheading: string;
};

export type SupportContent = {
  "clarity-heading": string;
  "clarity-text": string;
  "confidence-heading": string;
  "confidence-text": string;
  "freedom-heading": string;
  "freedom-text": string;
};

export type WhatWeDoContent = {
  "about-text": string;
};

export type TestimonialsContent = {
  heading: string;
  subheading: string;
  testimonials: Testimonial[];
};

export type DownloadContent = {
  heading: string;
  subheading: string;
  benefits: Benefit[];
};

export type ServicesContent = {
  heading: string;
  subheading: string;
};

export type SectionContents = {
  [key: string]: {
    [key: string]: string | Testimonial[] | Benefit[];
  };
};

export type SectionTypeMap = {
  "Section1-Hero": HeroContent;
  "Section2-Promise": PromiseContent;
  "Section3-Clarity-Confidence-Freedom": SupportContent;
  "Section4-WhatWeDo": WhatWeDoContent;
  "Section5-WhoWeHelp": TestimonialsContent;
  "Section6-Download": DownloadContent;
  "Section7-Services": ServicesContent;
}; 