'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/posts'
import { z } from 'zod'
import { DataTable, schema } from '@/components/data-table'

export function PostsList() {
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const tableData: z.infer<typeof schema>[] = useMemo(() => {
    if (!posts) return []
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      image_url: post.image_url ?? null,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }))
  }, [posts])

  if (isError) {
    return (
      <div className="px-4 lg:px-6 text-red-600 text-sm">
        {error instanceof Error ? error.message : 'Failed to load posts'}
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6">
      <DataTable data={tableData} />
    </div>
  )
}
