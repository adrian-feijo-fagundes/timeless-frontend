import AuthButton from "@/components/AuthButton";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { XPBar } from "@/components/gamification/XPBar";
import GroupFilter from "@/components/GroupFilter";
import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskModal";
import { useGamification } from "@/contexts/GamificationContext";
import { useGroups } from "@/contexts/GroupsContext";
import { useTasks } from "@/contexts/TasksContext";
import { useApi } from "@/hooks/useApi";
import {
  completeTask,
  createTask,
  deleteTask,
  TaskResponse,
  updateTask,
} from "@/services/taskService";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar, Text } from "react-native-paper";

export default function TasksScreen() {
  const { tasks, loadingTasks, refreshTasks } = useTasks();
  const { refresh: refreshGamification } = useGamification();
  const { request, loading, error } = useApi();

  const { groups } = useGroups();
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskResponse | null>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const [levelUpVisible, setLevelUpVisible] = useState(false);
  const [newLevel, setNewLevel] = useState<number | null>(null);

  const [achievementVisible, setAchievementVisible] = useState(false);
  const [newAchievement, setNewAchievement] = useState<any>(null);

  function showSnackbar(message: string) {
    setSnackbarText(message);
    setSnackbarVisible(true);
  }

  /* -------------------------------------------------------------
      COMPLETE TASK
  ------------------------------------------------------------- */
  async function handleCompleteTask(taskId: number) {
    const res = await request(() => completeTask(taskId));
    if (!res) return;

    await refreshTasks();
    await refreshGamification();

    const { gamification } = res;

    if (gamification?.xpGained > 0) {
      showSnackbar(`+${gamification.xpGained} XP`);
    }

    if (gamification?.leveledUp && gamification.newLevel) {
      setNewLevel(gamification.newLevel);
      setLevelUpVisible(true);
    }

    if (gamification?.newAchievement) {
      setNewAchievement(gamification.newAchievement);
      setAchievementVisible(true);
    }
  }

  /* -------------------------------------------------------------
      CREATE / UPDATE
  ------------------------------------------------------------- */
  function parseDate(date: string): Date | undefined {
    if (!date) return undefined;
    const [day, month, year] = date.split("/");
    if (!day || !month || !year) return undefined;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  function getTasksByGroup() {
    const filteredTasks =
      selectedGroups.length === 0
        ? tasks
        : tasks.filter(
            (task) => task.group && selectedGroups.includes(task.group.id)
          );

    return groups.map((group) => ({
      group,
      tasks: filteredTasks.filter((task) => task.group?.id === group.id),
    }));
  }

  async function handleSave(data: any) {
    const payload = {
      ...data,
      limitDate: parseDate(data.limitDate),
    };

    const res = editingTask
      ? await request(() => updateTask(editingTask.id, payload))
      : await request(() => createTask(payload));

    if (res) {
      await refreshTasks();
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

      {(loading || loadingTasks) && <ActivityIndicator />}
      {error && <Text>{String(error)}</Text>}

      <XPBar />
      <StreakCounter />

      <GroupFilter
        groups={groups}
        value={selectedGroups}
        onChange={setSelectedGroups}
      />

      <FlatList
        data={getTasksByGroup()}
        keyExtractor={(item) => String(item.group.id)}
        renderItem={({ item }) =>
          item.tasks.length > 0 ? (
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#387373",
                  marginBottom: 8,
                }}
              >
                {item.group.title}
              </Text>

              {item.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => {
                    setEditingTask(task);
                    setModalVisible(true);
                  }}
                  onDelete={() =>
                    request(() => deleteTask(task.id)).then(refreshTasks)
                  }
                  onComplete={() => handleCompleteTask(task.id)}
                />
              ))}
            </View>
          ) : null
        }
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

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
        icon="star"
      >
        <Text style={styles.snackbarText}>{snackbarText}</Text>
      </Snackbar>

      <Modal transparent visible={levelUpVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text variant="titleLarge" style={styles.modalTitle}>
              🎉 Level Up!
            </Text>

            <Text style={styles.modalText}>
              Você chegou ao nível{" "}
              <Text style={{ fontWeight: "700" }}>{newLevel}</Text>
            </Text>

            <AuthButton
              title="Continuar"
              onPress={() => setLevelUpVisible(false)}
              style={{ backgroundColor: "#387373", width: "100%" }}
              labelStyle={{ color: "#fff" }}
            />
          </View>
        </View>
      </Modal>

      <Modal transparent visible={achievementVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text variant="titleLarge">🏆 Nova Conquista!</Text>

            <Text>{newAchievement?.title}</Text>
            <Text>{newAchievement?.description}</Text>

            <AuthButton
              title="Fechar"
              onPress={() => setAchievementVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
  snackbar: {
    backgroundColor: "#387373",
    borderRadius: 12,
    marginBottom: 12,
  },
  snackbarText: {
    color: "#fff",
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    elevation: 6,
  },
  modalTitle: {
    marginBottom: 8,
    fontWeight: "700",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.8,
  },
});
