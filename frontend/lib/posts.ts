import { api } from '@/lib/api'

export type Post = {
  id: number
  title: string
  content: string
  category: string
  category_id?: number
  image_url?: string | null
  created_at: string
  updated_at: string
}

export type PostPayload = {
  title: string
  content: string
  categoryId: number
  image?: File | null
}

export async function getPosts() {
  const { data } = await api.get<{ posts: Post[] }>('/posts')
  return data.posts
}

export async function getPost(id: string) {
  const { data } = await api.get<Post>(`/posts/${id}`)
  return data
}

export async function createPost(payload: PostPayload) {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('content', payload.content)
  formData.append('category_id', String(payload.categoryId))
  if (payload.image) {
    formData.append('image', payload.image)
  }

  // Clear the JSON content-type so the browser sets the multipart boundary.
  const { data } = await api.post('/posts', formData, {
    headers: { 'Content-Type': undefined },
  })

  return data
}

export async function updatePost(id: string, payload: PostPayload) {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('content', payload.content)
  formData.append('category_id', String(payload.categoryId))
  if (payload.image) {
    formData.append('image', payload.image)
  }

  const { data } = await api.put(`/posts/${id}`, formData, {
    headers: { 'Content-Type': undefined },
  })

  return data
}

export async function deletePost(id: string) {
  const { data } = await api.delete(`/posts/${id}`)
  return data
}

