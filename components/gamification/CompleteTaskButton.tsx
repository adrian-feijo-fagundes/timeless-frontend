import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useGamification } from "@/contexts/GamificationContext";

interface Props {
  taskId: number;
  onCompleted?: () => void;
}

export function CompleteTaskButton({ taskId, onCompleted }: Props) {
  const { completeTask, } = useGamification();

  async function handlePress() {
    await completeTask(taskId);
    if (onCompleted) onCompleted();
  }

  return (
    <Pressable style={styles.button} onPress={handlePress} disabled={false}>
      {false ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <FontAwesome name="check" color="#fff" size={16} />
          <Text style={styles.text}>Concluir</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#387373",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
