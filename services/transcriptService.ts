import { YoutubeTranscript } from 'youtube-transcript';

interface TranscriptEntry {
  offset: number;
  text: string;
}

export async function getVideoTranscript(videoUrl: string): Promise<string> {
  try {
    // console.log("in trans service" , videoUrl)
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl) as TranscriptEntry[];
    if (!transcript) {
      throw new Error('No transcript available for this video');
    }

    return toString(transcript);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transcript';
    throw new Error(`Failed to get transcript: ${errorMessage}`);
  }
}

function toString(transcript: TranscriptEntry[]): string {
  let result = "00:00 - Introduction\n";

  transcript.forEach((entry) => {
    const timestamp = formatTimestamp(entry.offset);
    result += `${timestamp} - ${entry.text.replace(/&amp;#39;/g, "'")}\n`;
  });

  return result;
}

function formatTimestamp(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
}
