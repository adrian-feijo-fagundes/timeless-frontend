import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export function StreakCounter({ streak }: { streak: number }) {
  return (
    <View style={styles.container}>
      <FontAwesome name="fire" size={22} color="#FF6B35" />
      <Text style={styles.text}>{streak} dias seguidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  text: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
