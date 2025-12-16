import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export default function AuthButton({
  title,
  onPress,
  loading,
  style,
  labelStyle,
}: AuthButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={loading}
      rippleColor="#8FD3D3"
      style={[styles.btn, style]}
      labelStyle={[styles.label, labelStyle]}
      contentStyle={{ paddingVertical: 6 }}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 6,
    backgroundColor: "#ffffff",
    borderRadius: 4,

        // 🔹 iOS
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // 🔹 Android
    elevation: 4,
  },
  label: {
    color: "#387373",
    fontWeight: "700",
    fontSize: 16,
  },
});
