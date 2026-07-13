'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { ZodError } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { postFormSchema } from '@/lib/post-schema'
import { CATEGORIES } from '@/lib/categories'

export type PostFormValues = {
  title: string
  content: string
  categoryId: number
  image?: File | null
}

type PostFormProps = {
  heading: string
  submitLabel: string
  description?: string
  initialValues?: Partial<PostFormValues>
  isSubmitting?: boolean
  isLoading?: boolean
  showImageInput?: boolean
  imageRequired?: boolean
  currentImageUrl?: string | null
  error?: string | null
  onSubmit: (values: PostFormValues) => Promise<void> | void
}

const emptyValues: PostFormValues = {
  title: '',
  content: '',
  categoryId: 0,
  image: null,
}

const selectClassName =
  'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30'

export default function PostForm({
  heading,
  submitLabel,
  initialValues = {},
  isSubmitting = false,
  isLoading = false,
  showImageInput = false,
  imageRequired = false,
  currentImageUrl,
  error,
  description,
  onSubmit,
}: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>({
    ...emptyValues,
    ...initialValues,
  })
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setValues({
      title: initialValues.title ?? '',
      content: initialValues.content ?? '',
      categoryId: initialValues.categoryId ?? 0,
      image: null,
    })
  }, [initialValues.title, initialValues.content, initialValues.categoryId])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setValidationError(null)

    if (imageRequired && !values.image) {
      setValidationError('Image is required')
      return
    }

    let parsed
    try {
      parsed = postFormSchema.parse(values)
    } catch (err) {
      if (err instanceof ZodError) {
        setValidationError(err.issues[0]?.message || 'Invalid form input')
      } else {
        setValidationError('Invalid form input')
      }
      return
    }

    try {
      await onSubmit({
        title: parsed.title,
        content: parsed.content,
        categoryId: parsed.categoryId,
        image: values.image ?? null,
      })
    } catch (err) {
      console.error('PostForm submission failed', err)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>{heading}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Post title"
                    value={values.title}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    disabled={isLoading || isSubmitting}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <Textarea
                    id="content"
                    placeholder="Post content"
                    value={values.content}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                    disabled={isLoading || isSubmitting}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <select
                    id="category"
                    className={selectClassName}
                    value={values.categoryId}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        categoryId: Number(event.target.value),
                      }))
                    }
                    disabled={isLoading || isSubmitting}
                  >
                    <option value={0} disabled>
                      Select a category
                    </option>
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Field>
                {showImageInput && (
                  <Field>
                    <FieldLabel htmlFor="image">Image</FieldLabel>
                    {currentImageUrl && !values.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={currentImageUrl}
                        alt="Current post image"
                        className="mb-3 max-h-48 w-full rounded-lg border object-cover"
                      />
                    ) : null}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          image: event.target.files?.[0] ?? null,
                        }))
                      }
                      disabled={isLoading || isSubmitting}
                    />
                    <FieldDescription>
                      {imageRequired
                        ? 'Image is required. Only image files, up to 10MB.'
                        : 'Optional. Choose a new image to replace the current one. Only image files, up to 10MB.'}
                    </FieldDescription>
                  </Field>
                )}
                {(validationError || error) && (
                  <FieldDescription className="text-destructive">
                    {validationError || error}
                  </FieldDescription>
                )}
                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={isLoading || isSubmitting}>
                      {isSubmitting ? `${submitLabel}...` : submitLabel}
                    </Button>
                    <Link href="/dashboard">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading || isSubmitting}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

