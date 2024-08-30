"use client"
import dynamic from 'next/dynamic';
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod"
import "easymde/dist/easymde.min.css";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from '@prisma/client';
//import SimpleMDE from "react-simplemde-editor";
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>

export default function NewIssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (issue)
        await axios.patch(`/api/issues/${issue.id}`, data)
      else
        await axios.post('/api/issues', data)
      router.push('/issues')
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error occurred. Please try again.')
    }
  })

  return (
    <div className="max-w-xl">
      {error &&
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form
        className='space-y-3'
        onSubmit={onSubmit}
      >
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
