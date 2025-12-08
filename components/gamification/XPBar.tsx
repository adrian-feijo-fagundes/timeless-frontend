import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface XPBarProps {
  xp: number;
  required: number;
}

export function XPBar({ xp, required }: XPBarProps) {
  const progress = Math.min(xp / required, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>XP: {xp} / {required}</Text>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 6,
  },
  barBackground: {
    height: 14,
    width: "100%",
    backgroundColor: "#D9E4E4",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#387373",
  },
});
