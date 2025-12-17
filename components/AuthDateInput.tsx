import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function AuthDateInput({ value, onChange }: Props) {
  const [show, setShow] = useState(false);

  const handleWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      const date = new Date(dateString + "T00:00:00");
      onChange(date);
    }
  };

  return (
    <View style={styles.container}>
      {/* MOBILE: abre o picker nativo */}
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

      <View style={{ position: "relative" }}>
        {/* VISUAL DO CAMPO */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => Platform.OS !== "web" && setShow(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>
            {value ? value.toLocaleDateString("pt-BR") : "Data de nascimento"}
          </Text>

          <FontAwesome5 name="calendar-alt" size={18} color="#fff" />
        </TouchableOpacity>

        {Platform.OS === "web" && (
          <input
            type="date"
            style={styles.webInput as any}
            onChange={handleWebChange}
            value={
              value
                ? value.toISOString().split("T")[0] 
                : ""
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(1, 29, 24, 0.43)",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },

  webInput: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    cursor: "pointer",
  },
});
