export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  // Extract video ID from URL (simplified for demonstration)
  const videoId = videoUrl.split("v=")[1] || ""

  return (
    <div className="aspect-video w-full">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

