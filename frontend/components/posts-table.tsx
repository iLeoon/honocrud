'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeftIcon, ChevronRightIcon, GripHorizontal, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getErrorMessage } from '@/lib/api'
import { deletePost, getPosts } from '@/lib/posts'
import PostsTableSkeleton from '@/components/posts-table-skeleton'

export default function PostsTable() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [tableError, setTableError] = useState<string | null>(null)

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      setTableError(null)
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      setTableError(getErrorMessage(error))
    },
  })

  const posts = postsQuery.data ?? []
  const filteredPosts = posts.filter((post) => {
    const q = filter.toLowerCase()
    return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q)
  })

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
  const safePageIndex = Math.min(pageIndex, pageCount - 1)
  const pagedPosts = filteredPosts.slice(safePageIndex * pageSize, safePageIndex * pageSize + pageSize)

  function remove(id: string) {
    if (!confirm('Delete this post?')) return
    setTableError(null)
    deleteMutation.mutate(id)
  }

  function formatTimestamp(value: string) {
    return new Date(value).toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <input
            placeholder="Filter posts..."
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value)
              setPageIndex(0)
            }}
            className="h-9 w-[150px] rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none lg:w-[250px]"
          />
          {filter && (
            <Button
              variant="ghost"
              onClick={() => {
                setFilter('')
                setPageIndex(0)
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <Link href="/posts/create">
          <Button size="sm" className="h-9 gap-1.5">
            <Plus className="h-4 w-4" />
            Create post
          </Button>
        </Link>
      </div>

      {tableError && <p className="text-sm text-red-600">{tableError}</p>}
      {postsQuery.isError && (
        <p className="text-sm text-red-600">{getErrorMessage(postsQuery.error)}</p>
      )}

      {postsQuery.isLoading ? (
        <PostsTableSkeleton />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Updated at</TableHead>
                <TableHead className="w-[96px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedPosts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="align-top">{p.title}</TableCell>
                  <TableCell className="align-top">{p.content}</TableCell>
                  <TableCell className="align-top">{formatTimestamp(p.created_at)}</TableCell>
                  <TableCell className="align-top">{formatTimestamp(p.updated_at)}</TableCell>
                  <TableCell className="align-middle text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mx-auto flex h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <GripHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/posts/edit/${p.id}`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => remove(String(p.id))}
                          disabled={deleteMutation.isPending && deleteMutation.variables === String(p.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {pagedPosts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                    No posts yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} className="text-sm text-slate-500">
                  Showing {pagedPosts.length} of {filteredPosts.length} filtered posts ({posts.length} total)
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}

      {!postsQuery.isLoading && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              className="h-8 w-[80px] rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPageIndex(0)
              }}
            >
              {[5, 10, 20, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium">
              Page {pageCount === 0 ? 0 : safePageIndex + 1} of {pageCount}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                disabled={safePageIndex === 0}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
                disabled={safePageIndex >= pageCount - 1}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
