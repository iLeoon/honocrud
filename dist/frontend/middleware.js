"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
const protectedPrefixes = ['/dashboard', '/posts'];
function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;
    const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
    if (isProtected && !token) {
        return server_1.NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname === '/login' && token) {
        return server_1.NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: ['/login', '/dashboard/:path*', '/posts/:path*'],
};
