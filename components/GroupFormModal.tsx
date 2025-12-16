import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import WeekDaysSelector from "./WeekDaysSelector";
import AuthTextInput from "@/components/AuthTextInput";
import AuthButton from "@/components/AuthButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  group?: any;
};

export default function GroupFormModal({
  visible,
  onClose,
  onSave,
  group,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState<number[]>([]);
  const [maxTasksPerDay, setMaxTasksPerDay] = useState(1);

  useEffect(() => {
    if (group) {
      setTitle(group.title);
      setDescription(group.description ?? "");
      setDays(group.days ?? []);
      setMaxTasksPerDay(group.maxTasksPerDay ?? 1);
    } else {
      setTitle("");
      setDescription("");
      setDays([0, 1, 2, 3, 4, 5, 6]);
      setMaxTasksPerDay(2);
    }
  }, [group]);

  function handleSave() {
    if (!title.trim()) return;

    onSave({ title, description, days, maxTasksPerDay });
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {group ? "Editar Grupo" : "Novo Grupo"}
          </Text>

          <AuthTextInput
            label="Nome do grupo"
            value={title}
            onChangeText={setTitle}
           
          />

          <AuthTextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
           
          />

          <WeekDaysSelector value={days} onChange={setDays} />

          <AuthTextInput
            label="Máx. tarefas por dia"
            keyboardType="numeric"
            value={String(maxTasksPerDay)}
            onChangeText={(v) => setMaxTasksPerDay(Number(v) || 0)}

          />

          <View style={styles.buttons}>
            <AuthButton title="Salvar" onPress={handleSave} />
            <AuthButton title="Cancelar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#38737366",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#387373",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#387373",
    marginBottom: 12,
  },
  buttons: {
    marginTop: 16,
    gap: 10,
  },
});
