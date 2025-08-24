import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {externalApi} from "@/lib/api/serverApi";
import {ApiError} from "@/lib/api/api";

export async function GET() {
    const cookieStore = await cookies();

    try {
        const {data} = await externalApi.get('/users/me',{
            headers:{
                Cookie: cookieStore.toString()
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            {
                error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
            },
            { status: (error as ApiError).status }
        )
    }
}