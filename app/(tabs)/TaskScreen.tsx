import React, { useEffect, useMemo, useState } from "react";
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
import TaskDetailsModal from "@/components/TaskDetailsModal";
import AuthButton from "@/components/AuthButton";

export default function TasksScreen() {
  const { request, loading, error } = useApi();

  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const [formVisible, setFormVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [editingTask, setEditingTask] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const res = await request(() => listTasks());
    if (res) setTasks(res);
  }

  /* ---------------- REGRAS DE VISIBILIDADE ---------------- */
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.group?.days) return true;
      return task.group.days.includes(selectedDay);
    });
  }, [tasks, selectedDay]);

  /* ---------------- CONCLUIR TASK ---------------- */
  async function toggleComplete(task: any) {
    await request(() =>
      updateTask(task.id, { completed: !task.completed })
    );
    loadTasks();
  }

  /* ---------------- SALVAR ---------------- */
  async function handleSave(data: any) {
    const res = editingTask
      ? await request(() => updateTask(editingTask.id, data))
      : await request(() => createTask(data));

    if (res) {
      setFormVisible(false);
      setEditingTask(null);
      loadTasks();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      {loading && <ActivityIndicator />}
      {error && <Text>{String(error)}</Text>}

      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onEdit={() => {
              setEditingTask(item);
              setFormVisible(true);
            }}
            onDelete={() =>
              request(() => deleteTask(item.id)).then(loadTasks)
            }
            onPress={() => {
              setSelectedTask(item);
              setDetailsVisible(true);
            }}
          />
        )}
      />

      <AuthButton
        title="Criar Tarefa"
        onPress={() => {
          setEditingTask(null);
          setFormVisible(true);
        }}
        style={{ backgroundColor: "#387373", marginTop: 12 }}
        labelStyle={{ color: "#fff" }}
      />

      {/* FORM MODAL */}
      <TaskFormModal
        visible={formVisible}
        task={editingTask}
        onClose={() => setFormVisible(false)}
        onSave={handleSave}
      />

      {/* DETAILS MODAL */}
      <TaskDetailsModal
        visible={detailsVisible}
        task={selectedTask}
        onClose={() => setDetailsVisible(false)}
        onToggleComplete={toggleComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#387373",
    marginBottom: 16,
  },
});
