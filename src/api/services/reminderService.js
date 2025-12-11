import { createApiClient } from "../config/apiClient";
import { ENDPOINTS } from "../config/endpoints";

const api = createApiClient(ENDPOINTS.REMINDER);

export const reminderService = {
    getAll: () => api.get("/reminders"),
    create: (data) => api.post("/reminders", data)
};
