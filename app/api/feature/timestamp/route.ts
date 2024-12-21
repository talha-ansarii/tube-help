// app/api/generate-timestamps/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getVideoTranscript } from '@/services/transcriptService';
import { generateTimestamps } from '@/services/timestampService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    const transcript = await getVideoTranscript(videoUrl);
    const timestamps = await generateTimestamps(transcript);

    return NextResponse.json({ timestamps });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
