'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/post-form'
import { getErrorMessage } from '@/lib/api'
import { getPost, updatePost } from '@/lib/posts'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  params: { id: string }
}

export default function Page({ params }: Props) {
  const router = useRouter()
  const postQuery = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => getPost(params.id),
  })

  const mutation = useMutation({
    mutationFn: (values: { title: string; content: string }) => updatePost(params.id, values),
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
      heading={`Edit post #${params.id}`}
      submitLabel="Update"
      initialValues={{
        title: postQuery.data.title,
        content: postQuery.data.content,
      }}
      isSubmitting={mutation.isPending}
      error={mutation.error ? getErrorMessage(mutation.error) : null}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values)
      }}
    />
  )
}
