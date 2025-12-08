
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import AuthTextInput from "./AuthTextInput";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AuthPasswordInput(props: TextInputProps) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.row}>
      <AuthTextInput
        {...props}
        secureTextEntry={secure}
        style={[styles.input, props.style]}
        placeholderTextColor="#ffffffff"
      />

      <TouchableOpacity
        onPress={() => setSecure((prev) => !prev)}
        style={styles.showBtn}
      >
        <FontAwesome5
          name={secure ? "eye-slash" : "eye"}
          size={20}
          color="#ffffffff" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ffffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#4B9F9F",
    color: "#fff",
  },
  showBtn: {
    paddingHorizontal: 10,
    marginLeft: -45,

    justifyContent: "center",
    height: 40,
    alignItems: "center"
  },
});
