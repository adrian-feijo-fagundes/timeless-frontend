    import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <View style={styles.container}>
      <FontAwesome name="star" size={18} color="#387373" />
      <Text style={styles.text}>Nível {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5F0EF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    marginLeft: 6,
    color: "#387373",
    fontSize: 16,
    fontWeight: "600",
  },
});
