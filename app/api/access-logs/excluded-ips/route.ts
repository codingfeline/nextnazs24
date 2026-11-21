import { requireAdmin } from "@/app/lib/authGuard"
import { ExcludedIpSchema } from "@/app/validationSchemas"
import { clearExcludedIpCache } from "@/lib/accessLog"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

const parse = async (request: NextRequest) =>
  ExcludedIpSchema.safeParse(await request.json().catch(() => null))

// Stop logging requests from an IP. Adding one that's already excluded is fine.
export async function POST(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const validation = await parse(request)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { ip } = validation.data
  const excluded = await prisma.excludedIp.upsert({ where: { ip }, create: { ip }, update: {} })
  clearExcludedIpCache()

  return NextResponse.json(excluded, { status: 201 })
}

// Start logging an IP again
export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const validation = await parse(request)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { count } = await prisma.excludedIp.deleteMany({ where: { ip: validation.data.ip } })
  clearExcludedIpCache()

  return NextResponse.json({ removed: count })
}
