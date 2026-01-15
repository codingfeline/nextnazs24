// app/api/consent/route.ts
import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, analytics, externalMedia } = await req.json();

  if (userId) {
    const existing = await prisma.cookieConsent.findFirst({
      where: { userId },
    });

    if (existing) {
      await prisma.cookieConsent.update({
        where: { id: existing.id },
        data: { analytics, externalMedia },
      });
    } else {
      await prisma.cookieConsent.create({
        data: { userId, analytics, externalMedia },
      });
    }
  } else {
    // Anonymous users → always create a new record
    await prisma.cookieConsent.create({
      data: { analytics, externalMedia },
    });
  }

  return NextResponse.json({ ok: true });
}
