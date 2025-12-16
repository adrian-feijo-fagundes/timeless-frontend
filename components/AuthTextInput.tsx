import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  textColor?: string;
  outlineColor?: string;
  activeOutlineColor?: string;
  placeholderTextColor?: string;
  style?: any;
  [key: string]: any;
};

export default function AuthTextInput({
  textColor = "#ffffffff",
  outlineColor = "#E0E0E0",
  activeOutlineColor = "#ffffffff",
  placeholderTextColor = "#ffffffff",
  style,
  ...rest
}: Props) {
  return (
    <TextInput
      {...rest}
      mode="outlined"
      textColor={textColor}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, style]}
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
    backgroundColor: "#4B9F9F",
    borderRadius: 10,
  },
});
