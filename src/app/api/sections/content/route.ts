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
      let defaultContent = {
        text: {},
        images: {}
      };
      
      switch (sectionId) {
        case 'Section1-Hero':
          defaultContent.text = {
            "hero-heading": "Welcome To Walker Lane",
            "hero-subtext": "YOUR FINANCIAL ADVISORS"
          };
          defaultContent.images = {
            "background": "/images/boatHero.jpeg"
          };
          break;
        case 'Section2-Promise':
          defaultContent.text = {
            "promise-heading": "Think of us as your financial friends",
            "promise-text": "Ready to simplify the complexities of money management so you can focus on what truly matters: your dreams."
          };
          defaultContent.images = {
            "background": "/images/wallet.jpeg"
          };
          break;
        case 'Section3-Clarity-Confidence-Freedom':
          defaultContent.text = {
            "clarity-heading": "Clarity",
            "clarity-text": "Understanding your financial situation",
            "confidence-heading": "Confidence",
            "confidence-text": "Making informed decisions",
            "freedom-heading": "Freedom",
            "freedom-text": "Achieving your financial goals"
          };
          defaultContent.images = {};
          break;
        case 'Section4-WhatWeDo':
          defaultContent.text = {
            "heading": "What We Do",
            "subtext": "Our comprehensive approach to financial planning",
            "service1-heading": "Investment Management",
            "service1-text": "Strategic portfolio management",
            "service2-heading": "Retirement Planning",
            "service2-text": "Secure your future",
            "service3-heading": "Tax Planning",
            "service3-text": "Optimize your tax strategy"
          };
          defaultContent.images = {};
          break;
        case 'Section5-WhoWeHelp':
          defaultContent.text = {
            "heading": "Who We Help",
            "subtext": "Our clients include:",
            "client1-heading": "Individuals",
            "client1-text": "Personal financial planning",
            "client2-heading": "Families",
            "client2-text": "Generational wealth planning",
            "client3-heading": "Business Owners",
            "client3-text": "Business succession planning"
          };
          defaultContent.images = {
            "background": "/images/family.jpeg"
          };
          break;
        case 'Section6-Testimonials':
          defaultContent.text = {
            "heading": "What Our Clients Say",
            "testimonial1-text": "Walker Lane has transformed our financial future.",
            "testimonial1-author": "John & Sarah D.",
            "testimonial2-text": "Professional, knowledgeable, and caring team.",
            "testimonial2-author": "Michael R.",
            "testimonial3-text": "They helped us achieve our retirement goals.",
            "testimonial3-author": "Patricia M."
          };
          defaultContent.images = {};
          break;
        case 'Section7-Quote':
          defaultContent.text = {
            "quote-text": "The best time to plant a tree was 20 years ago. The second best time is now.",
            "quote-author": "Chinese Proverb"
          };
          defaultContent.images = {
            "background": "/images/tree.jpeg"
          };
          break;
        case 'Section8-AboutUs':
          defaultContent.text = {
            "heading": "About Us",
            "subtext": "Meet our team of dedicated professionals",
            "bio-text": "With over 20 years of experience in financial planning..."
          };
          defaultContent.images = {
            "team": "/images/team.jpeg"
          };
          break;
        case 'Section9-Download':
          defaultContent.text = {
            "heading": "Get Started Today",
            "subtext": "Download our free financial planning guide",
            "button-text": "Download Guide"
          };
          defaultContent.images = {
            "background": "/images/guide.jpeg"
          };
          break;
        default:
          defaultContent = { text: {}, images: {} };
      }

      return NextResponse.json({
        content: defaultContent,
        updated_at: new Date().toISOString()
      });
    }

    // Ensure the content has both text and images
    const content = {
      text: data.content.text || {},
      images: data.content.images || {}
    };

    return NextResponse.json({
      content,
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