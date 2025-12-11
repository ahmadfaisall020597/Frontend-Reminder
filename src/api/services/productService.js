import { ENDPOINTS } from "../config/endpoints";
import { createApiClient } from "../config/apiClient";

const api = createApiClient(ENDPOINTS.PRODUCT);

export const productService = {
    getProducts: () => api.get("/"),
    getDetail: (id) => api.get(`/${id}`),
};
