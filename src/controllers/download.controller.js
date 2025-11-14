import { View, Text, Image, Button } from "react-native";
import { downloadVideo } from "../controllers/download.controller";

export default function VideoCard({ video }) {
  return (
    <View style={{ padding: 10 }}>
      <Image
        source={{ uri: video.thumbnail }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />

      <Text numberOfLines={2} style={{ marginTop: 10 }}>
        {video.title}
      </Text>

      <Button
        title="Ver formatos"
        onPress={() => console.log(video.formats)}
      />
    </View>
  );
}
