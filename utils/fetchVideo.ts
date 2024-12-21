
import YouTube from "youtube-sr";

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  views: string;
  channel: string;
  url: string;
}

export const fetchVideoByURL = async (url: string): Promise<VideoDetails | null> => {
  try {
    const video = await YouTube.getVideo(url);
    return {
      id: video?.id || "",
      title: video?.title || "Unknown title",
      description: video.description || "No description available",
      duration: video.durationFormatted || "Unknown duration",
      thumbnail: video.thumbnail?.url || "",
      views: video.views.toLocaleString() || "0",
      channel: video.channel?.name || "Unknown channel",
      url: `https://www.youtube.com/watch?v=${video.id}`,
    };
  } catch (error) {
    console.log("Error fetching video details:", error);
    return null;
  }
};
