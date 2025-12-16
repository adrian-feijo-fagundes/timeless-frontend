import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  label?: string;
  textColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  placeholderTextColor?: string;
  style?: any;
  [key: string]: any;
};

export default function AuthPasswordInput({
  label = "Senha",
  textColor = "#ffffff",
  outlineColor = "#ffffff",
  activeOutlineColor = "#ffffff",
  placeholderTextColor = "#ffffff",
  style,
  ...rest
}: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <TextInput
      {...rest}
      mode="outlined"
      secureTextEntry={secure}
      label={label}

      /* 🔹 CORES CONTROLÁVEIS */
      textColor={textColor}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      placeholderTextColor={placeholderTextColor}

      style={[styles.input, style]}

      right={
        <TextInput.Icon
          icon={secure ? "eye" : "eye-off"}
          onPress={() => setSecure((p) => !p)}
          color={textColor}
        />
      }

      theme={{
        colors: {
          primary: activeOutlineColor,
          placeholder: placeholderTextColor,
          onSurfaceVariant: placeholderTextColor,
          background: "transparent",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: "#4B9F9F", // login
  },

});
