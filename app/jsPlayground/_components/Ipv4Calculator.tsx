'use client'
import BrainsContainer from '@/app/components/BrainsContainer'
import MyCodeHighlighter from '@/app/components/MyCodeHighlighter'
import MyContainer from '@/app/components/MyContainer'
import { ChangeEvent, useMemo, useState } from 'react'

// Dotted-quad -> unsigned 32-bit int, or null if invalid.
const parseIp = (str: string): number | null => {
  const parts = str.trim().split('.')
  if (parts.length !== 4) return null
  let n = 0
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null
    const v = Number(p)
    if (v > 255) return null
    n = n * 256 + v
  }
  return n >>> 0
}

// Mask as CIDR ("/24", "24") or dotted ("255.255.255.0") -> prefix 0-32.
const parseMask = (str: string): number | null => {
  const cleaned = str.trim().replace(/^\//, '')
  if (/^\d{1,2}$/.test(cleaned)) {
    const p = Number(cleaned)
    return p <= 32 ? p : null
  }
  const m = parseIp(cleaned)
  if (m === null) return null
  let prefix = 0
  let seenZero = false
  for (let i = 31; i >= 0; i--) {
    if ((m >>> i) & 1) {
      if (seenZero) return null
      prefix++
    } else {
      seenZero = true
    }
  }
  return prefix
}

const maskFor = (prefix: number) => (prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0)
const toDotted = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')

const classify = (ip: number): { label: string; className: string } => {
  const inCidr = (baseStr: string, prefix: number) =>
    (ip & maskFor(prefix)) === ((parseIp(baseStr) as number) & maskFor(prefix))
  if (inCidr('10.0.0.0', 8) || inCidr('172.16.0.0', 12) || inCidr('192.168.0.0', 16))
    return { label: 'Private (RFC 1918)', className: 'text-blue-600' }
  if (inCidr('127.0.0.0', 8)) return { label: 'Loopback', className: 'text-gray-500' }
  if (inCidr('169.254.0.0', 16)) return { label: 'Link-local (APIPA)', className: 'text-gray-500' }
  if (inCidr('100.64.0.0', 10)) return { label: 'Carrier-grade NAT', className: 'text-gray-500' }
  if (inCidr('0.0.0.0', 8)) return { label: 'Reserved ("this network")', className: 'text-gray-500' }
  if (inCidr('224.0.0.0', 4)) return { label: 'Multicast', className: 'text-gray-500' }
  if (inCidr('240.0.0.0', 4)) return { label: 'Reserved', className: 'text-gray-500' }
  return { label: 'Public', className: 'text-green-600' }
}

interface Result {
  cidr: string
  netmask: string
  network: string
  broadcast: string
  hostRange: string
  usable: string
  type: { label: string; className: string }
}

export default function Ipv4Calculator({ hideBrains }: { hideBrains?: boolean }) {
  const [ip, setIp] = useState('')
  const [mask, setMask] = useState('/')

  const result = useMemo<Result | { error: string } | null>(() => {
    const ipRaw = ip.trim()
    const maskRaw = mask.trim()
    if (!ipRaw && !maskRaw) return null

    const ipNum = parseIp(ipRaw)
    if (ipNum === null) return { error: 'Enter a valid IPv4 address.' }
    const prefix = parseMask(maskRaw)
    if (prefix === null) return { error: 'Enter a valid mask, e.g. 255.255.255.0 or /24.' }

    const m = maskFor(prefix)
    const network = (ipNum & m) >>> 0
    const broadcast = (network | (~m >>> 0)) >>> 0

    let hostRange: string
    let usable: number
    if (prefix === 32) {
      hostRange = toDotted(ipNum)
      usable = 1
    } else if (prefix === 31) {
      hostRange = `${toDotted(network)} – ${toDotted(broadcast)}`
      usable = 2
    } else {
      hostRange = `${toDotted((network + 1) >>> 0)} – ${toDotted((broadcast - 1) >>> 0)}`
      usable = Math.pow(2, 32 - prefix) - 2
    }

    return {
      cidr: `${toDotted(network)}/${prefix}`,
      netmask: toDotted(m),
      network: toDotted(network),
      broadcast: toDotted(broadcast),
      hostRange,
      usable: usable.toLocaleString(),
      type: classify(ipNum),
    }
  }, [ip, mask])

  const codeSnippet = `const maskFor = prefix => (0xFFFFFFFF << (32 - prefix)) >>> 0
const network = ip & mask
const broadcast = network | (~mask >>> 0)
const usableHosts = 2 ** (32 - prefix) - 2`

  return (
    <MyContainer header="IPv4 Address Ranges">
      <div className="flex flex-col gap-2 mb-3">
        <input
          type="text"
          value={ip}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIp(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder="IP address — e.g. 192.168.1.10"
          maxLength={15}
          className="flex-1 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
        />
        <input
          type="text"
          value={mask}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMask(e.target.value.replace(/[^0-9./]/g, ''))}
          placeholder="Mask or CIDR — e.g. 255.255.255.0 or 24"
          maxLength={15}
          className="flex-1 border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none transition-all text-black text-sm"
        />
      </div>

      {result && (
        <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-4 text-sm">
          {'error' in result ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              <dt className="text-gray-500">CIDR</dt>
              <dd className="font-mono">{result.cidr}</dd>
              <dt className="text-gray-500">Netmask</dt>
              <dd className="font-mono">{result.netmask}</dd>
              <dt className="text-gray-500">Network</dt>
              <dd className="font-mono">{result.network}</dd>
              <dt className="text-gray-500">Broadcast</dt>
              <dd className="font-mono">{result.broadcast}</dd>
              <dt className="text-gray-500">Host range</dt>
              <dd className="font-mono">{result.hostRange}</dd>
              <dt className="text-gray-500">Usable hosts</dt>
              <dd className="font-mono">{result.usable}</dd>
              <dt className="text-gray-500">Type</dt>
              <dd className={`font-semibold ${result.type.className}`}>{result.type.label}</dd>
            </dl>
          )}
        </div>
      )}

      <h4 className="text-xs font-semibold text-gray-500 mt-2 mb-1">Private (RFC 1918)</h4>
      <table className="w-full text-xs mb-2">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="font-medium pb-1">CIDR</th>
            <th className="font-medium pb-1">Range</th>
            <th className="font-medium pb-1">Addresses</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          <tr>
            <td className="pr-2 py-0.5">10.0.0.0/8</td>
            <td className="pr-2 py-0.5">10.0.0.0 – 10.255.255.255</td>
            <td className="py-0.5">16,777,216</td>
          </tr>
          <tr>
            <td className="pr-2 py-0.5">172.16.0.0/12</td>
            <td className="pr-2 py-0.5">172.16.0.0 – 172.31.255.255</td>
            <td className="py-0.5">1,048,576</td>
          </tr>
          <tr>
            <td className="pr-2 py-0.5">192.168.0.0/16</td>
            <td className="pr-2 py-0.5">192.168.0.0 – 192.168.255.255</td>
            <td className="py-0.5">65,536</td>
          </tr>
        </tbody>
      </table>

      <h4 className="text-xs font-semibold text-gray-500 mt-2 mb-1">Public</h4>
      <p className="text-xs text-gray-500 mb-2">
        Any address outside the private and reserved blocks is publicly routable on the internet — for
        example <span className="font-mono">1.0.0.0 – 9.255.255.255</span> or{' '}
        <span className="font-mono">11.0.0.0 – 100.63.255.255</span>.
      </p>

      <h4 className="text-xs font-semibold text-gray-500 mt-2 mb-1">Other reserved</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="font-medium pb-1">CIDR</th>
            <th className="font-medium pb-1">Range</th>
            <th className="font-medium pb-1">Use</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          <tr>
            <td className="pr-2 py-0.5">127.0.0.0/8</td>
            <td className="pr-2 py-0.5">127.0.0.0 – 127.255.255.255</td>
            <td className="py-0.5">Loopback</td>
          </tr>
          <tr>
            <td className="pr-2 py-0.5">169.254.0.0/16</td>
            <td className="pr-2 py-0.5">169.254.0.0 – 169.254.255.255</td>
            <td className="py-0.5">Link-local (APIPA)</td>
          </tr>
          <tr>
            <td className="pr-2 py-0.5">100.64.0.0/10</td>
            <td className="pr-2 py-0.5">100.64.0.0 – 100.127.255.255</td>
            <td className="py-0.5">Carrier-grade NAT</td>
          </tr>
        </tbody>
      </table>

      <BrainsContainer hidden={hideBrains}>
        <MyCodeHighlighter item={codeSnippet} />
      </BrainsContainer>
    </MyContainer>
  )
}
