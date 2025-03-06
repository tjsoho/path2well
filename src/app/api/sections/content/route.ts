import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const sectionId = searchParams.get('sectionId');

  if (!pageId || !sectionId) {
    return NextResponse.json(
      { error: 'Missing pageId or sectionId' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('content, updated_at')
      .eq('page_id', pageId)
      .eq('section_id', sectionId)
      .single();

    if (error) throw error;

    // If no content exists yet, return default content based on section
    if (!data) {
      let defaultContent = {};
      
      switch (sectionId) {
        case 'Section1-Hero':
          defaultContent = {
            heading: "Welcome To Walker Lane",
            subheading: "YOUR FINANCIAL ADVISORS"
          };
          break;
        case 'Section2-Promise':
          defaultContent = {
            heading: "Think of us as your financial friends",
            subheading: "Ready to simplify the complexities of money management so you can focus on what truly matters: your dreams."
          };
          break;
        case 'Section3-Clarity-Confidence-Freedom':
          defaultContent = {
            "clarity-heading": "Clarity",
            "confidence-heading": "Confidence",
            "freedom-heading": "Freedom"
          };
          break;
        case 'Section4-WhatWeDo':
          defaultContent = {
            heading: "What We Do",
            subheading: "Our comprehensive approach to financial planning",
            service1: {
              heading: "Investment Management",
              text: "Strategic portfolio management"
            },
            service2: {
              heading: "Retirement Planning",
              text: "Secure your future"
            },
            service3: {
              heading: "Tax Planning",
              text: "Optimize your tax strategy"
            }
          };
          break;
        case 'Section5-WhoWeHelp':
          defaultContent = {
            heading: "Who We Help",
            subheading: "Our clients include:",
            client1: {
              heading: "Individuals",
              text: "Personal financial planning"
            },
            client2: {
              heading: "Families",
              text: "Generational wealth planning"
            },
            client3: {
              heading: "Business Owners",
              text: "Business succession planning"
            }
          };
          break;
        case 'Section6-Testimonials':
          defaultContent = {
            heading: "What Our Clients Say",
            testimonial1: {
              text: "Walker Lane has transformed our financial future.",
              author: "John & Sarah D."
            },
            testimonial2: {
              text: "Professional, knowledgeable, and caring team.",
              author: "Michael R."
            },
            testimonial3: {
              text: "They helped us achieve our retirement goals.",
              author: "Patricia M."
            }
          };
          break;
        case 'Section7-Quote':
          defaultContent = {
            quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
            author: "Chinese Proverb"
          };
          break;
        case 'Section8-AboutUs':
          defaultContent = {
            heading: "About Us",
            subheading: "Meet our team of dedicated professionals",
            bio: "With over 20 years of experience in financial planning..."
          };
          break;
        case 'Section9-Download':
          defaultContent = {
            heading: "Get Started Today",
            subheading: "Download our free financial planning guide",
            buttonText: "Download Guide"
          };
          break;
        default:
          defaultContent = { heading: "", subheading: "" };
      }

      return NextResponse.json({
        content: defaultContent,
        updated_at: new Date().toISOString()
      });
    }

    return NextResponse.json({
      content: data.content,
      updated_at: data.updated_at
    });
  } catch (error) {
    console.error('Error fetching section content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    );
  }
} 