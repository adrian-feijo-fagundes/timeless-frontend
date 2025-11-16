import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
};

export default function AuthButton({ title, onPress, loading, style }: AuthButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.btnPressed,
        loading && styles.btnDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#387373" />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#387373",
    fontWeight: "700",
    fontSize: 16,
  },
});
