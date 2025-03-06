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