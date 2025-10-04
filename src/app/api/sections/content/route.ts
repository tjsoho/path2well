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
      .select('content')
      .eq('page_id', pageId)
      .eq('section_id', sectionId)
      .single();

    

    if (error) {
      console.error(`API Route - Error fetching content for ${sectionId}:`, error);
      
      // If the error is that no rows were returned, return an empty object
      if (error.code === 'PGRST116') {
        
        return NextResponse.json({ content: {} });
      }
      
      throw error;
    }

    
    
    return NextResponse.json({ content: data?.content || {} });
    
  } catch (error) {
    console.error('API Route - Error fetching section content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    );
  }
} 