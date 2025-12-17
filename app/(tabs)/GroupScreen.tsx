import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { useApi } from "@/hooks/useApi";
import { createGroup, deleteGroup, updateGroup } from "@/services/groups";

import AuthButton from "@/components/AuthButton";
import GroupCard from "@/components/GroupCard";
import GroupFormModal from "@/components/GroupFormModal";
import { useGroups } from "@/contexts/GroupsContext";
import { useTasks } from "@/contexts/TasksContext";

export default function GroupsScreen() {
  const { request, loading, error } = useApi();
  const { groups, refreshGroups } = useGroups();
  const { refreshTasks } = useTasks();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any>(null);

  async function handleDeleteGroup(groupId: number) {
    const res = await request(() => deleteGroup(groupId));

    if (res) {
      refreshGroups();
      refreshTasks();
    }
  }

  async function handleSave(data: any) {
    const res = editingGroup
      ? await request(() => updateGroup(editingGroup.id, data))
      : await request(() => createGroup(data));

    if (res) {
      refreshGroups();
      setModalVisible(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Grupos</Text>

      {loading && <ActivityIndicator />}
      {error && <Text>{String(error)}</Text>}

      <FlatList
        data={groups}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onEdit={() => {
              setEditingGroup(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDeleteGroup(item.id)}
          />
        )}
      />

      <AuthButton
        title="Criar Grupo"
        onPress={() => {
          setEditingGroup(null);
          setModalVisible(true);
        }}
        style={{ marginTop: 12, backgroundColor: "#387373" }}
        labelStyle={{ color: "#fff" }}
      />

      <GroupFormModal
        visible={modalVisible}
        group={editingGroup}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#387373",
    marginBottom: 16,
  },
});
