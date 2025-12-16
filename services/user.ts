import { executeWithErrorHandling } from "@/utils/executeWithErrorHandling";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { storage } from "./storage";

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

export async function updatePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  try {
    const response = await api.put("/users/password", data);

    if (response.status !== 200) {
      throw new Error("Falha ao atualizar senha");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar senha"
    );
  }
}