'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { JournalSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Journals } from '@prisma/client'
import { Button, Callout, Heading, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type JournalFormData = z.infer<typeof JournalSchema>

const JournalForm = ({ journal }: { journal?: Journals }) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JournalFormData>({
    resolver: zodResolver(JournalSchema),
  })

  const onSubmit = handleSubmit(async data => {
    try {
      setSubmitting(true)
      if (journal) await axios.patch('/api/journals/' + journal.id, data)
      else await axios.post('/api/journals/', data)
      router.push('/journals')
      router.refresh()
    } catch (error) {
      console.log(error)
      setSubmitting(false)
      setError('Unexpected error')
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" mb="2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <Heading>New Journal</Heading>
        <TextField.Root
          defaultValue={journal?.topic}
          placeholder="Topic"
          {...register('topic')}
        />
        <ErrorMessage>{errors.topic?.message}</ErrorMessage>
        <Controller
          name="comment"
          control={control}
          defaultValue={journal?.comment}
          render={({ field }) => <SimpleMDE placeholder="Comment" {...field} />}
        />
        <ErrorMessage>{errors.comment?.message}</ErrorMessage>

        <Button disabled={submitting}>
          {journal ? 'Update Journal' : 'Add Journal'} {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default JournalForm
