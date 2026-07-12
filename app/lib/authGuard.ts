import { auth } from '@/app/api/auth/[...nextauth]/authOptions'
import { Role } from '@prisma/client'
import { NextResponse } from 'next/server'
import { DEV_NO_AUTH, DEV_SESSION } from './devSession'

// Current session, or the fake admin session when the local dev bypass is on.
export async function getSession() {
  return DEV_NO_AUTH ? DEV_SESSION : await auth()
}

// Guard for write endpoints. Returns an error response to send back when the
// caller isn't an admin, or null when the request is allowed to proceed.
export async function requireAdmin() {
  const session = await getSession()

  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (session.user.role !== Role.ADMIN)
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return null
}
