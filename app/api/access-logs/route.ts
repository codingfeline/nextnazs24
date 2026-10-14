import { requireAdmin } from "@/app/lib/authGuard"
import { DeleteAccessLogsSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const validation = DeleteAccessLogsSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { count } = await prisma.accessLog.deleteMany({
    where: { id: { in: validation.data.ids } },
  })

  return NextResponse.json({ deleted: count })
}
