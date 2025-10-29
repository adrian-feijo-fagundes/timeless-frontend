import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#387373",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  text: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
