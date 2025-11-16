import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export function TaskItem({ task, onToggle, onDelete }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.left}>
        <FontAwesome
          name={task.completed ? "check-circle" : "circle-o"}
          size={22}
          color={task.completed ? "#387373" : "#888"}
        />
        <Text
          style={[
            styles.text,
            task.completed && { textDecorationLine: "line-through", color: "#888" },
          ]}
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <FontAwesome name="trash" size={20} color="#E74C3C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  text: { fontSize: 16 },
});
