import { useGamification } from "@/contexts/GamificationContext";
import { LinearGradient } from "expo-linear-gradient";
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
  const GRADIENT = ["#3F8F8F", "#387373"] as const;

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
      <Card style={styles.cardWrapper}>
        <LinearGradient
          colors={GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainCard}
        >
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
        </LinearGradient>
      </Card>

      {/* ESTATÍSTICAS */}
      <View style={styles.row}>
        <Card style={[styles.cardWrapper, styles.half]}>
          <LinearGradient
            colors={GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Tarefas</Text>
            <Text style={styles.cardTitle}>Completadas</Text>
            <Text style={styles.bigNumber}>{data.totalTasksCompleted}</Text>
          </LinearGradient>
        </Card>

        <Card style={[styles.cardWrapper, styles.half]}>
          <LinearGradient
            colors={GRADIENT}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Tarefas</Text>
            <Text style={styles.cardTitle}>Criadas</Text>
            <Text style={styles.bigNumber}>{data.totalTasksCreated}</Text>
          </LinearGradient>
        </Card>
      </View>

      {/* CONQUISTAS */}

      <Card style={styles.cardWrapper}>
        <LinearGradient
          colors={GRADIENT}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
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
        </LinearGradient>
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

  cardWrapper: {
    borderRadius: 14,
    marginBottom: 12,

    // sombra Android
    elevation: 6,

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    backgroundColor: "transparent",
  },

  mainCard: {
    padding: 20,
    borderRadius: 14,
  },

  card: {
    padding: 15,
    borderRadius: 14,
  },
});
