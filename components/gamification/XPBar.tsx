// components/gamification/XPBar.tsx
import { useGamification } from "@/contexts/GamificationContext";
import { StyleSheet, View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

export function XPBar() {
  const { data } = useGamification();
  if (!data) return null;

  const progress = data.xp / data.xpForNextLevel;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.level}>Nível {data.level}</Text>
        <Text style={styles.xp}>
          {data.xp}/{data.xpForNextLevel} XP
        </Text>
      </View>

      <ProgressBar progress={progress} color="#387373" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  level: {
    color: "#387373",
    fontSize: 20,
    fontWeight: "600",
  },
  xp: {
    color: "#387373",
    fontSize: 18,
    opacity: 0.7,
  },
});
