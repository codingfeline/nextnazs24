export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/journals/new']
}

// *: zero or more
// +: one or more
// ?: zero or one