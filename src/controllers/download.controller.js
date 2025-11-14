import { API_URL } from "../config/api";

export const downloadVideo = async (url, format_id) => {
  try {
    const response = await fetch(`${API_URL}/api/videos/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, format_id }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response; // download stream
  } catch (error) {
    console.error("Error al descargar:", error);
    throw error;
  }
};
