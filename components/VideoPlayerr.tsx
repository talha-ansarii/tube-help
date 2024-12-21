import YouTube, { YouTubePlayer } from "react-youtube";
import React, { useRef } from "react";

type VideoPlayerProps = {
  videoUrl: string;
  onSeek: (seekFunction: (time: number) => void) => void;
};

export function VideoPlayer({ videoUrl, onSeek }: VideoPlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const videoId = videoUrl.split("v=")[1]?.split("&")[0];

  const handleReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;

    // Provide the seek function to the parent
    onSeek((time: number) => {
      if (playerRef.current) {
        playerRef.current.seekTo(time, true); // Seek to the desired time
      }
    });
  };

  return (
    <div className="w-full h-full">

      <YouTube
      iframeClassName="w-full h-[300px] md:h-[400px]"
      height="100%"
      width="100%"
        videoId={videoId}
        onReady={handleReady}
        opts = {{
          playerVars: {
            autoplay: 0, // Disable autoplay initially
            controls: 1, // Enable controls
            rel: 0,      // Disable related videos
            mute: 0,     // Unmute
            modestbranding: 1, // Remove YouTube branding
          },
        }}
      />
    </div>
  );
}
