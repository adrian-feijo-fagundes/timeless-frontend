import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

type Props = {
  groups: { id: number; title: string }[];
  value: number[];
  onChange: (value: number[]) => void;
};

export default function GroupFilter({ groups, value, onChange }: Props) {
  function toggleGroup(groupId: number) {
    if (value.includes(groupId)) {
      onChange(value.filter((id) => id !== groupId));
    } else {
      onChange([...value, groupId]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar por grupo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {groups.map((g) => {
          const selected = value.includes(g.id);
          return (
            <Chip
              key={g.id}
              onPress={() => toggleGroup(g.id)}
              style={[styles.chip, selected && styles.chipSelected]}
              textStyle={[styles.chipText, selected && styles.chipTextSelected]}
            >
              {g.title}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#387373",
  },
  chip: {
    marginRight: 8,
    backgroundColor: "#eee",
  },
  chipSelected: {
    backgroundColor: "#387373",
  },
  chipText: {
    color: "#333",
  },
  chipTextSelected: {
    color: "#fff",
  },
});
