import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {externalApi} from "@/app/api/serverApi";

export async function POST() {
    try {
        const cookieStore = await cookies();


        if (cookieStore) {
            await externalApi.post('/auth/logout', {}, {
                headers: {
                    'Cookie': cookieStore.toString()
                }
            });
        }

        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        
        return NextResponse.json({ success: true });
    }
}