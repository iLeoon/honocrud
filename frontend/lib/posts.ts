import { api } from '@/lib/api'

export type Post = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
}

export type PostPayload = {
  title: string
  content: string
}

export async function getPosts() {
  const { data } = await api.get<{ posts: Post[] }>('/posts')
  return data.posts
}

export async function getPost(id: string) {
  const { data } = await api.get<{ post: Post | null }>(`/posts/${id}`)
  return data.post
}

export async function createPost(payload: PostPayload) {
  const { data } = await api.post('/posts', payload)

  return data
}

export async function updatePost(id: string, payload: PostPayload) {
  const { data } = await api.put(`/posts/${id}`, payload)
  return data
}

export async function deletePost(id: string) {
  const { data } = await api.delete(`/posts/${id}`)
  return data
}
