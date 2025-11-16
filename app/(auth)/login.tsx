import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { TaskModal } from "@/components/TaskModal";
import { TaskItem } from "@/components/TaskItem";
import { XPBar } from "@/components/gamification/XPBar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { useGamification } from "@/components/gamification/useGamification";

export default function TasksScreen() {
  const { xp, streak, addXP, registerStreak } = useGamification();

  const [tasks, setTasks] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [filter, setFilter] = useState<"all"|"active"|"completed"|"today">("all");

  const addTask = (task: any) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      desc: task.desc || "",
      isHabit: task.isHabit,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([newTask, ...tasks]);
    setModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        if (!t.completed) {
          addXP(10);
          registerStreak();
        }

        return { ...t, completed: !t.completed };
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /** ===== Filtros ===== */
  const today = new Date();
  today.setHours(0,0,0,0);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    if (filter === "today") {
      const d = new Date(t.createdAt);
      d.setHours(0,0,0,0);
      return d.getTime() === today.getTime();
    }
    return true; // all
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <FontAwesome name="tasks" size={28} color="#387373" />
            <Text style={styles.title}>Minhas Tarefas</Text>
          </View>

          {/* GAMIFICAÇÃO */}
          <XPBar xp={xp} />
          <StreakCounter streak={streak} />

          {/* FILTROS */}
          <View style={styles.filters}>
            <TouchableOpacity
              style={[styles.filterBtn, filter === "all" && styles.active]}
              onPress={() => setFilter("all")}
            >
              <Text style={styles.filterText}>Todas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, filter === "active" && styles.active]}
              onPress={() => setFilter("active")}
            >
              <Text style={styles.filterText}>Ativas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, filter === "completed" && styles.active]}
              onPress={() => setFilter("completed")}
            >
              <Text style={styles.filterText}>Feitas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, filter === "today" && styles.active]}
              onPress={() => setFilter("today")}
            >
              <Text style={styles.filterText}>Hoje</Text>
            </TouchableOpacity>
          </View>

          {/* BOTÃO NOVA TAREFA */}
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <FontAwesome name="plus" size={20} color="#fff" />
            <Text style={styles.addText}>Nova Tarefa</Text>
          </TouchableOpacity>

          {/* LISTA */}
          {filteredTasks.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma tarefa aqui</Text>
          ) : (
            filteredTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onToggle={() => toggleTask(t.id)}
                onDelete={() => deleteTask(t.id)}
              />
            ))
          )}

        </ScrollView>

        <TaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={addTask}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f6f6" },
  container: { padding: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: { fontSize: 26, color: "#387373", fontWeight: "bold" },

  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  active: {
    backgroundColor: "#387373",
  },
  filterText: {
    color: "#fff",
    fontWeight: "600",
  },

  addBtn: {
    flexDirection: "row",
    backgroundColor: "#387373",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  addText: { color: "#fff", fontWeight: "600" },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 16,
  },
});
