// components/TaskCard.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type Props = {
  task: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium" style={styles.title}>
          {task.title}
        </Text>

        {!!task.description && (
          <Text style={{ color: "#ffffffff" }} variant="bodySmall">{task.description}</Text>
        )}

        {!!task.limitDate && (
          <Text style={{ color: "#ffffffff" }} variant="bodySmall">
            Data limite: {task.limitDate}
          </Text>
        )}

        {!!task.group?.title && (
          <Text style={{ color: "#ffffffff" }} variant="bodySmall">
            Grupo: {task.group.title}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <IconButton icon="pencil" iconColor="#fff" onPress={onEdit} />
        <IconButton icon="delete" iconColor="red" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#387373",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,

        // 🔹 iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // 🔹 Android
    elevation: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
  },
});
