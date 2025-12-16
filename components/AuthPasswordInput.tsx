import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function AuthPasswordInput(props: any) {
  const [secure, setSecure] = useState(true);

  return (
    <TextInput
      {...props}
      mode="outlined"
      secureTextEntry={secure}
      label={props.label ?? "Senha"}
      outlineColor="#ffffff"
      activeOutlineColor="#ffffff"
      textColor="#ffffff"
      style={[styles.input, props.style]}
      right={
        <TextInput.Icon
          icon={secure ? "eye" : "eye-off"}
          onPress={() => setSecure((p) => !p)}
          color="#ffffff"
        />
      }
      theme={{
        colors: {
          onSurfaceVariant: "#ffffff",
          primary: "#ffffff",
          background: "transparent",
          placeholder: "#ffffff",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: "#4B9F9F",
  },
});
