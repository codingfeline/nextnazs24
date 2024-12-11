import { createJournalSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createJournalSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newJournal = await prisma.journals.create({
    data: { topic: body.topic, comment: body.comment }
  })
  return NextResponse.json(newJournal, { status: 201 })
}