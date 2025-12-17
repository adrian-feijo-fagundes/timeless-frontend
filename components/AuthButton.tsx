import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "dark" | "light";
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export default function AuthButton({
  title,
  onPress,
  loading,
  variant = "dark",
  style,
  labelStyle,
}: AuthButtonProps) {
  const isLight = variant === "light";

  // BOTÃO BRANCO (FUNDO VERDE)
  if (isLight) {
    return (
      <Button
        mode="contained"
        onPress={onPress}
        loading={loading}
        disabled={loading}
        style={[styles.whiteBtn, style]}
        labelStyle={[styles.whiteLabel, labelStyle]}
        contentStyle={styles.content}
      >
        {title}
      </Button>
    );
  }

  // BOTÃO VERDE (FUNDO BRANCO)
  return (
    <LinearGradient
      colors={["#4B9F9F", "#2E5D5D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      <Button
        mode="contained"
        onPress={onPress}
        loading={loading}
        disabled={loading}
        rippleColor="#8FD3D3"
        style={styles.transparentBtn}
        labelStyle={[styles.greenLabel, labelStyle]}
        contentStyle={styles.content}
      >
        {title}
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    marginTop: 6,
  },

  transparentBtn: {
    backgroundColor: "transparent",
    borderRadius: 10,

    elevation: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 10,

    overflow: "hidden",
  },

  whiteBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 6,
  },

  content: {
    paddingVertical: 10,
  },

  greenLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  whiteLabel: {
    color: "#387373",
    fontWeight: "700",
    fontSize: 16,
  },
});
