import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // If the user is accessing the admin panel
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    
    // Check if the auth header is correct
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    try {
      if (basicAuth && adminUser && adminPassword) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        if (user === adminUser && pwd === adminPassword) {
          return NextResponse.next();
        }
      }
    } catch (e) {
      console.error('Admin Auth Error:', e);
    }
    
    // If auth fails or is missing, prompt for it
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Let other routes pass
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
