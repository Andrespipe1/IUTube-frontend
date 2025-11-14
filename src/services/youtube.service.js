import { API_URL } from "../config/api";

export const searchYouTube = async (url) => {
  try {
    const res = await fetch(`${API_URL}/video/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (data.error) {
      console.log("Error en backend:", data.error);
      return null;
    }

    return data; // el backend ya devuelve info de formatos, titulo, thumbnail, etc.
  } catch (err) {
    console.log("ERROR FRONT:", err);
    return null;
  }
};
