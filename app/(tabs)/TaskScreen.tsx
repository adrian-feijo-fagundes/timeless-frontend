// screens/TasksScreen.tsx
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { useApi } from "@/hooks/useApi";
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "@/services/taskService";

import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskModal";
import AuthButton from "@/components/AuthButton";

export default function TasksScreen() {
  const { request, loading, error } = useApi();
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const res = await request(() => listTasks());
    if (res) setTasks(res);
  }

  async function handleSave(data: any) {
    const res = editingTask
      ? await request(() => updateTask(editingTask.id, data))
      : await request(() => createTask(data));

    if (res) {
      loadTasks();
      setModalVisible(false);
      setEditingTask(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      {loading && <ActivityIndicator />}
      {error && <Text>{String(error)}</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onEdit={() => {
              setEditingTask(item);
              setModalVisible(true);
            }}
            onDelete={() =>
              request(() => deleteTask(item.id)).then(loadTasks)
            }
          />
        )}
      />

      <AuthButton
        title="Criar Tarefa"
        onPress={() => {
          setEditingTask(null);
          setModalVisible(true);
        }}
        style={{ marginTop: 12, backgroundColor: "#387373" }}
        labelStyle={{ color: "#fff" }}
      />

      <TaskFormModal
        visible={modalVisible}
        task={editingTask}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#387373",
    marginBottom: 16,
  },
});
