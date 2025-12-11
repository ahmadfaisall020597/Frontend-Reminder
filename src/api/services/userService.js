import { ENDPOINTS } from "../config/endpoints";
import { createApiClient } from "../config/apiClient";

const api = createApiClient(ENDPOINTS.USER);

export const userService = {
    profile: () => api.get("/profile"),
    updateProfile: (data) => api.put("/profile", data),
};
