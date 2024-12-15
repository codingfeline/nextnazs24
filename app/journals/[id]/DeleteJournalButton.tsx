'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteJournalButton = ({ journalId }: { journalId: string }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const deleteJournal = async () => {
    try {
      await axios.delete('/api/journals/' + journalId)
      router.push('/journals')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Journal</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>Confirm delete this journal?</AlertDialog.Description>
          <Flex mt="3" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteJournal}>
                Delete Journal
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This journal is not deleted.</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteJournalButton
