import { JournalSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json()
  const validation = JournalSchema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const journal = await prisma.journals.findUnique({
    // const id = await (params).id
    where: { id: (await (params)).id }
  })

  if (!journal)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

  const updatedJournal = await prisma.journals.update({
    where: { id: journal.id },
    data: {
      topic: body.topic,
      comment: body.comment
    }
  })

  return NextResponse.json(updatedJournal)
}

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const journal = await prisma.journals.findUnique({
    where: { id: (await params).id }
  })

  if (!journal)
    return NextResponse.json({ error: 'Invalid journal' }, { status: 404 })

  await prisma.journals.delete({
    where: { id: journal.id }
  })

  return NextResponse.json({})
}
