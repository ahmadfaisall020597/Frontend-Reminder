import axios from "axios";

export const createApiClient = (baseURL) => {
    const api = axios.create({
        baseURL,
        timeout: 10000,
        headers: { "Content-Type": "application/json" }
    });

    return api;
};
