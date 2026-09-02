import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINTS } from "../config/endpoints";
import { createApiClient } from "../config/apiClient";

const api = createApiClient(ENDPOINTS.REMINDER);

export const authService = {
    login: async (email, password) => {
        const response = await api.post("/login", {
            email,
            password,
        });
        const { token, user } = response.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        return response.data;
    },

    register: (data) => api.post("/register", data),

    profile: () => api.get("/profile"),
    
    logout: async () => {
        await api.post("/logout");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
    },
};