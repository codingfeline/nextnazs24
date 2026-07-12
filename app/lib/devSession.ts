import { Role } from '@prisma/client'
import type { Session } from 'next-auth'

// Local-only auth bypass for editing journals without signing in.
// Enable by setting NEXT_PUBLIC_DEV_NO_AUTH=true in .env (dev only).
// Hard-disabled in production builds so it can never ship live.
export const DEV_NO_AUTH =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_DEV_NO_AUTH === 'true'

// Fake admin session matching the role the UI checks for.
export const DEV_SESSION: Session = {
  user: {
    id: 'dev-admin',
    name: 'Local Dev',
    email: 'post@nazs.net',
    role: Role.ADMIN,
  },
  expires: '2999-01-01T00:00:00.000Z',
}
