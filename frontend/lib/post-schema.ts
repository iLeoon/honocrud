import { z } from 'zod'

export const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(150, 'Title must be at most 150 characters'),
  content: z
    .string()
    .trim()
    .min(1, 'Content is required')
    .max(5000, 'Content must be at most 5000 characters'),
})

export type PostFormSchemaInput = z.infer<typeof postFormSchema>
