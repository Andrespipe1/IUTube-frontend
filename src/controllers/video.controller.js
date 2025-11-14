import { searchYouTube } from "../services/youtube.service";

export const getVideos = async (url) => {
  const info = await searchYouTube(url);

  if (!info || !info.video_details) return [];

  return [
    {
      id: info.video_details.id || url,
      title: info.video_details.title,
      thumbnail: info.video_details.thumbnail,
      duration: info.video_details.duration,
      uploader: info.video_details.uploader,
      formats: info.formats || [], // ahora incluye todos los formatos disponibles
      url,                   // url original
    },
  ];
};
