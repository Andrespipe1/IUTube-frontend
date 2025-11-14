import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VideoCard({ video, onPress }) {
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        {video.uploader && (
          <Text style={styles.uploader} numberOfLines={1}>
            {video.uploader}
          </Text>
        )}
        {video.duration && (
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text style={styles.duration}>{formatDuration(video.duration)}</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  thumbnail: {
    width: 140,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  uploader: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  duration: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});
