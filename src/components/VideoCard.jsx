import React from "react";
import { View, Text, Image } from "react-native";

export default function VideoCard({ video }) {
  return (
    <View style={{ padding: 10, flexDirection: "row" }}>
      <Image
        source={{ uri: video.thumbnail }}
        style={{ width: 120, height: 90, borderRadius: 5 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text numberOfLines={2}>{video.title}</Text>
      </View>
    </View>
  );
}
