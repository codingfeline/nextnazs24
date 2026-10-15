import { requireAdmin } from "@/app/lib/authGuard";
import { ArticleSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json().catch(() => null)
  const validation = ArticleSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const article = await prisma.article.create({ data: validation.data })
  return NextResponse.json(article, { status: 201 })
}
