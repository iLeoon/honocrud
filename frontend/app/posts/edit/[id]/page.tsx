'use client'

import { use } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import PostForm, { type PostFormValues } from '@/components/post-form'
import { getErrorMessage } from '@/lib/api'
import { getPost, updatePost } from '@/lib/posts'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
  })

  const mutation = useMutation({
    mutationFn: (values: PostFormValues) => updatePost(id, values),
    onSuccess: () => {
      router.push('/dashboard')
    },
  })

  if (postQuery.isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </main>
    )
  }

  if (postQuery.isError || !postQuery.data) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-red-600">
            {postQuery.error ? getErrorMessage(postQuery.error) : 'Post not found'}
          </p>
        </div>
      </main>
    )
  }

  return (
    <PostForm
      heading={`Edit post #${id}`}
      submitLabel="Update"
      description="Update this post's content and category."
      showImageInput
      currentImageUrl={postQuery.data.image_url ?? null}
      initialValues={{
        title: postQuery.data.title,
        content: postQuery.data.content,
        categoryId: postQuery.data.category_id,
      }}
      isSubmitting={mutation.isPending}
      error={mutation.error ? getErrorMessage(mutation.error) : null}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values)
      }}
    />
  )
}
