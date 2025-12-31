import os from 'os'

export async function GET() {

  // const searchParams = request.nextUrl.searchParams
  // const lengthString = searchParams.get('length')
  // let passLength: number | null = null

  // if (lengthString) {
  //   const parsedLength = parseInt(lengthString, 10)
  //   if (!isNaN(parsedLength)) {
  //     passLength = parsedLength
  //   }
  // }

  // if (passLength === null || passLength < 1) {
  //   passLength = 10
  // }

  // let password = ''
  // const randStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>"

  // for (let i = 0; i < passLength; i++) {
  //   // console.log(i)
  //   const n = Math.floor(Math.random() * randStr.length)
  //   password += randStr[n]
  // }

  const totalMemory = os.totalmem()
  console.log('testing', totalMemory, os.uptime() / 60 / 60)

  return new Response(`total memory ${totalMemory}` + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}