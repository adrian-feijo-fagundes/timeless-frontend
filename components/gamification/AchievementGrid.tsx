import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface AchievementCardProps {
  title: string;
  description?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
}

export function AchievementCard({
  title,
  description,
  icon = "trophy",
}: AchievementCardProps) {
  return (
    <View style={styles.card}>
      <FontAwesome name={icon} size={28} color="#387373" />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.desc}>{description}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E4EDED",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#387373",
  },
  desc: {
    fontSize: 13,
    color: "#4A4A4A",
  },
});
