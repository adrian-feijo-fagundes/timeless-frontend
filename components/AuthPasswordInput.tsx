import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  variant?: "dark" | "light";
} & React.ComponentProps<typeof TextInput>;

export default function AuthPasswordInput({
  variant = "dark",
  style,
  ...props
}: Props) {
  const [secure, setSecure] = useState(true);

  const isLight = variant === "light";

  return (
    <TextInput
      {...props}
      mode="outlined"
      secureTextEntry={secure}
      label={props.label ?? "Senha"}
      style={[
        styles.input,
        {
          backgroundColor: isLight
            ? "#E6F2F0" // verde claro no fundo branco
            : "rgba(1, 29, 24, 0.43)",
        },
        style,
      ]}
      outlineColor={isLight ? "#387373" : "#ffffff"}
      activeOutlineColor={isLight ? "#387373" : "#ffffff"}
      textColor={isLight ? "#000000" : "#ffffff"}
      right={
        <TextInput.Icon
          icon={secure ? "eye" : "eye-off"}
          onPress={() => setSecure((p) => !p)}
          color={isLight ? "#387373" : "#ffffff"}
        />
      }
      theme={{
        colors: {
          primary: isLight ? "#387373" : "#ffffff",
          onSurfaceVariant: isLight ? "#387373" : "#ffffff",
          placeholder: isLight ? "#6B6B6B" : "#ffffff",
          background: "transparent",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
