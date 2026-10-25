import type { NextRequest } from 'next/server'
import prisma from '@/prisma/client'

const RETENTION_SECONDS = 30 * 24 * 60 * 60

let ttlIndexReady: Promise<unknown> | null = null

//? MongoDB deletes rows automatically once createdAt is older than the TTL.
//? createIndexes is a no-op when the index already exists, so running once per process is enough.
const ensureTtlIndex = () => {
  ttlIndexReady ??= prisma
    .$runCommandRaw({
      createIndexes: 'access_logs',
      indexes: [{ key: { createdAt: 1 }, name: 'createdAt_ttl', expireAfterSeconds: RETENTION_SECONDS }],
    })
    .catch((err) => {
      ttlIndexReady = null // retry on the next request
      throw err
    })
  return ttlIndexReady
}

//? x-forwarded-for can be spoofed by the client unless a reverse proxy you control
//? overwrites it. The first entry is the original client.
export const getClientIp = (headers: Headers) =>
  headers.get('x-forwarded-for')?.split(',')[0].trim() || headers.get('x-real-ip') || 'unknown'

// My own visits from this machine (IPv4, IPv6, and IPv4-mapped IPv6 loopback)
const isLoopback = (ip: string) => ip === '::1' || /^(::ffff:)?127\./.test(ip)

// Where the visitor came from. Links within this site are kept as just the path ("/blog");
// other sites keep the full URL. No header means the address was typed in or bookmarked.
const getReferer = (req: NextRequest) => {
  const referer = req.headers.get('referer')
  if (!referer) return null
  try {
    const url = new URL(referer)
    return (url.host === req.nextUrl.host ? url.pathname + url.search : url.href).slice(0, 512)
  } catch {
    return referer.slice(0, 512) // not a valid URL; keep what was sent
  }
}

export const logRequest = async (req: NextRequest, status: number) => {
  const ip = getClientIp(req.headers)
  if (isLoopback(ip)) return

  try {
    await ensureTtlIndex()
    await prisma.accessLog.create({
      data: {
        ip,
        method: req.method,
        path: req.nextUrl.pathname,
        status,
        userAgent: req.headers.get('user-agent')?.slice(0, 512),
        // Vercel geolocates the IP for us; absent in local dev
        country: req.headers.get('x-vercel-ip-country')?.slice(0, 2) || null,
        referer: getReferer(req),
      },
    })
  } catch (err) {
    // logging must never break the request
    console.error('access log failed', err)
  }
}
