
export async function GET() {

  // function generatePassword(len=15) {
  let password = ''
  const randStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>"

  for (let i = 0; i < 16; i++) {
    // console.log(i)
    const n = Math.floor(Math.random() * randStr.length)
    password += randStr[n]
  }

  // return password
  // }
  return new Response(password + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  // return NextResponse.json(password)
}