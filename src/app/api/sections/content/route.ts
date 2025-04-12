import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const sectionId = searchParams.get('sectionId');

  console.log('API Route - Request received:', { pageId, sectionId });

  if (!pageId || !sectionId) {
    console.log('API Route - Missing parameters');
    return NextResponse.json(
      { error: 'Missing pageId or sectionId' },
      { status: 400 }
    );
  }

  try {
    console.log(`API Route - Fetching content for pageId: ${pageId}, sectionId: ${sectionId}`);
    
    const { data, error } = await supabase
      .from('page_content')
      .select('content')
      .eq('page_id', pageId)
      .eq('section_id', sectionId)
      .single();

    console.log('API Route - Raw database response:', { data, error });

    if (error) {
      console.error(`API Route - Error fetching content for ${sectionId}:`, error);
      
      // If the error is that no rows were returned, return an empty object
      if (error.code === 'PGRST116') {
        console.log(`API Route - No content found for ${sectionId}, returning empty object`);
        return NextResponse.json({ content: {} });
      }
      
      throw error;
    }

    console.log(`API Route - Found content for ${sectionId}:`, {
      content: data?.content,
      contentType: typeof data?.content,
      contentKeys: data?.content ? Object.keys(data.content) : []
    });
    
    return NextResponse.json({ content: data?.content || {} });
    
  } catch (error) {
    console.error('API Route - Error fetching section content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    );
  }
} 