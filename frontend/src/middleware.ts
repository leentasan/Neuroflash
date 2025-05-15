import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isPublicPath = request.nextUrl.pathname === '/';

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/flashcard-set', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/flashcard-set/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 