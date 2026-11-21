'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

// "Delete everything logged from <IP>" across the whole log, whatever the date.
// Starts filled with the IP the table is filtered by, if any.
const DeleteLogsByIp = ({ initialIp }: { initialIp: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [ip, setIp] = useState(initialIp)
  const [count, setCount] = useState<number | null>(null) // matching entries, fetched when the dialog opens
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const target = ip.trim()
  const canDelete = !!target && !isDeleting

  const loadCount = async (open: boolean) => {
    if (!open) return
    setCount(null)
    try {
      const { data } = await axios.get<{ count: number }>('/api/access-logs', { params: { ip: target } })
      setCount(data.count)
    } catch (err) {
      console.log(err)
      setError('Could not count the entries to delete.')
    }
  }

  const deleteIp = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/access-logs', { data: { ip: target } })
      setIp('')
      // If the table was filtered to this IP it would now be empty, so drop that filter
      if (searchParams.get('ip') === target) {
        const query = new URLSearchParams(searchParams)
        query.delete('ip')
        query.delete('page')
        const qs = query.toString()
        router.push(`${pathname}${qs ? `?${qs}` : ''}`)
      } else {
        router.refresh()
      }
    } catch (err) {
      console.log(err)
      setError('The entries were not deleted.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Flex align="center" gap="2" wrap="wrap">
      <Text as="label" size="2" htmlFor="delete-ip" className="opacity-70">
        Delete logs from IP
      </Text>
      <input
        id="delete-ip"
        type="text"
        value={ip}
        placeholder="e.g. 203.0.113.7"
        maxLength={100}
        spellCheck={false}
        onChange={e => setIp(e.target.value)}
        className="rounded border px-2 py-0.5 text-sm font-mono theme-surface"
      />
      <AlertDialog.Root onOpenChange={loadCount}>
        <AlertDialog.Trigger>
          <Button color="red" size="1" disabled={!canDelete}>
            Delete
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            {count === null
              ? 'Counting entries…'
              : count === 0
                ? `There are no log entries from ${target}.`
                : `Delete all ${count} log entr${count === 1 ? 'y' : 'ies'} from ${target}? This can't be undone.`}
          </AlertDialog.Description>
          <Flex mt="3" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIp} disabled={!count}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {ip && (
        <Button size="1" variant="ghost" color="gray" onClick={() => setIp('')}>
          Clear
        </Button>
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

export default DeleteLogsByIp
