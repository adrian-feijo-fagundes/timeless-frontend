import { useApi } from "@/hooks/useApi";
import {
  createTask,
  deleteTask,
  listTasks,
  TaskResponse,
  updateTask,
} from "@/services/taskService";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { TaskModal } from "../TaskModal";

export default function TasksScreen() {
  const { request, loading, error } = useApi();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  /* -------------------------------------------------------------
            CARREGAR TASKS AO INICIAR
        ------------------------------------------------------------- */
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const res = await request(() => listTasks());
    if (res) setTasks(res as TaskResponse[]);
  }

  /* -------------------------------------------------------------
            ABRIR MODAL PARA CRIAR OU EDITAR
        ------------------------------------------------------------- */
  function openModal(task?: any) {
    setEditingTask(task || null);
    setModalVisible(true);
  }

  /* -------------------------------------------------------------
            SALVAR TASK
        ------------------------------------------------------------- */
  async function handleSave(data: any) {
    let res;

    if (editingTask) {
      res = await request(() => updateTask(editingTask.id, data));
    } else {
      res = await request(() => createTask(data));
    }

    if (res) {
      setModalVisible(false);
      setEditingTask(null);
      loadTasks();
    }
  }

  /* -------------------------------------------------------------
            DELETAR
        ------------------------------------------------------------- */
  async function handleDelete(id: number) {
    const res = await request(() => deleteTask(id));
    if (res) loadTasks();
  }

  /* -------------------------------------------------------------
            UI PRINCIPAL
        ------------------------------------------------------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{String(error)}</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>

              {item.topic ? (
                <Text style={styles.itemText}>Tópico: {item.topic}</Text>
              ) : null}

              {item.description ? (
                <Text style={styles.itemDesc}>{item.description}</Text>
              ) : null}

              {item.limitDate ? (
                <Text style={styles.itemText}>
                  Data limite: {item.limitDate}
                </Text>
              ) : null}

              {item.group?.name ? (
                <Text style={styles.itemText}>Grupo: {item.group.name}</Text>
              ) : null}
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openModal(item)}
              >
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>+ Criar Tarefa</Text>
      </TouchableOpacity>

      {/* TaskModal REAL */}
      <TaskModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

/* -------------------------------------------------------------
        STYLES
    ------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  error: { color: "red", marginBottom: 10 },

  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemTitle: { fontSize: 18, fontWeight: "bold" },
  itemDesc: { color: "#777", marginTop: 3 },
  itemText: { fontSize: 13, color: "#444", marginTop: 2 },

  buttons: { flexDirection: "row", gap: 10 },

  editButton: { backgroundColor: "#4caf50", padding: 8, borderRadius: 6 },
  editText: { color: "white" },

  deleteButton: { backgroundColor: "#e53935", padding: 8, borderRadius: 6 },
  deleteText: { color: "white" },

  addButton: {
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  addButtonText: { color: "white", fontSize: 18 },
});
