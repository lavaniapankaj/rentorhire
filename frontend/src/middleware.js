import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

/**
 * Middleware to protect /adminrohpnl routes
 */
export function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  const authUser = request.cookies.get('authUser')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/admin', request.url));
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return NextResponse.redirect(new URL('/auth/admin', request.url));
    }

    if (authUser.role_id == 1) {
      return NextResponse.redirect(new URL('/auth/admin', request.url));
    }

  } catch (err) {
    return NextResponse.redirect(new URL('/auth/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adminrohpnl/:path*'],
};
