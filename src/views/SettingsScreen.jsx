import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../config/api";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const handleClearCache = () => {
    Alert.alert(
      "Limpiar caché",
      "¿Estás seguro de que quieres limpiar la caché?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpiar",
          onPress: () => {
            Alert.alert("Éxito", "Caché limpiada correctamente");
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "Acerca de",
      "Snaptube Clone v1.0.0\n\nUna aplicación para descargar videos de YouTube.\n\nDesarrollado con React Native y Expo.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Notificaciones</Text>
              <Text style={styles.settingSubtitle}>Recibir notificaciones de descarga</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#ccc", true: "#ff4444" }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="download-outline" size={24} color="#333" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Descarga automática</Text>
              <Text style={styles.settingSubtitle}>Descargar automáticamente después de seleccionar</Text>
            </View>
          </View>
          <Switch
            value={autoDownload}
            onValueChange={setAutoDownload}
            trackColor={{ false: "#ccc", true: "#ff4444" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servidor</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons name="server-outline" size={24} color="#333" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>URL del servidor</Text>
              <Text style={styles.settingSubtitle} numberOfLines={1}>{API_URL}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.actionItem} onPress={handleClearCache}>
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
          <Text style={styles.actionText}>Limpiar caché</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleAbout}>
          <Ionicons name="information-circle-outline" size={24} color="#333" />
          <Text style={styles.actionText}>Acerca de</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    textTransform: "uppercase",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: "#666",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
});
