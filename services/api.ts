import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});
const publicRoutes = ["/login", "/register"];

api.interceptors.request.use(
    async (config) => {
        const isPublic = publicRoutes.some((route) =>
            config.url?.includes(route)
        );
    
        if (!isPublic) {
            const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        }
    
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
