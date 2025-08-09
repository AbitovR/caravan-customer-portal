import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPublicPage = ['/', '/about', '/contact'].includes(request.nextUrl.pathname)
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // Skip middleware for public pages and API routes
  if (isPublicPage || isApiRoute) {
    return NextResponse.next()
  }

  // Redirect to login if no token on protected routes
  if (!token && (isDashboardRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // For now, allow access if token exists (we'll verify role in the pages themselves)
  if (token && isAuthPage) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}