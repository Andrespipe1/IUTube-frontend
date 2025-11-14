import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { downloadVideo } from "../controllers/download.controller";
import { formatBytes } from "../utils/formatBytes";

export default function PlayerScreen({ route, navigation }) {
  const { video } = route.params;
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    // Seleccionar el mejor formato por defecto
    if (video.formats && video.formats.length > 0) {
      const bestFormat = video.formats.find(
        (f) => f.resolution && f.vcodec !== "none"
      ) || video.formats[0];
      setSelectedFormat(bestFormat);
    }
  }, [video]);

  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = async () => {
    if (!selectedFormat) {
      Alert.alert("Error", "Por favor selecciona un formato");
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await downloadVideo(video.url, selectedFormat.format_id);

      // Crear nombre de archivo seguro
      const fileName = `${video.title.replace(/[^a-z0-9]/gi, "_").substring(0, 50)}.${selectedFormat.ext || "mp4"}`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Obtener el tamaño total si está disponible
      const contentLength = response.headers.get("content-length");
      const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

      // Leer el stream en chunks
      const reader = response.body.getReader();
      const chunks = [];
      let receivedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedBytes += value.length;

        if (totalBytes > 0) {
          setDownloadProgress(receivedBytes / totalBytes);
        }
      }

      // Combinar todos los chunks en un solo Uint8Array
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }

      // Convertir a base64
      const base64 = btoa(String.fromCharCode(...combined));

      // Guardar el archivo (expo-file-system usa 'base64' como string)
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: 'base64',
      });

      Alert.alert(
        "¡Descarga completada!",
        `El video se guardó en: ${fileUri}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error en descarga:", error);
      Alert.alert(
        "Error",
        "No se pudo descargar el video. " + (error.message || "Error desconocido")
      );
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  const getFormatLabel = (format) => {
    if (format.resolution) return format.resolution;
    if (format.ext) return format.ext.toUpperCase();
    return `Formato ${format.format_id}`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Thumbnail/Video Preview */}
      <View style={styles.videoContainer}>
        {video.thumbnail ? (
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="videocam-outline" size={50} color="#999" />
          </View>
        )}
      </View>

      {/* Video Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{video.title}</Text>
        {video.uploader && (
          <Text style={styles.uploader}>Por: {video.uploader}</Text>
        )}
        {video.duration && (
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>
              {formatDuration(video.duration)}
            </Text>
          </View>
        )}
      </View>

      {/* Format Selection */}
      {video.formats && video.formats.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seleccionar Calidad</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {video.formats.map((format) => (
              <TouchableOpacity
                key={format.format_id}
                style={[
                  styles.formatButton,
                  selectedFormat?.format_id === format.format_id &&
                    styles.formatButtonSelected,
                ]}
                onPress={() => setSelectedFormat(format)}
              >
                <Text
                  style={[
                    styles.formatText,
                    selectedFormat?.format_id === format.format_id &&
                      styles.formatTextSelected,
                  ]}
                >
                  {getFormatLabel(format)}
                </Text>
                {format.filesize && (
                  <Text style={styles.formatSize}>
                    {formatBytes(format.filesize)}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Download Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[
            styles.downloadButton,
            (downloading || !selectedFormat) && styles.downloadButtonDisabled,
          ]}
          onPress={handleDownload}
          disabled={downloading || !selectedFormat}
        >
          {downloading ? (
            <View style={styles.downloadProgress}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.downloadButtonText}>
                Descargando... {Math.round(downloadProgress * 100)}%
              </Text>
            </View>
          ) : (
            <>
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.downloadButtonText}>Descargar Video</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Selected Format Info */}
      {selectedFormat && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formato Seleccionado</Text>
          <View style={styles.formatInfo}>
            <Text style={styles.formatInfoText}>
              Resolución: {selectedFormat.resolution || "N/A"}
            </Text>
            <Text style={styles.formatInfoText}>
              Formato: {selectedFormat.ext?.toUpperCase() || "N/A"}
            </Text>
            {selectedFormat.filesize && (
              <Text style={styles.formatInfoText}>
                Tamaño: {formatBytes(selectedFormat.filesize)}
              </Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  videoContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  uploader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  formatButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  formatButtonSelected: {
    backgroundColor: "#fff",
    borderColor: "#ff4444",
  },
  formatText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  formatTextSelected: {
    color: "#ff4444",
  },
  formatSize: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "#ff4444",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  downloadButtonDisabled: {
    backgroundColor: "#ccc",
  },
  downloadProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  formatInfo: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  formatInfoText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
});
