import { GroupResponse, listGroups } from "@/services/groups";
import { formatDateBR } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Chip,
  Dialog,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

type Task = {
  id: number;
  title: string;
  topic?: string | null;
  limitDate?: string | null;
  groupId?: number | null;
};

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  task?: Task; // 👈 se existir → edição
}

export function TaskModal({ visible, onClose, onSave, task }: TaskModalProps) {
  const isEdit = !!task;

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);

  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // 👉 Preenche campos se for edição
    if (task) {
      setTitle(task.title);
      setTopic(task.topic ?? "");
      setLimitDate(task.limitDate ? formatDateBR(task.limitDate) : "");
      setGroupId(task.groupId ?? null);
    } else {
      resetFields();
    }

    loadGroups();
  }, [visible, task]);

  async function loadGroups() {
    setLoading(true);
    try {
      const data = await listGroups();
      setGroups(data);
    } catch (error) {
      console.error("Erro ao buscar grupos", error);
    } finally {
      setLoading(false);
    }
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

  function resetFields() {
    setTitle("");
    setTopic("");
    setLimitDate("");
    setGroupId(null);
  }

  const save = () => {
    if (!title.trim()) return;

    onSave({
      title,
      topic: topic || null,
      limitDate: limitDate || null,
      groupId,
    });

    onClose();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{isEdit ? "Editar Tarefa" : "Nova Tarefa"}</Dialog.Title>

        <Dialog.Content>
          <TextInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Tópico (opcional)"
            value={topic}
            onChangeText={setTopic}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <Text style={{ marginBottom: 6, opacity: 0.7 }}>Grupo</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {groups.map((group) => (
              <Chip
                key={group.id}
                selected={groupId === group.id}
                onPress={() => setGroupId(group.id)}
              >
                {group.title}
              </Chip>
            ))}
          </View>

          <TextInput
            label="Data limite (DD/MM/AAAA)"
            value={limitDate}
            onChangeText={(text) => setLimitDate(formatDate(text))}
            keyboardType="numeric"
            mode="outlined"
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onClose}>Cancelar</Button>
          <Button mode="contained" onPress={save}>
            {isEdit ? "Atualizar" : "Salvar"}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
