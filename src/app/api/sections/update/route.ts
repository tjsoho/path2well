import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { pageId, sectionId, content } = await request.json();

    const { error } = await supabase
      .from('page_content')
      .upsert({
        page_id: pageId,
        section_id: sectionId,
        content: content,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'page_id,section_id'
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Failed to update section' },
      { status: 500 }
    );
  }
} 