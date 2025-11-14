import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { formatBytes } from "../utils/formatBytes";

export default function DownloadsScreen() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const videoFiles = files.filter(
        (file) => file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".mkv")
      );

      const downloadsList = await Promise.all(
        videoFiles.map(async (file) => {
          const fileUri = `${FileSystem.documentDirectory}${file}`;
          const fileInfo = await FileSystem.getInfoAsync(fileUri);
          return {
            id: file,
            name: file.replace(/[_-]/g, " ").replace(/\.[^/.]+$/, ""),
            uri: fileUri,
            size: fileInfo.exists ? fileInfo.size : 0,
          };
        })
      );

      setDownloads(downloadsList);
    } catch (error) {
      console.error("Error cargando descargas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Eliminar descarga",
      `¿Estás seguro de que quieres eliminar "${item.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(item.uri, { idempotent: true });
              await loadDownloads();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el archivo");
            }
          },
        },
      ]
    );
  };

  const renderDownloadItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} activeOpacity={0.7}>
        <View style={styles.thumbnailContainer}>
          <Ionicons name="videocam" size={40} color="#ff4444" />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.size}>{formatBytes(item.size)}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Ionicons name="trash-outline" size={22} color="#ff4444" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando descargas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {downloads.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="download-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No hay descargas</Text>
          <Text style={styles.emptySubtext}>
            Los videos que descargues aparecerán aquí
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {downloads.length} {downloads.length === 1 ? "descarga" : "descargas"}
            </Text>
          </View>
          <FlatList
            data={downloads}
            keyExtractor={(item) => item.id}
            renderItem={renderDownloadItem}
            contentContainerStyle={styles.list}
          />
        </>
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
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  list: {
    padding: 8,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  size: {
    fontSize: 13,
    color: "#666",
  },
  deleteButton: {
    padding: 8,
  },
});
