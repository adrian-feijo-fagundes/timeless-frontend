import AsyncStorage from "@react-native-async-storage/async-storage";

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
