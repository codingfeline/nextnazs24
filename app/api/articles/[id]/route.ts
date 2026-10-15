import { requireAdmin } from "@/app/lib/authGuard";
import { ArticleSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await params
  if (!/^[0-9a-f]{24}$/i.test(id))
    return NextResponse.json({ error: 'Invalid article' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const validation = ArticleSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const article = await prisma.article.findUnique({ where: { id } })
  if (!article)
    return NextResponse.json({ error: 'Invalid article' }, { status: 404 })

  const updated = await prisma.article.update({
    where: { id },
    data: validation.data,
  })
  return NextResponse.json(updated)
}
