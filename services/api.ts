import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: "https://timeless-350w.onrender.com",
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
