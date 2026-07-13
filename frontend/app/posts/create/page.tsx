'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/post-form'
import { getErrorMessage } from '@/lib/api'
import { createPost } from '@/lib/posts'

export default function Page() {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.push('/dashboard')
    },
  })

  return (
    <PostForm
      heading="Create post"
      submitLabel="Create"
      description="Create a new post and assign it to a category."
      showImageInput
      imageRequired
      isSubmitting={mutation.isPending}
      error={mutation.error ? getErrorMessage(mutation.error) : null}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values)
      }}
    />
  )
}
