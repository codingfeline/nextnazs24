'use client'

import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Midnight at the start of a YYYY-MM-DD day, in the browser's time zone
const startOfDay = (day: string, addDays = 0) => {
  const d = new Date(`${day}T00:00`)
  d.setDate(d.getDate() + addDays)
  return d
}
const longDate = (day: string) => startOfDay(day).toLocaleDateString('en-GB', { dateStyle: 'long' })

// "Delete everything logged from <date> to <date>" (both days inclusive) across the whole log,
// ignoring the table's filters. Leaving one end empty makes the range open on that side.
const DeleteLogsByRange = () => {
  const router = useRouter()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [count, setCount] = useState<number | null>(null) // matching entries, fetched when the dialog opens
  const [isDeleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, as the date input expects
  const isReversed = !!from && !!to && from > to // YYYY-MM-DD strings compare in date order
  const canDelete = (!!from || !!to) && !isReversed && !isDeleting

  // The API takes from (inclusive) and to (exclusive), so the end day runs to the next midnight
  const range = () => ({
    ...(from && { from: startOfDay(from).toISOString() }),
    ...(to && { to: startOfDay(to, 1).toISOString() }),
  })

  const label =
    from && to
      ? from === to
        ? `on ${longDate(from)}`
        : `from ${longDate(from)} to ${longDate(to)}`
      : from
        ? `from ${longDate(from)} onwards`
        : to
          ? `up to and including ${longDate(to)}`
          : ''

  const loadCount = async (open: boolean) => {
    if (!open) return
    setCount(null)
    try {
      const { data } = await axios.get<{ count: number }>('/api/access-logs', { params: range() })
      setCount(data.count)
    } catch (err) {
      console.log(err)
      setError('Could not count the entries to delete.')
    }
  }

  const deleteRange = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/access-logs', { data: range() })
      setFrom('')
      setTo('')
      router.refresh()
    } catch (err) {
      console.log(err)
      setError('The entries were not deleted.')
    } finally {
      setDeleting(false)
    }
  }

  const inputClass = 'rounded border px-2 py-0.5 text-sm theme-surface'

  return (
    <Flex align="center" gap="2" wrap="wrap">
      <Text size="2" className="opacity-70">
        Delete logs
      </Text>
      <Text as="label" size="2" htmlFor="delete-from" className="opacity-70">
        from
      </Text>
      <input
        id="delete-from"
        type="date"
        value={from}
        max={to || today}
        onChange={e => setFrom(e.target.value)}
        className={inputClass}
      />
      <Text as="label" size="2" htmlFor="delete-to" className="opacity-70">
        to
      </Text>
      <input
        id="delete-to"
        type="date"
        value={to}
        min={from || undefined}
        max={today}
        onChange={e => setTo(e.target.value)}
        className={inputClass}
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
                ? `There are no log entries ${label}.`
                : `Delete all ${count} log entr${count === 1 ? 'y' : 'ies'} ${label}? This can't be undone.`}
          </AlertDialog.Description>
          <Flex mt="3" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteRange} disabled={!count}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {(from || to) && (
        <Button
          size="1"
          variant="ghost"
          color="gray"
          onClick={() => {
            setFrom('')
            setTo('')
          }}
        >
          Clear
        </Button>
      )}
      {isReversed && (
        <Text size="1" color="red">
          Start date is after end date
        </Text>
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

export default DeleteLogsByRange
