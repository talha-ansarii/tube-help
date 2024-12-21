import { Copy } from 'lucide-react';
import React, { useState } from 'react';

type Timestamp = {
  time: string;
  label: string;
};

type TimestampTimelineProps = {
  timestamps: string;
  onTimestampClick: (time: number) => void;
};

export function TimestampTimeline({ timestamps, onTimestampClick }: TimestampTimelineProps) {
  const [copied, setCopied] = useState(false);
 


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(timestamps);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  function parseTimestamps(input: string): Timestamp[] {
    const lines = input.split("\n");
    const parsedTimestamps: Timestamp[] = [];

    for (const line of lines) {
      const match = line.match(/^(\d{1,2}:\d{2})\s*-\s*(.+)$/); // Allow 1 or 2 digits for minutes
      if (match) {
        const [_, time, label] = match;
        parsedTimestamps.push({ time, label });
      }
    }

    return parsedTimestamps;
  }

  function convertTimeToSeconds(time: string): number {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  const parsedTimestamps = parseTimestamps(timestamps);

  return (
    <div className="mt-4 flex  justify-between items-start bg-[#F3F4F6] p-5 rounded-lg">
      <div className='flex flex-col space-y-2'>
      {parsedTimestamps.map((timestamp, index) => (
        <button
        key={index}
        onClick={() => onTimestampClick(convertTimeToSeconds(timestamp.time))}
        className="flex flex-row items-center space-x-4"
        >
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span className="text-sm text-left font-medium text-gray-700">{timestamp.time}</span>
          <span className="text-sm text-left text-gray-500">{timestamp.label}</span>
        </button>
      ))}
        
      </div>
      <button onClick={handleCopy} >
      <Copy className={`
        ${copied ? 'text-green-500' : 'text-gray-500'}
        cursor-pointer`} />

      </button>
    </div>
  );
}
