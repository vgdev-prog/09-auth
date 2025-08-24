import axios from "axios";

export const internalApi = axios.create({
    baseURL: process.env.INTERNAL_API_URL || '/api',
    withCredentials: true,
});