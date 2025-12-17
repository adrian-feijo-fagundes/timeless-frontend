// components/TaskFormModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import AuthButton from "@/components/AuthButton";
import AuthTextInput from "@/components/AuthTextInput";
import GroupSelector from "@/components/GroupSelector";
import { useGroups } from "@/contexts/GroupsContext";
import { formatDateBR } from "@/utils/formatDate";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  task?: any;
};

export default function TaskFormModal({
  visible,
  onClose,
  onSave,
  task,
}: Props) {
  const { groups } = useGroups();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setLimitDate(formatDateBR(task.limitDate) ?? "");
      setGroupId(task.group?.id ?? null);
      setTopic(task.topic ?? "");
    } else {
      setTitle("");
      setTopic("");
      setLimitDate("");
      setGroupId(null);
    }
  }, [task, visible]);

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      title,
      topic,
      limitDate,
      groupId,
    });
  }

  const formatDate = (text: string) => {
    const numbersOnly = text.replace(/\D/g, "");

    if (numbersOnly.length <= 2) return numbersOnly;
    if (numbersOnly.length <= 4)
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;

    return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(
      2,
      4
    )}/${numbersOnly.slice(4, 8)}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {task ? "Editar Tarefa" : "Nova Tarefa"}
          </Text>

          <AuthTextInput
            label="Título (obrigatório)"
            value={title}
            onChangeText={setTitle}
          />

          <AuthTextInput
            label="Tópico (opcional)"
            value={topic}
            onChangeText={setTopic}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <AuthTextInput
            label="Data limite (DD-MM-YYYY)"
            value={limitDate}
            onChangeText={(text) => setLimitDate(formatDate(text))}
            keyboardType="numeric"
            mode="outlined"
          />

          {/* SELECTOR DE GRUPO */}
          <GroupSelector
            groups={groups}
            value={groupId}
            onChange={setGroupId}
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
    color: "#fff",
    marginBottom: 12,
  },
  buttons: {
    marginTop: 16,
    gap: 10,
  },
});
