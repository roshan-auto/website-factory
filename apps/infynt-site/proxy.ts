import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Only redirect to the plumbing demo if the visitor is on the specific demo domain
  // and they are trying to access the root homepage (/)
  if (hostname.includes('manawatu-flow-plumbing-demo') && url.pathname === '/') {
    return NextResponse.redirect(new URL('/manawatu-flow-plumbing', request.url))
  }

  return NextResponse.next()
}

// Only run this check on the homepage to save performance
export const config = {
  matcher: '/',
}
