import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  group: any;
  onEdit: () => void;
  onDelete: () => void;
};

const GRADIENT = ["#3F8F8F", "#387373"] as const;

export default function GroupCard({ group, onEdit, onDelete }: Props) {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <Text
            variant="titleMedium"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            {group.title}
          </Text>

          {!!group.description && (
            <Text variant="bodySmall" style={styles.subText}>
              {group.description}
            </Text>
          )}

          <Text variant="bodySmall" style={styles.subText}>
            Máx. tarefas/dia: {group.maxTasksPerDay}
          </Text>
        </View>

        <View style={styles.actions}>
          <IconButton icon="pencil" iconColor="#fff" onPress={onEdit} />
          <IconButton icon="delete" iconColor="#ff6b6b" onPress={onDelete} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 14,
    marginBottom: 12,

    // sombra Android
    elevation: 6,

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    backgroundColor: "transparent",
  },

  card: {
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginRight: 8,
  },

  subText: {
    color: "#e0f2f1",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
  },
});
