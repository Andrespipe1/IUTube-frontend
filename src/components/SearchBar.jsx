import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Buscar video..."
        style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
        value={text}
        onChangeText={setText}
      />
      <Button title="Buscar" onPress={() => onSearch(text)} />
    </View>
  );
}
