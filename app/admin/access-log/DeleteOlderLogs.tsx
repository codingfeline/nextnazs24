'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// "Delete everything before <date>" across the whole log, ignoring the table's filters
const DeleteOlderLogs = () => {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [count, setCount] = useState<number | null>(null) // matching entries, fetched when the dialog opens
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  // Midnight at the start of the chosen day, in the browser's time zone
  const before = () => new Date(`${date}T00:00`).toISOString()
  const label = date && new Date(`${date}T00:00`).toLocaleDateString('en-GB', { dateStyle: 'long' })
  const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, as the date input expects

  const loadCount = async (open: boolean) => {
    if (!open) return
    setCount(null)
    try {
      const { data } = await axios.get<{ count: number }>('/api/access-logs', { params: { before: before() } })
      setCount(data.count)
    } catch (err) {
      console.log(err)
      setError('Could not count the entries to delete.')
    }
  }

  const deleteOlder = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/access-logs', { data: { before: before() } })
      setDate('')
      router.refresh()
    } catch (err) {
      console.log(err)
      setError('The entries were not deleted.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Flex align="center" gap="2" wrap="wrap">
      <Text as="label" size="2" htmlFor="delete-before" className="opacity-70">
        Delete logs before
      </Text>
      <input
        id="delete-before"
        type="date"
        value={date}
        max={today}
        onChange={e => setDate(e.target.value)}
        className="rounded border px-2 py-0.5 text-sm theme-surface"
      />
      <AlertDialog.Root onOpenChange={loadCount}>
        <AlertDialog.Trigger>
          <Button color="red" size="1" disabled={!date || isDeleting}>
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
                ? `There are no log entries before ${label}.`
                : `Delete all ${count} log entr${count === 1 ? 'y' : 'ies'} before ${label}? This can't be undone.`}
          </AlertDialog.Description>
          <Flex mt="3" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteOlder} disabled={!count}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

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

export default DeleteOlderLogs
