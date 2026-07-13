import { z } from 'zod'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB

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
  categoryId: z
    .number({ invalid_type_error: 'Please select a category' })
    .int()
    .positive('Please select a category'),
  image: z
    .any()
    .refine((val) => !val || val instanceof File, 'Invalid file')
    .refine(
      (val) => !val || (val as File).type.startsWith('image/'),
      'Only image files are allowed'
    )
    .refine(
      (val) => !val || (val as File).size <= MAX_IMAGE_SIZE,
      'Image must be 10MB or less'
    ),
})

export type PostFormSchemaInput = z.infer<typeof postFormSchema>
