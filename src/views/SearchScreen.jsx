import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../controllers/video.controller";

export default function SearchScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      alert("Por favor ingresa una URL de YouTube");
      return;
    }

    setLoading(true);
    try {
      const result = await getVideos(query);

      if (result.length === 0) {
        alert("No se pudo obtener información del video 😢\nVerifica que la URL sea válida");
        return;
      }

      setVideos(result);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      alert("Error al buscar el video. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = (video) => {
    navigation.navigate("Player", { video });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ff4444" />
          <Text style={styles.loadingText}>Obteniendo información del video...</Text>
        </View>
      ) : videos.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>🔍 Busca un video de YouTube</Text>
          <Text style={styles.emptySubtext}>Pega la URL del video que quieres descargar</Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VideoCard video={item} onPress={() => handleVideoPress(item)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
