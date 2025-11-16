import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const lengthString = searchParams.get('length')
  let passLength: number | null = null

  if (lengthString) {
    const parsedLength = parseInt(lengthString, 10)
    if (!isNaN(parsedLength)) {
      passLength = parsedLength
    }
  }

  // const CHARS = {
  //   uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  //   lowercase: 'abcdefghijklmnopqrstuvwxyz',
  //   allcases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  //   numbers: '0123456789',
  //   symbols: '!@#$%^&*()_+[]{}|;:,.<>/?',
  // };

  if (passLength === null || passLength < 1) {
    passLength = 10
  }

  let password = ''
  const randStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  // const numbers = "0123456789"
  // const symbols = "!@#$%^&*()<>"

  for (let i = 0; i < passLength; i++) {
    // console.log(i)
    const n = Math.floor(Math.random() * randStr.length)
    password += randStr[n]
  }

  return new Response(password + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  return NextResponse.json(password)
}