import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesome } from "@expo/vector-icons";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    // Carregar tarefas salvas
  }, []);

  useEffect(() => {
    // Salvar tarefas no async storage se quiser
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="tasks" size={28} color="#387373" />
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <Text style={styles.subtitle}>Organize seu dia de forma simples!</Text>

      {/* Estatísticas */}
      <View style={styles.stats}>
        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesome name="circle-o" size={18} color="#387373" /> Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.statText}>{activeCount}</Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <FontAwesome name="check-circle" size={18} color="#387373" />{" "}
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.statText}>{completedCount}</Text>
          </CardContent>
        </Card>
      </View>

      {/* Adicionar tarefa */}
      <Card>
        <CardContent>
          <TaskInput onAddTask={addTask} />
        </CardContent>
      </Card>

      {/* Filtros */}
      <View style={styles.filters}>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>

          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
          </TabsList>
        </Tabs>

        {completedCount > 0 && (
          <Button title="Limpar concluídas" onPress={clearCompleted} />
        )}
      </View>

      {/* Lista */}
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent>
            <Text style={styles.emptyText}>
              {filter === "all"
                ? "Nenhuma tarefa ainda!"
                : filter === "active"
                ? "Nenhuma tarefa ativa"
                : "Nenhuma tarefa concluída"}
            </Text>
          </CardContent>
        </Card>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f6f6f6" },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { fontSize: 26, color: "#387373", fontWeight: "bold" },
  subtitle: { color: "#555", marginBottom: 15 },
  stats: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statText: { fontSize: 18, color: "#387373", textAlign: "center" },
  filters: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  emptyText: { textAlign: "center", color: "#888", padding: 20 },
});
