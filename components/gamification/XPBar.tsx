import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export function XPBar({ xp }: { xp: number }) {
  const percent = Math.min((xp % 100) / 100, 1);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesome name="star" size={18} color="#FFD166" />
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>

      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${percent * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  xpText: { fontWeight: "600", color: "#387373" },
  barBg: {
    height: 8,
    backgroundColor: "#e3e3e3",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#387373",
  },
});
