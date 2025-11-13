// components/PasswordInput.tsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Senha",
}: PasswordInputProps) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.passwordRow}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder={placeholder}
        placeholderTextColor="#ffffffff"
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        textContentType="password"
      />
      <TouchableOpacity
        onPress={() => setSecure((s) => !s)}
        style={styles.showBtn}
      >
        <Text style={styles.showBtnText}>
          {secure ? "Mostrar" : "Ocultar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  showBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  showBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
