import { NextResponse } from "next/server"

export async function GET() {

  // function generatePassword(len=15) {
  let password = ''
  const randStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"

  for (let i = 0; i < 16; i++) {
    // console.log(i)
    const n = Math.floor(Math.random() * randStr.length)
    password += randStr[n]
  }

  // return password
  // }
  return NextResponse.json(password)
}