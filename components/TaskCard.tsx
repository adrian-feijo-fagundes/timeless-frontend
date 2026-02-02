import { formatDateBR } from "@/utils/formatDate";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
type Props = {
  task: any;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
}: Props) {
  const theme = useTheme();
  const completed = !!task.completedAt; // ajuste ao seu backend

  return (
    <View style={[styles.card, completed && { opacity: 0.6 }]}>
      <View style={{ flex: 1 }}>
        <Text
          variant="titleMedium"
          style={[
            styles.title,
            completed && { textDecorationLine: "line-through" },
          ]}
        >
          {task.title}
        </Text>

        {!!task.description && (
          <Text style={styles.text} variant="bodySmall">
            {task.description}
          </Text>
        )}

        {!!task.topic && (
          <Text style={styles.text} variant="bodySmall">
            Tópico: {task.topic}
          </Text>
        )}

        {!!task.limitDate && (
          <Text style={styles.text} variant="bodySmall">
            Data limite: {formatDateBR(task.limitDate)}
          </Text>
        )}

        {!!task.group?.title && (
          <Text style={styles.text} variant="bodySmall">
            Grupo: {task.group.title}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        {!completed && (
          <IconButton
            icon="check"
            iconColor="#fff"
            onPress={onComplete}
            accessibilityLabel="Completar tarefa"
          />
        )}

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={onEdit}
          disabled={completed}
        />

        <IconButton
          icon="delete"
          iconColor={theme.colors.error}
          onPress={onDelete}
        />
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
  },
  title: {
    color: "#fff",
    fontWeight: "700",
  },
  text: {
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
