import React, { useState } from "react";
import { View, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../controllers/video.controller";

export default function SearchScreen() {
  const [videos, setVideos] = useState([]);

const handleSearch = async (query) => {
  const result = await getVideos(query);

  if (result.length === 0) {
    alert("No se pudo obtener información del video 😢");
    return;
  }

  setVideos(result);
};

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
      />
    </View>
  );
}
