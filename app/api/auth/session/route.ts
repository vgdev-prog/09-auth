import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { externalApi } from "@/app/api/serverApi";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    try {
        const apiRes = await externalApi.get('/auth/session', {
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        return NextResponse.json({ 
            authenticated: true,
            user: apiRes.data 
        });
    } catch {
        const response = NextResponse.json({ authenticated: false }, { status: 200 });
        response.cookies.delete('accessToken');
        return response;
    }
}