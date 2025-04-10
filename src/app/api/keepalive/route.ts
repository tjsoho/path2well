import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // First, try to get the existing counter
    const { data: existingData, error: fetchError } = await supabase
      .from('keepalive_counter')
      .select('id, count')
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found"
      throw fetchError;
    }

    // If the table doesn't exist or has no data, create it
    if (!existingData) {
      const { error: createError } = await supabase
        .from('keepalive_counter')
        .insert({ count: 1 });

      if (createError) throw createError;
    } else {
      // Increment the existing counter
      const { error: updateError } = await supabase
        .from('keepalive_counter')
        .update({ count: (existingData.count || 0) + 1 })
        .eq('id', existingData.id);

      if (updateError) throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in keepalive route:', error);
    return NextResponse.json(
      { error: 'Failed to update keepalive counter' },
      { status: 500 }
    );
  }
} 