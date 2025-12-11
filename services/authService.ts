import { LoginResponse, RegisterResponse } from "@/types/Auth";
import { executeWithErrorHandling } from "@/utils/executeWithErrorHandling";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function checkAuth() {
    return executeWithErrorHandling(async () => {
        const token = await AsyncStorage.getItem("token");

        if (!token) return { logged: false };

        const response = await api.get("/profile");
        return { logged: true, user: response.data };
    }, "Erro ao verificar autenticação");
}

export async function loginUser(email: string, password: string) {
    return executeWithErrorHandling(async () => {
        const response = await api.post<LoginResponse>("/login", { email, password });

        const { token, user } = response.data;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        return { token, user };
    }, "Erro ao fazer login");
}

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    birthday: string;
}) {
    return executeWithErrorHandling(async () => {
        const response = await api.post<RegisterResponse>("/register", data);

        if (response.status !== 201) {
            throw new Error("Falha ao criar conta");
        }

        return response.data;
    }, "Erro ao registrar usuário");
}

export async function deleteAccount() { 
    return executeWithErrorHandling(async () => {
        const response = await api.delete("/profile/delete");

        if (response.status !== 204) {
            throw new Error("Falha ao excluir conta");
        }

        return response.data;
    }, "Erro ao excluir conta");
}
