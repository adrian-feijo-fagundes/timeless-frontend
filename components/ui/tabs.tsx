import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return <View>{children}</View>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <View style={styles.list}>{children}</View>;
}

export function TabsTrigger({
  value,
  children,
  onPress,
}: {
  value: string;
  children: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.trigger} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: { flexDirection: "row", gap: 10 },
  trigger: {
    backgroundColor: "#38737320",
    padding: 8,
    borderRadius: 8,
  },
  text: { color: "#387373", fontWeight: "500" },
});
