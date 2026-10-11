// middleware.ts
// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// export function proxy(req: NextRequest) {
//   const url = new URL(req.url)

//   // 1️⃣ Normalize trailing slash (remove it)
//   if (url.pathname.endsWith('/') && !url.pathname.includes('.')) {
//     const normalized = url.pathname.replace(/\/$/, '')
//     return NextResponse.redirect(`${url.origin}${normalized}`, 308)
//   }

//   // 2️⃣ Force HTTPS (optional if you want to handle HTTP requests)
//   if (url.protocol === 'http:') {
//     return NextResponse.redirect(`https://${url.host}${url.pathname}${url.search}`, 308)
//   }

//   // 3️⃣ Continue to endpoint
//   return NextResponse.next()
// }
import type { NextFetchEvent, NextRequest } from 'next/server'
import { auth } from "./app/api/auth/[...nextauth]/authOptions"
import { logRequest } from "./lib/accessLog"

//? Call auth() directly rather than auth((req) => ...): the wrapper form skips
//? the sign-in redirect when the `authorized` callback returns false.
export async function proxy(req: NextRequest, event: NextFetchEvent) {
  // auth's types have no overload for (req, event), but at runtime it returns a Response
  const authProxy = auth as unknown as (req: NextRequest, event: NextFetchEvent) => Promise<Response>
  const res = await authProxy(req, event)
  // waitUntil: write the log after responding instead of delaying the page
  event.waitUntil(logRequest(req, res.status))
  return res
}

// Apply to all routes or restrict to API routes
export const config = {
  // matcher: ['/api/auth/'],
  // matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
  matcher: ['/((?!api/auth|api/send-email|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

// *: zero or more
// +: one or more
// ?: zero or one