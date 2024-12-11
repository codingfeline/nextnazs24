import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const createJournalSchema = z.object({
  topic: z.string().min(5, 'Topic is required'),
  comment: z.string().min(5, 'Comment is required.')
})

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