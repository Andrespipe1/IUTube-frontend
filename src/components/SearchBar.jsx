import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleSearch = () => {
    if (text.trim()) {
      onSearch(text.trim());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Pega la URL de YouTube aquí..."
          placeholderTextColor="#999"
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
        {text.length > 0 && (
          <TouchableOpacity onPress={() => setText("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },
  clearButton: {
    marginLeft: 8,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
  },
});
