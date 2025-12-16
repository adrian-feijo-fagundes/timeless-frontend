import { useGamification } from "@/contexts/GamificationContext";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";

export default function GameficationScreen() {
  const { data, refresh } = useGamification();

  useEffect(() => {
    refresh();
  }, []);

  if (!data) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  const progress = data.xp / data.xpForNextLevel;

  return (
    <ScrollView style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.title}>Estátisticas</Text>

      {/* NÍVEL + XP */}
      <Card style={styles.mainCard}>
        <Text style={styles.levelText}>Nível {data.level}</Text>

        <Text style={styles.xpText}>
          {data.xp}/{data.xpForNextLevel} XP
        </Text>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progress * 100, 100)}%` },
            ]}
          />
        </View>
      </Card>

      {/* ESTATÍSTICAS */}
      <View style={styles.row}>
        <Card style={[styles.card, styles.half]}>
          <Text style={styles.cardTitle}>Tarefas Completadas</Text>
          <Text style={styles.bigNumber}>{data.totalTasksCompleted}</Text>
        </Card>

        <Card style={[styles.card, styles.half]}>
          <Text style={styles.cardTitle}>Tarefas Criadas</Text>
          <Text style={styles.bigNumber}>{data.totalTasksCreated}</Text>
        </Card>
      </View>

      {/* CONQUISTAS */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Conquistas</Text>

        <Divider style={{ marginVertical: 10 }} />

        {data.achievements.length === 0 && (
          <Text style={styles.subText}>
            Nenhuma conquista desbloqueada ainda
          </Text>
        )}

        {data.achievements.map((a) => (
          <View key={a.id} style={styles.achievementItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.achievementTitle}>{a.title}</Text>
              <Text style={styles.subText}>{a.description}</Text>
            </View>

            <Chip style={styles.xpChip}>
              <Text style={{ color: PRIMARY }}>{a.rewardXp} +XP</Text>
            </Chip>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}
const PRIMARY = "#2f7f7a";
const BACKGROUND = "#fff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 20,
  },

  /* CARD PRINCIPAL */
  mainCard: {
    backgroundColor: PRIMARY,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  levelText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  xpText: {
    color: "white",
    marginTop: 4,
    marginBottom: 10,
  },

  progressContainer: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#ffffff",
  },

  /* CARDS */
  card: {
    backgroundColor: PRIMARY,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 4,
  },

  bigNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },

  subText: {
    color: "#e0f2f1",
    fontSize: 13,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  half: {
    flex: 1,
  },

  /* CONQUISTAS */
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  achievementTitle: {
    color: "white",
    fontWeight: "bold",
  },

  xpChip: {
    backgroundColor: "#ffffff",
    marginLeft: 10,
  },
});
