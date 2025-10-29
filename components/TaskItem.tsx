import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <FontAwesome
          name={task.completed ? "check-circle" : "circle-thin"}
          size={24}
          color="#387373"
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          task.completed && { textDecorationLine: "line-through", color: "#999" },
        ]}
      >
        {task.text}
      </Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <FontAwesome name="trash" size={22} color="#cc4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 8,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
