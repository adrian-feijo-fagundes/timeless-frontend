import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isWeb = Platform.OS === "web";

export const storage = {
    async getItem(key: string) {
        if (isWeb) {
            return localStorage.getItem(key);
        }
        return await AsyncStorage.getItem(key);
    },

    async setItem(key: string, value: string) {
        if (isWeb) {
            localStorage.setItem(key, value);
            return;
        }
        await AsyncStorage.setItem(key, value);
    },

    async removeItem(key: string) {
        if (isWeb) {
            localStorage.removeItem(key);
            return;
        }
        await AsyncStorage.removeItem(key);
    },
};
