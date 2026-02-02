import { StyleSheet } from "react-native";
import { List, Surface } from "react-native-paper";
export function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <Surface style={[styles.surface, { flex: 1 }]} elevation={2}>
      <List.Item
        title={title}
        description={String(value)}
        left={(props) => <List.Icon {...props} icon={icon} />}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 12,
    borderRadius: 12,
  },
});
