'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  excluded: { ip: string; since: string }[]
  myIp: string // the IP this page was requested from, for the "Exclude my IP" shortcut
  initialIp: string // the IP the table is filtered by, if any
}

// IPs whose requests aren't logged: add one, or remove it to start logging it again.
// Existing entries from an excluded IP stay until deleted or expired.
const ExcludedIps = ({ excluded, myIp, initialIp }: Props) => {
  const router = useRouter()
  const [ip, setIp] = useState(initialIp)
  const [busyIp, setBusyIp] = useState<string | null>(null) // the IP being added or removed
  const [error, setError] = useState('')

  const isExcluded = (value: string) => excluded.some(e => e.ip === value)
  const target = ip.trim()

  const change = async (value: string, action: 'add' | 'remove') => {
    try {
      setBusyIp(value)
      const url = '/api/access-logs/excluded-ips'
      if (action === 'add') await axios.post(url, { ip: value })
      else await axios.delete(url, { data: { ip: value } })
      if (action === 'add' && value === target) setIp('')
      router.refresh()
    } catch (err) {
      console.log(err)
      setError(action === 'add' ? `Could not exclude ${value}.` : `Could not remove the exclusion for ${value}.`)
    } finally {
      setBusyIp(null)
    }
  }

  const showMyIp = myIp !== 'unknown' && !isExcluded(myIp)

  return (
    <Flex direction="column" gap="2">
      <Flex align="center" gap="2" wrap="wrap">
        <Text as="label" size="2" htmlFor="exclude-ip" className="opacity-70">
          Don&apos;t log IP
        </Text>
        <input
          id="exclude-ip"
          type="text"
          value={ip}
          placeholder="e.g. 203.0.113.7"
          maxLength={100}
          spellCheck={false}
          onChange={e => setIp(e.target.value)}
          className="rounded border px-2 py-0.5 text-sm font-mono theme-surface"
        />
        <Button size="1" disabled={!target || isExcluded(target) || !!busyIp} onClick={() => change(target, 'add')}>
          Exclude
          {busyIp === target && <Spinner />}
        </Button>
        {showMyIp && (
          <Button size="1" variant="soft" disabled={!!busyIp} onClick={() => change(myIp, 'add')}>
            Exclude my IP ({myIp})
            {busyIp === myIp && <Spinner />}
          </Button>
        )}
        {target && isExcluded(target) && (
          <Text size="1" className="opacity-70">
            Already excluded
          </Text>
        )}
      </Flex>

      {excluded.length > 0 && (
        <Flex align="center" gap="2" wrap="wrap">
          <Text size="2" className="opacity-70">
            Not logged:
          </Text>
          {excluded.map(e => (
            <Flex
              key={e.ip}
              align="center"
              gap="1"
              className="rounded border px-2 py-0.5 theme-surface"
              title={`Excluded since ${e.since}`}
            >
              <Text size="2" className="font-mono">
                {e.ip}
                {e.ip === myIp && ' (you)'}
              </Text>
              <Button
                size="1"
                variant="ghost"
                color="gray"
                disabled={!!busyIp}
                aria-label={`Log ${e.ip} again`}
                onClick={() => change(e.ip, 'remove')}
              >
                {busyIp === e.ip ? <Spinner /> : '✕'}
              </Button>
            </Flex>
          ))}
        </Flex>
      )}

      <AlertDialog.Root open={!!error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>{error}</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError('')}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  )
}

export default ExcludedIps
