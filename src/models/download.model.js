export const createDownload = (video, filePath) => ({
  id: video.id,
  title: video.title,
  path: filePath,
  date: new Date(),
});
