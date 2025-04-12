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

    // Just return the data as is, even if null
    return NextResponse.json({ content: data?.content || {} });
    
  } catch (error) {
    console.error('Error fetching section content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    );
  }
} 