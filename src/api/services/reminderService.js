import { createApiClient } from "../config/apiClient";
import { ENDPOINTS } from "../config/endpoints";

const api = createApiClient(ENDPOINTS.REMINDER);

export const reminderService = {
    getAll: () => api.get("/reminders"),
    create: (data) => api.post("/reminders", data),
    getPending: (page = 1, perPage = 10) =>
        api.get(`/reminders/pending?page=${page}&per_page=${perPage}`),
    getReceived: (page = 1, perPage = 10) =>
        api.get(`/reminders/received?page=${page}&per_page=${perPage}`),
};