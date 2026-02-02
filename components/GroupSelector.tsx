import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

type Group = {
  id: number;
  title: string;
};

type Props = {
  groups: Group[];
  value: number | null;
  onChange: (groupId: number | null) => void;
};

export default function GroupSelector({ groups, value, onChange }: Props) {
  function select(groupId: number) {
    onChange(groupId === value ? null : groupId);
  }

  return (
    <View>
      <Text style={styles.label}>Grupo (Obrigatório)</Text>

      <View style={styles.row}>
        {groups.map((g) => {
          const selected = value === g.id;

          return (
            <Chip
              key={g.id}
              onPress={() => select(g.id)}
              style={[styles.chip, selected && styles.chipSelected]}
              textStyle={[styles.chipText, selected && styles.chipTextSelected]}
            >
              {g.title}
            </Chip>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#ffffffff",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  chip: {
    backgroundColor: "#387373",
    borderWidth: 1,
    borderColor: "#ffffffff",
  },

  chipSelected: {
    backgroundColor: "#ffffffff",
  },

  chipText: {
    color: "#ffffffff",
    fontWeight: "600",
  },

  chipTextSelected: {
    color: "#387373",
  },
});
