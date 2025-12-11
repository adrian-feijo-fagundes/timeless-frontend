import { useApi } from "@/hooks/useApi";
import { createGroup, deleteGroup, listGroups, updateGroup } from "@/services/groups";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const weekDays = [
    { label: "D", value: 0 },
    { label: "S", value: 1 },
    { label: "T", value: 2 },
    { label: "Q", value: 3 },
    { label: "Q", value: 4 },
    { label: "S", value: 5 },
    { label: "S", value: 6 },
];

export default function GroupsScreen() {
    const { request, loading, error } = useApi();
    const [groups, setGroups] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingGroup, setEditingGroup] = useState<any>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Novos campos
    const [days, setDays] = useState<number[]>([0,1,2,3,4,5,6]);
    const [maxTasksPerDay, setMaxTasksPerDay] = useState(2);

    /* -------------------------------------------------------------
        CARREGAR GRUPOS AO INICIAR
    ------------------------------------------------------------- */
    useEffect(() => {
        loadGroups();
    }, []);

    async function loadGroups() {
        const res = await request(() => listGroups());
        if (res) setGroups(res);
    }

    /* -------------------------------------------------------------
        ABRIR MODAL PARA EDITAR OU CRIAR
    ------------------------------------------------------------- */
    function openModal(group?: any) {
        if (group) {
            setEditingGroup(group);
            setTitle(group.title);
            setDescription(group.description ?? "");
            setDays(group.days ?? [0,1,2,3,4,5,6]);
            setMaxTasksPerDay(group.maxTasksPerDay ?? 2);
        } else {
            setEditingGroup(null);
            setTitle("");
            setDescription("");
            setDays([0,1,2,3,4,5,6]);
            setMaxTasksPerDay(2);
        }

        setModalVisible(true);
    }

    /* -------------------------------------------------------------
        SALVAR (CRIAR OU EDITAR)
    ------------------------------------------------------------- */
    async function handleSave() {
        if (!title.trim()) return;

        const payload = {
            title,
            description,
            days,
            maxTasksPerDay,
        };

        let res;

        if (editingGroup) {
            res = await request(() =>
                updateGroup(editingGroup.id, payload)
            );
        } else {
            res = await request(() =>
                createGroup(payload)
            );
        }

        if (res) {
            loadGroups();
            setModalVisible(false);
        }
    }

    /* -------------------------------------------------------------
        DELETAR
    ------------------------------------------------------------- */
    async function handleDelete(id: number) {
        const res = await request(() => deleteGroup(id));
        if (res) loadGroups();
    }

    /* -------------------------------------------------------------
        UI PRINCIPAL
    ------------------------------------------------------------- */
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Grupos</Text>

            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={styles.error}>{String(error)}</Text>}

            <FlatList
                data={groups}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            {item.description ? (
                                <Text style={styles.itemDesc}>{item.description}</Text>
                            ) : null}

                            <Text style={styles.subInfo}>
                                Dias ativos: {item.days?.join(", ")}
                            </Text>
                            <Text style={styles.subInfo}>
                                Máx. tarefas/dia: {item.maxTasksPerDay}
                            </Text>
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => openModal(item)}
                            >
                                <Text style={styles.editText}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
                <Text style={styles.addButtonText}>+ Criar Grupo</Text>
            </TouchableOpacity>

            {/* -------------------------------------------------------------
                MODAL DE CRIAÇÃO/EDIÇÃO
            ------------------------------------------------------------- */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editingGroup ? "Editar Grupo" : "Novo Grupo"}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome do grupo"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Descrição (opcional)"
                            value={description}
                            onChangeText={setDescription}
                        />

                        {/* -------------------------------------------------------------
                            DIAS DA SEMANA
                        ------------------------------------------------------------- */}
                        <Text style={styles.sectionTitle}>Dias ativos</Text>
                        <View style={styles.daysRow}>
                            {weekDays.map((d) => (
                                <TouchableOpacity
                                    key={d.value}
                                    style={[
                                        styles.dayButton,
                                        days.includes(d.value) && styles.dayButtonActive
                                    ]}
                                    onPress={() => {
                                        setDays((prev) =>
                                            prev.includes(d.value)
                                                ? prev.filter((x) => x !== d.value)
                                                : [...prev, d.value]
                                        );
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.dayLabel,
                                            days.includes(d.value) && styles.dayLabelActive
                                        ]}
                                    >
                                        {d.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* -------------------------------------------------------------
                            MAX TASKS PER DAY
                        ------------------------------------------------------------- */}
                        <Text style={styles.sectionTitle}>Máx. tarefas por dia</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={String(maxTasksPerDay)}
                            onChangeText={(v) => setMaxTasksPerDay(Number(v))}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveText}>Salvar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

/* -------------------------------------------------------------
    STYLES
------------------------------------------------------------- */
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
    error: { color: "red", marginBottom: 10 },

    item: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    itemTitle: { fontSize: 18, fontWeight: "bold" },
    itemDesc: { color: "#777" },
    subInfo: { fontSize: 12, color: "#444" },

    buttons: { flexDirection: "row", gap: 10 },

    editButton: { backgroundColor: "#4caf50", padding: 8, borderRadius: 6 },
    editText: { color: "white" },

    deleteButton: { backgroundColor: "#e53935", padding: 8, borderRadius: 6 },
    deleteText: { color: "white" },

    addButton: {
        backgroundColor: "#2196f3",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    addButtonText: { color: "white", fontSize: 18 },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    modalContent: {
        backgroundColor: "white",
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },

    modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },

    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 8,
        marginTop: 10,
    },

    daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
    dayButtonActive: {
        backgroundColor: "#2196f3",
    },

    dayLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    dayLabelActive: {
        color: "white",
    },

    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    saveButton: {
        backgroundColor: "#4caf50",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    saveText: { color: "white", textAlign: "center" },

    cancelButton: {
        backgroundColor: "#e53935",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    cancelText: { color: "white", textAlign: "center" },
});
