import { requireAdmin } from "@/app/lib/authGuard"
import { AccessLogIpSchema, AccessLogRangeSchema, DeleteAccessLogsSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

// from is inclusive, to is exclusive; a missing end is left open
const rangeWhere = ({ from, to }: { from?: string; to?: string }): Prisma.AccessLogWhereInput => ({
  createdAt: {
    ...(from && { gte: new Date(from) }),
    ...(to && { lt: new Date(to) }),
  },
})

// How many entries a range or IP delete would remove, so the confirm dialog can say
export async function GET(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const params = request.nextUrl.searchParams
  const ip = params.get("ip")
  const validation = ip !== null
    ? AccessLogIpSchema.safeParse({ ip })
    : AccessLogRangeSchema.safeParse({
        from: params.get("from") ?? undefined,
        to: params.get("to") ?? undefined,
      })
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { data } = validation
  const count = await prisma.accessLog.count({
    where: "ip" in data ? { ip: data.ip } : rangeWhere(data),
  })
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
    where:
      "ids" in data ? { id: { in: data.ids } }
      : "ip" in data ? { ip: data.ip }
      : rangeWhere(data),
  })

  return NextResponse.json({ deleted: count })
}
