'use client'
import { Button, Heading, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import SimpleMDE from 'react-simplemde-editor'

const NewJournalPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Heading>New Journal</Heading>
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit Story</Button>
    </div>
  )
}

export default NewJournalPage
