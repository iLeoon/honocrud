'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ZodError } from 'zod'
import { Button } from '@/components/ui/button'
import { postFormSchema } from '@/lib/post-schema'

type PostFormValues = {
  title: string
  content: string
}

type PostFormProps = {
  heading: string
  submitLabel: string
  initialValues?: PostFormValues
  isSubmitting?: boolean
  isLoading?: boolean
  error?: string | null
  onSubmit: (values: PostFormValues) => Promise<void> | void
}

const emptyValues = {
  title: '',
  content: '',
}

export default function PostForm({
  heading,
  submitLabel,
  initialValues = emptyValues,
  isSubmitting = false,
  isLoading = false,
  error,
  onSubmit,
}: PostFormProps) {
  const [values, setValues] = useState(initialValues)
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setValidationError(null)

    try {
      const parsed = postFormSchema.parse(values)
      await onSubmit({
        title: parsed.title,
        content: parsed.content,
      })
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.issues[0]?.message || 'Invalid form input')
        return
      }
      setValidationError('Invalid form input')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-xl font-semibold text-slate-900">{heading}</h1>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Title"
            value={values.title}
            onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
            disabled={isLoading || isSubmitting}
          />
          <textarea
            className="input min-h-32"
            placeholder="Content"
            value={values.content}
            onChange={(event) => setValues((current) => ({ ...current, content: event.target.value }))}
            disabled={isLoading || isSubmitting}
          />
          {(validationError || error) && (
            <p className="text-sm text-red-600">{validationError || error}</p>
          )}
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {isSubmitting ? `${submitLabel}...` : submitLabel}
            </Button>
            <Link href="/dashboard">
              <Button type="button" variant="outline" disabled={isLoading || isSubmitting}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
