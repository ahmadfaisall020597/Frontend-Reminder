import { ENDPOINTS } from "../config/endpoints";
import { createApiClient } from "../config/apiClient";

const api = createApiClient(ENDPOINTS.AUTH);

export const authService = {
    login: (email, password) => api.post("/login", { email, password }),
    register: (data) => api.post("/register", data),
};
