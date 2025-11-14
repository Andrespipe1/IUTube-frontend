import { API_URL } from "../config/api";

export const searchYouTube = async (url) => {
  try {
    const res = await fetch(`${API_URL}/api/videos/info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (data.error) {
      console.log("Error en backend:", data.error);
      return null;
    }

    return data; // el backend ya devuelve info de formatos, titulo, thumbnail, etc.
  } catch (err) {
    console.error("ERROR FRONT:", err);
    return null;
  }
};
