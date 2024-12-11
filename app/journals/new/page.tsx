'use client'

import { createJournalSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, Heading, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type JournalForm = z.infer<typeof createJournalSchema>

const NewJournalPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalForm>({
    resolver: zodResolver(createJournalSchema),
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" mb="2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post('/api/journals', data)
            router.push('/')
          } catch (error) {
            setError('Unexpected error')
          }
        })}
      >
        <Heading>New Journal</Heading>
        <TextField.Root placeholder="Topic" {...register('topic')} />
        {errors.topic && <Text color="red">{errors.topic.message}</Text>}
        <Controller
          name="comment"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Comment" {...field} />}
        />
        {errors.comment && (
          <Text as="p" color="red">
            {errors.comment.message}
          </Text>
        )}
        <Button>Submit Story</Button>
      </form>
    </div>
  )
}

export default NewJournalPage
