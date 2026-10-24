import { requireAdmin } from "@/app/lib/authGuard"
import { DeleteAccessLogsSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

// How many entries a "delete older than" would remove, so the confirm dialog can say
export async function GET(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const before = new Date(request.nextUrl.searchParams.get("before") ?? "")
  if (isNaN(before.getTime()))
    return NextResponse.json({ error: "Invalid date" }, { status: 400 })

  const count = await prisma.accessLog.count({ where: { createdAt: { lt: before } } })
  return NextResponse.json({ count })
}

export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const validation = DeleteAccessLogsSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { data } = validation
  const { count } = await prisma.accessLog.deleteMany({
    where: "ids" in data ? { id: { in: data.ids } } : { createdAt: { lt: new Date(data.before) } },
  })

  return NextResponse.json({ deleted: count })
}
