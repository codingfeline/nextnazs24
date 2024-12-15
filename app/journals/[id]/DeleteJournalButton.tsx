import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteJournalButton = ({ journalId }: { journalId: string }) => {
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
              <Button color="red">Delete Journal</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteJournalButton
