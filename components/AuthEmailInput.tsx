import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function AuthTextInput(props: any) { 
  return (
    <TextInput
      {...props}
      mode="outlined"

      
      style={[styles.input, props.style]}
      theme={{
        colors: {
          onSurfaceVariant: "#ffffff",
          primary: "#ffffff",      // cor da borda quando ativo
          outline: "#ffffff",      // borda quando inativo
          onSurface: "#ffffff",    // cor do texto digitado e da label
          background: "transparent",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 14,
    backgroundColor: "#4B9F9F",
    
  },
});
