import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // If the user is accessing the admin panel
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    
    // Check if the auth header is correct
    // For demo purposes, username is 'admin' and password is 'password123'
    // Encoded in base64: YWRtaW46cGFzc3dvcmQxMjM=
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === 'password123') {
        return NextResponse.next();
      }
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
