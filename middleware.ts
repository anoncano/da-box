// middleware.ts  (root of project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const lower = req.nextUrl.pathname.toLowerCase();

  // if the URL isn’t already lower-case, redirect permanently
  if (req.nextUrl.pathname !== lower) {
    req.nextUrl.pathname = lower;
    return NextResponse.redirect(req.nextUrl, 308); // 308 keeps method/body
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],  // ignore Next.js assets
};
