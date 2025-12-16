import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import AuthButton from "@/components/AuthButton";

type Props = {
  visible: boolean;
  task: any;
  onClose: () => void;
  onToggleComplete: (task: any) => void;
};

export default function TaskDetailsModal({
  visible,
  task,
  onClose,
  onToggleComplete,
}: Props) {
  if (!task) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{task.title}</Text>

          {!!task.description && (
            <Text style={styles.text}>{task.description}</Text>
          )}

          {!!task.group?.title && (
            <Text style={styles.text}>
              Grupo: {task.group.title}
            </Text>
          )}

          {!!task.limitDate && (
            <Text style={styles.text}>
              Data limite: {task.limitDate}
            </Text>
          )}

          <IconButton
            icon={task.completed ? "check-circle" : "circle-outline"}
            iconColor={task.completed ? "#4caf50" : "#fff"}
            size={36}
            onPress={() => onToggleComplete(task)}
          />

          <View style={styles.buttons}>
            <AuthButton title="Fechar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#38737388",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#387373",
    margin: 24,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  text: {
    color: "#fff",
    marginBottom: 6,
  },
  buttons: {
    marginTop: 16,
  },
});
