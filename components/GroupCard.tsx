import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

type Props = {
  group: any;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GroupCard({ group, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text
          style={{ color: "#ffffffff", fontWeight: "bold" }}
          variant="titleMedium"
        >
          {group.title}
        </Text>

        {!!group.description && (
          <Text variant="bodySmall">{group.description}</Text>
        )}

        <Text style={{ color: "#ffffffff" }} variant="bodySmall">
          Máx. tarefas/dia : {group.maxTasksPerDay}
        </Text>
      </View>

      <View style={styles.actions}>
        <IconButton icon="pencil" iconColor="#ffffffff" onPress={onEdit} />
        <IconButton icon="delete" iconColor="red" onPress={onDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#387373ff",
    borderRadius: 8,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
  },
});
