import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";
import {parse} from "cookie";
import {checkServerSession} from "@/lib/api/serverApi";

const privateRoutes = [
    '/profile'
]
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    const { pathname } = request.nextUrl;

    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

    if (isPrivateRoute) {
        if (!accessToken) {
            if (refreshToken) {
                // Отримуємо нові cookie
                const data = await checkServerSession();
                const setCookie = data.headers['set-cookie'];

                if (setCookie) {
                    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
                    for (const cookieStr of cookieArray) {
                        const parsed = parse(cookieStr);
                        const options = {
                            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                            path: parsed.Path,
                            maxAge: Number(parsed['Max-Age']),
                        };
                        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
                        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
                    }

                    return NextResponse.next({
                        headers: {
                            Cookie: cookieStore.toString(),
                        },
                    });
                }
            }

            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {};