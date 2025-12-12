import { executeWithErrorHandling } from "@/utils/executeWithErrorHandling";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function getUserLocal() {
    return executeWithErrorHandling(async () => {
        const data = await AsyncStorage.getItem("user");
        if (!data) return null;

        return JSON.parse(data);
    }, "Erro ao buscar usuário local");
}

export async function updateUser(data: {
    name?: string;
    email?: string;
    birthday?: string;
}) {
    return executeWithErrorHandling(async () => {
        const response = await api.put("/users", data);

        if (response.status !== 200) {
            throw new Error("Falha ao atualizar dados.");
        }

        await AsyncStorage.setItem("user", JSON.stringify(response.data));

        return response.data;
    }, "Erro ao atualizar usuário");
}
