import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button } from "./ui/button";

interface Props {
  onAddTask: (text: string) => void;
}

export function TaskInput({ onAddTask }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAddTask(text.trim());
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Adicionar" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
