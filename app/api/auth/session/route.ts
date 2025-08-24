import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { externalApi } from "@/lib/api/serverApi";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    try {
        // Verify session with backend
        const apiRes = await externalApi.get('/auth/session', {
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        return NextResponse.json({ 
            authenticated: true,
            user: apiRes.data 
        });
    } catch (error) {
        const response = NextResponse.json({ authenticated: false }, { status: 200 });
        response.cookies.delete('accessToken');
        return response;
    }
}