import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createApiClient = (baseURL) => {
    const api = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // Menambahkan Bearer Token secara otomatis
    api.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    return api;
};