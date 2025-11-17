import { LoginResponse, RegisterResponse } from "@/types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

    
export async function checkAuth() {
    const token = await AsyncStorage.getItem("token");

    if (!token) return { logged: false };

    try {
        const response = await api.get("/profile"); // rota protegida
        return { logged: true, user: response.data };
    } catch (err: any) {
        // token expirado ou inválido
        return { logged: false };
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post<LoginResponse>("/login", { email, password });

        const { token, user } = response.data;

        // salva no device
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        return { token, user };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
}

export async function registerUser(data: {
    name: string;
    email: string;
    password: string;
    birthday: string;
}) {
    try {
        const response = await api.post<RegisterResponse>("/register", data);

        if (response.status !== 201) {
            throw new Error("Falha ao criar conta");
        }

        return response.data;
    } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao registrar");
    }
}
