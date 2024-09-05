import { NextResponse } from "next/server"
import { cookies } from "next/headers";


export async function middleware(req, res) {
    const cookieStore = cookies()
    const token = cookieStore.get('token') || '';
    const ApiResponse = await fetch('http://localhost:5000/student/authorise', {
        headers: {
            'x-auth-token': token.value
        }
    });
    console.log(ApiResponse.status);
    if (ApiResponse.status !== 200) {
        return NextResponse.redirect(new URL('/credentials', req.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/user/:path*']
}