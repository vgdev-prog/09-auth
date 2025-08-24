import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";
import {parse} from "cookie";
import {refreshServerTokens} from "@/app/api/serverApi";

const privateRoutes = [
    '/profile'
]
export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const refreshToken = cookieStore.get('refreshToken')?.value

    const { pathname } = request.nextUrl;

    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route)) || pathname.startsWith('/notes');
    const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

    if (isPrivateRoute) {
        if (!accessToken) {
            if (refreshToken) {
                try {
                    const data = await refreshServerTokens();
                    const setCookieHeaders = data.headers['set-cookie'];

                    if (setCookieHeaders) {
                        const response = NextResponse.next();
                        const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
                        
                        cookieArray.forEach(cookieHeader => {
                            response.headers.append('Set-Cookie', cookieHeader);
                        });
                        
                        return response;
                    }
                } catch {
                }
            }
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
};