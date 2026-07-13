import { NextRequest, NextResponse } from 'next/server'
import { hasValidToken } from '@/lib/auth-token'

const protectedPrefixes = ['/dashboard', '/posts']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const isAuthenticated = hasValidToken(token)

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  // Redirect unauthenticated users to login for protected routes
  if (isProtected && !isAuthenticated) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    return response
  }

  // Redirect already authenticated users away from login page
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Clean up expired tokens on the login page
  if (pathname === '/login' && token && !isAuthenticated) {
    const response = NextResponse.next()
    response.cookies.delete('token')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match only the specific routes that need protection
    '/login',
    '/dashboard/:path*',
    '/posts/:path*',
  ],
}
