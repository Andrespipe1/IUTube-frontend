import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="videocam" size={80} color="#ff4444" />
        <Text style={styles.title}>IUTube</Text>
        <Text style={styles.subtitle}>
          Descarga videos de YouTube fácilmente
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Buscar")}
        >
          <Ionicons name="search" size={20} color="#fff" />
          <Text style={styles.buttonText}>Buscar Video</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Ionicons name="download-outline" size={24} color="#ff4444" />
          <Text style={styles.featureText}>Descarga rápida</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="options-outline" size={24} color="#ff4444" />
          <Text style={styles.featureText}>Múltiples calidades</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#ff4444" />
          <Text style={styles.featureText}>Seguro y confiable</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#ff4444",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    gap: 8,
    shadowColor: "#ff4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  feature: {
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
