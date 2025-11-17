import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export function TaskModal({ visible, onClose, onSave }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isHabit, setIsHabit] = useState(false);

  const save = () => {
    if (!title.trim()) return;

    onSave({ title, desc, isHabit });

    setTitle("");
    setDesc("");
    setIsHabit(false);
    Keyboard.dismiss();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.header}>Nova Tarefa</Text>

              <TextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />

              <TextInput
                placeholder="Descrição (opcional)"
                value={desc}
                onChangeText={setDesc}
                style={[styles.input, { height: 80 }]}
                multiline
              />

              {/* Toggle hábito */}
              <TouchableOpacity
                onPress={() => setIsHabit(!isHabit)}
                style={styles.habitRow}
              >
                <FontAwesome
                  name={isHabit ? "check-square-o" : "square-o"}
                  size={22}
                  color="#387373"
                />
                <Text style={styles.habitText}>Isto é um hábito</Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.cancel} onPress={onClose}>
                  <FontAwesome name="times" size={18} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.save} onPress={save}>
                  <FontAwesome name="check" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  habitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  habitText: { fontSize: 16 },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancel: {
    backgroundColor: "#E74C3C",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  save: {
    backgroundColor: "#387373",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
});
