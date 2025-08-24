import axios from 'axios';

const baseURL = process.env.INTERNAL_API_URL || '/api';

export const internalApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export interface ApiError {
    response?: {
        data?: {
            error?: string;
        };
        status?: number;
    };
    message: string;
    status: number;
}