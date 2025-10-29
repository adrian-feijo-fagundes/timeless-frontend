import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

export function Card({ children }: ViewProps) {
  return <View style={styles.card}>{children}</View>;
}

export function CardHeader({ children }: ViewProps) {
  return <View style={styles.header}>{children}</View>;
}

export function CardContent({ children }: ViewProps) {
  return <View style={styles.content}>{children}</View>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  header: { marginBottom: 6 },
  content: {},
  title: { fontWeight: "600", color: "#387373", fontSize: 16 },
});
