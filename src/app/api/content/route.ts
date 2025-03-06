import { promises as fs } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pageId, sectionId, content } = await request.json();
    
    const filePath = join(process.cwd(), 'src', 'content', 'pages', pageId, 'sections', `${sectionId}.json`);
    await fs.writeFile(filePath, JSON.stringify({ id: sectionId, content }, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  const sectionId = searchParams.get('sectionId');

  try {
    const filePath = join(process.cwd(), 'src', 'content', 'pages', pageId!, 'sections', `${sectionId}.json`);
    const content = await fs.readFile(filePath, 'utf8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
} 