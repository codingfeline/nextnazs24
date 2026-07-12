import { Role } from '@prisma/client'
import { DefaultSession } from 'next-auth'

// Make the user's role (and id) available on the session and the User object.
//
// Note: we intentionally do NOT augment the JWT interface here. `next-auth`
// pins its own nested copy of `@auth/core` (a different version than the
// top-level one prisma-adapter pulls in), so a `next-auth/jwt` / `@auth/core/jwt`
// augmentation lands on the wrong copy and silently does nothing. The `jwt`
// callback reads/writes `token.role` via JWT's `Record<string, unknown>` index
// signature, and the `session` callback casts it back to `Role`.
declare module 'next-auth' {
  interface User {
    role?: Role
  }

  interface Session {
    user: {
      id: string
      role?: Role
    } & DefaultSession['user']
  }
}
