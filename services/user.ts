import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function getUserLocal() {
    try {
        const data = await AsyncStorage.getItem("user");
        if (!data) return null; // Nenhum usuário salvo

        return JSON.parse(data); // Retorna o objeto real
    } catch (error) {
        console.error("Erro ao buscar usuário do AsyncStorage:", error);
        return null;
    }
}

export async function updateUser(data: {
    name?: string;
    email?: string;
    birthday?: string;
}) {
    try {
        const response = await api.put("/users", data);

        if (response.status !== 200) {
            throw new Error("Falha ao atualizar dados");
        }
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao Atualizar");
    }
}

