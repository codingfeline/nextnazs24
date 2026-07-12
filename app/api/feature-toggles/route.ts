import { requireAdmin } from '@/app/lib/authGuard'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { FEATURE_KEYS } from '../../_components/featureKeys'

// Admin-only: sets a feature's visibility for every visitor to the site.
export async function POST(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json()
  const { key, visible } = body

  if (typeof visible !== 'boolean' || !FEATURE_KEYS.includes(key))
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  const toggle = await prisma.featureToggle.upsert({
    where: { key },
    update: { visible },
    create: { key, visible },
  })
  return NextResponse.json(toggle)
}
