import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = React.ComponentProps<typeof TextInput> & {
  variant?: "light" | "dark";
};

export default function AuthTextInput({
  variant = "dark",
  style,
  ...props
}: Props) {
  const isLight = variant === "light";

  return (
    <TextInput
      {...props}
      mode="outlined"
      style={[
        styles.input,
        isLight && styles.lightInput,
        style,
      ]}
      theme={{
        colors: {
          primary: isLight ? "#387373" : "#ffffff",
          outline: isLight ? "#387373" : "#ffffff",
          onSurface: isLight ? "#387373" : "#ffffff",
          onSurfaceVariant: isLight ? "#387373" : "#ffffff",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 52,
    marginBottom: 10,
    backgroundColor: "#4b9f9f",
  },
  lightInput: {
    backgroundColor: "#ffffff",
  },
});
