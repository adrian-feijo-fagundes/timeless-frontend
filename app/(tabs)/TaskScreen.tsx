import AuthButton from "@/components/AuthButton";
import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskModal";
import { useApi } from "@/hooks/useApi";
import {
  //  completeTask,
  createTask,
  deleteTask,
  listTasks,
  TaskResponse,
  updateTask,
} from "@/services/taskService";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function TasksScreen() {
  const { request, loading, error } = useApi();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskResponse | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const res = await request(() => listTasks());
    if (res) setTasks(res as TaskResponse[]);
  }

  /* -------------------------------------------------------------
      ABRIR MODAL
  ------------------------------------------------------------- */
  function openCreateModal() {
    setEditingTask(null);
    setModalVisible(true);
  }

  function openEditModal(task: TaskResponse) {
    setEditingTask(task);
    setModalVisible(true);
  }

  /* -------------------------------------------------------------
      SALVAR (CREATE / UPDATE)
  ------------------------------------------------------------- */

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
  /* -------------------------------------------------------------
      UI
  ------------------------------------------------------------- */
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
            onDelete={() => request(() => deleteTask(item.id)).then(loadTasks)}
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
