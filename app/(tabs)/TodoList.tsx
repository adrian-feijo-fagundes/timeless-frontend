import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import api from "@/services/api";
import { CompleteTaskButton } from "@/components/gamification/CompleteTaskButton";

import { useGamification } from "@/contexts/GamificationContext";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { fetchGamification } = useGamification();

  async function loadTasks() {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Erro ao carregar tarefas", err);
    }
  }

  async function handleComplete(id: string) {
    try {
      await api.patch(`/tasks/${id}/complete`);
      await fetchGamification(); // atualiza gamificação
      loadTasks(); // atualiza lista
    } catch (err) {
      console.log("Erro ao completar tarefa");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Tarefas</Text>

        <Pressable style={styles.addButton}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* LISTA */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              {item.description ? (
                <Text style={styles.taskDesc}>{item.description}</Text>
              ) : null}
            </View>

            {/* Botão concluir */}
            {!item.completed && (
              <CompleteTaskButton taskId={item.id} onCompleted={loadTasks} />
            )}

            {item.completed && (
              <FontAwesome name="check-circle" size={26} color="#387373" />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F7",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#387373",
  },

  addButton: {
    backgroundColor: "#387373",
    padding: 10,
    borderRadius: 10,
  },

  card: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8E8",
    alignItems: "center",
    gap: 12,
  },

  taskTitle: {
    fontSize: 16,
    color: "#387373",
    fontWeight: "600",
  },

  taskDesc: {
    fontSize: 13,
    color: "#4A4A4A",
    marginTop: 4,
  },
});
