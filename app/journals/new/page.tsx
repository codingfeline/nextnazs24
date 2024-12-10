'use client'
import { Button, Heading, TextField } from '@radix-ui/themes'
import 'easymde/dist/easymde.min.css'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'

interface JournalForm {
  title: string
  description: string
}

const NewJournalPage = () => {
  const { register, control, handleSubmit } = useForm<JournalForm>()
  console.log(register('title'))

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(data => console.log(data))}
    >
      <Heading>New Journal</Heading>
      <TextField.Root placeholder="Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button>Submit Story</Button>
    </form>
  )
}

export default NewJournalPage
