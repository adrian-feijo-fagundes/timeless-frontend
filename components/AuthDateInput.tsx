import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function AuthDateInput({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      {/* MOBILE */}
      {Platform.OS !== "web" && show && (
        <DateTimePicker
          value={value || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShow(false);
            if (date) onChange(date);
          }}
        />
      )}

      {/* CAMPO VISUAL */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShow(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>
          {value ? value.toLocaleDateString("pt-BR") : "Data de nascimento"}
        </Text>

        <FontAwesome5 name="calendar-alt" size={18} color="#fff" />
      </TouchableOpacity>

      {/* WEB */}
      {Platform.OS === "web" && (
        <input
          type="date"
          value={value ? value.toISOString().substring(0, 10) : ""}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate.getTime())) onChange(newDate);
          }}
          style={styles.webInput}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#4B9F9F",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  webInput: {
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4B9F9F",
    color: "#fff",
    width: "100%",
  },
});
