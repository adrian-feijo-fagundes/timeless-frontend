import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function AuthTextInput(props: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#ffffffff"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ffffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#4B9F9F",
    color: "#fff",
  },
});
