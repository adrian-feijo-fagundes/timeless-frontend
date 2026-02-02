import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

const weekDays = [
  { label: "Dom", value: 0 },
  { label: "Seg", value: 1 },
  { label: "Ter", value: 2 },
  { label: "Qua", value: 3 },
  { label: "Qui", value: 4 },
  { label: "Sex", value: 5 },
  { label: "Sáb", value: 6 },
];

type Props = {
  value: number[];
  onChange: (days: number[]) => void;
};

export default function WeekDaysSelector({ value, onChange }: Props) {
  function toggle(day: number) {
    onChange(
      value.includes(day)
        ? value.filter((d) => d !== day)
        : [...value, day]
    );
  }

  return (
    <View>
      <Text style={styles.label}>Dias ativos</Text>

      <View style={styles.row}>
        {weekDays.map((d) => {
          const selected = value.includes(d.value);

          return (
            <Chip
              key={d.value}
              selected={selected}
              onPress={() => toggle(d.value)}
              style={[
                styles.chip,
                selected && styles.chipSelected,
              ]}
              textStyle={[
                styles.chipText,
                selected && styles.chipTextSelected,
              ]}
            >
              {d.label}
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
    borderColor: "#fafafaff",
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
