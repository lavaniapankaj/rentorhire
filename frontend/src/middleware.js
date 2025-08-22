import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log("mid works");

  const token = request.cookies.get('authToken')?.value;
  const authUserCookie = request.cookies.get('authUser')?.value;

  let authUser = authUserCookie ? JSON.parse(authUserCookie) : null;

  const redirectToUserLogin = () => NextResponse.redirect(new URL('/login', request.url));
  const redirectToAdminLogin = () => NextResponse.redirect(new URL('/auth/admin', request.url));
  const redirectToAdminDashboard = () => NextResponse.redirect(new URL('/adminrohpnl', request.url));
  const redirectToUserDashboard = () => NextResponse.redirect(new URL('/dashboard', request.url));

  // --- Handle `/login` ---
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token && authUser) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          if (authUser.role_id == 1) {
            return redirectToAdminDashboard();
          } else {
            return redirectToUserDashboard();
          }
        } else {
          return NextResponse.next();
        }
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  // --- Handle `/auth/admin` ---
  if (pathname.startsWith('/auth/admin')) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        if (authUser.role_id == 1) {
          return NextResponse.next();
        } else {
          return NextResponse.next();
        }
      } else {
        if (authUser.role_id == 1) {
          return redirectToAdminDashboard();
        } else {
          return NextResponse.next();
        }
      }
    } catch (err) {
      return NextResponse.next();
    }
  }

  // Handel admin pages
  if (pathname.startsWith('/adminrohpnl')) {  
    if (!token || !authUser) {
      return redirectToAdminLogin();
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      if (decodedToken.exp < currentTime) {
        if (authUser.role_id == 1) {
          return redirectToAdminLogin(); // token expired → back to admin login
        }
        return redirectToAdminLogin();
      }
  
      if (authUser.role_id == 1) {
        return NextResponse.next(); // allow access to requested /adminrohpnl URL
      } else {
        return redirectToAdminLogin(); // non-admin → admin login
      }
    } catch (err) {
      return redirectToAdminLogin();
    }
  }

  // --- Handle user dashboard ---
  if (pathname.startsWith('/dashboard')) {
    // case 1: no token or no user → user login
    if (!token || !authUser) {
      return redirectToUserLogin();
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // case 2: token expired → user login
      if (decodedToken.exp < currentTime) {
        return redirectToUserLogin();
      }

      // case 3: token valid
      if (authUser.role_id == 1) {
        // admin trying to open user dashboard → redirect to admin panel
        return redirectToAdminDashboard();
      } else {
        // normal user → allow dashboard
        return NextResponse.next();
      }
    } catch (err) {
      return redirectToUserLogin();
    }
  }

}

export const config = {
  matcher: ['/((?!_next).*)'],
};