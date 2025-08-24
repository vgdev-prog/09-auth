import axios from "axios";
import {cookies} from "next/headers";

export const externalApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});
export const checkServerSession = async () => {
    // Дістаємо поточні cookie
    const cookieStore = await cookies();
    const res = await externalApi.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};