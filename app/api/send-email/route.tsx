import WelcomeTemplate from '@/app/emails/WelcomeTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message, phone } = body
  const { data, error } = await resend.emails.send({
    from: 'info@nazs.net',
    to: email, //? this is the user's email supplied in the form
    // cc: 'info@nazs.net',
    replyTo: [email, 'info@nazs.net'],
    bcc: 'post@nazs.net',
    subject: 'Web enquiry',
    react: <WelcomeTemplate name={name} message={message} phone={phone} />,
  })

  if (error) {
    console.error('[send-email]', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ id: data?.id })
}
