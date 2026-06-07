import { requireAdmin } from "@/app/lib/authGuard";
import { JournalSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await request.json()
  const validation = JournalSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newJournal = await prisma.journals.create({
    data: { topic: body.topic, comment: body.comment }
  })
  return NextResponse.json(newJournal, { status: 201 })
}