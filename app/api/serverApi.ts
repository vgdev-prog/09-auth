import axios from "axios";
import {cookies} from "next/headers";

export const externalApi = axios.create({
    baseURL: 'https://notehub-api.goit.study',
    withCredentials: true,
});
export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const res = await externalApi.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};

export const refreshServerTokens = async () => {
    const cookieStore = await cookies();
    const res = await externalApi.post('/auth/refresh', {}, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};