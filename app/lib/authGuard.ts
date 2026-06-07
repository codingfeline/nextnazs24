import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import { NextResponse } from 'next/server'
import { DEV_NO_AUTH, DEV_SESSION } from './devSession'

// The only account allowed to create/edit/delete journals.
export const ADMIN_EMAIL = 'post@nazs.net'

// Current session, or the fake admin session when the local dev bypass is on.
export async function getSession() {
  return DEV_NO_AUTH ? DEV_SESSION : await auth()
}

// Guard for write endpoints. Returns an error response to send back when the
// caller isn't the admin, or null when the request is allowed to proceed.
export async function requireAdmin() {
  const session = await getSession()

  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (session.user.email !== ADMIN_EMAIL)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return null
}
