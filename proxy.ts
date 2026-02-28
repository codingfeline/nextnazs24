// middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const url = new URL(req.url)

  // 1️⃣ Normalize trailing slash (remove it)
  if (url.pathname.endsWith('/') && !url.pathname.includes('.')) {
    const normalized = url.pathname.replace(/\/$/, '')
    return NextResponse.redirect(`${url.origin}${normalized}`, 308)
  }

  // 2️⃣ Force HTTPS (optional if you want to handle HTTP requests)
  if (url.protocol === 'http:') {
    return NextResponse.redirect(`https://${url.host}${url.pathname}${url.search}`, 308)
  }

  // 3️⃣ Continue to endpoint
  return NextResponse.next()
}

// Apply to all routes or restrict to API routes
export const config = {
  // matcher: ['/api/auth/'],
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}

// *: zero or more
// +: one or more
// ?: zero or one