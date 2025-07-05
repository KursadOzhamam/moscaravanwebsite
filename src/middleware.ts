import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicPaths = [
    '/api/auth',
    '/api/contact',
    '/',
    '/about',
    '/services',
    '/gallery',
    '/contact'
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(path + '/')
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check for admin routes
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin') ||
                     request.nextUrl.pathname.startsWith('/api/admin');

  if (isAdminPath) {
    // Allow access to admin login page
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.next();
    }

    // Check for authentication token
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Kimlik doğrulama gerekli' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const isValid = await verifyToken(token);
      
      if (!isValid) {
        if (request.nextUrl.pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Geçersiz token' },
            { status: 401 }
          );
        }
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Geçersiz token' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
}; 