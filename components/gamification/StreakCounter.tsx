import { useGamification } from "@/contexts/GamificationContext";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function StreakCounter() {
  const { data } = useGamification();
  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={{ color: "#387373" }}>
        {data.taskStreak} tarefas completadas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
