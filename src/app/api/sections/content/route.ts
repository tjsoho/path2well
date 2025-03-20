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

    // If no content exists yet, create it with default content
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
            "promise-heading": "At <teal>Path2Well</teal>, we empower you to take <teal>control of your health</teal> through personalized, science-backed solutions.",
            "promise-text": "We combine cutting-edge genetic testing with bespoke IV therapy to create a wellness plan uniquely <teal>tailored to your needs</teal>."
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
            subheading: "We help you navigate your financial journey"
          };
          break;
        case 'Section5-WhoWeHelp':
          defaultContent = {
            heading: "Who We Help",
            subheading: "We serve clients at every stage of their financial journey"
          };
          break;
        case 'Section6-Testimonials':
          defaultContent = {
            heading: "What Our Clients Say",
            subheading: "Real stories from real people"
          };
          break;
        case 'Section7-Quote':
          defaultContent = {
            quote: "The best investment you can make is in yourself.",
            author: "Warren Buffett"
          };
          break;
        case 'Section8-AboutUs':
          defaultContent = {
            heading: "About Us",
            subheading: "Your trusted financial partner"
          };
          break;
        case 'Section9-Download':
          defaultContent = {
            heading: "Download Our Guide",
            subheading: "Get started on your financial journey today"
          };
          break;
      }

      // Insert the default content into the database
      const { data: newData, error: insertError } = await supabase
        .from('page_content')
        .insert({
          page_id: pageId,
          section_id: sectionId,
          content: defaultContent,
          updated_at: new Date().toISOString()
        })
        .select('content')
        .single();

      if (insertError) throw insertError;
      return NextResponse.json({ content: newData.content });
    }

    return NextResponse.json({ content: data.content });
  } catch (error) {
    console.error('Error fetching section content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    );
  }
} 