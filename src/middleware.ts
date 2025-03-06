import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Middleware - Session:", session);

  // If user is not signed in and trying to access protected routes
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // Don't redirect if already on the login page
    if (req.nextUrl.pathname === '/admin') {
      return res;
    }
    
    console.log("No session, redirecting to login");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin';
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and on the login page, redirect to dashboard
  if (session && req.nextUrl.pathname === '/admin') {
    console.log("Has session, redirecting to dashboard");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  // Set the auth cookie
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  return response;
}

export const config = {
  matcher: '/admin/:path*',
}; 