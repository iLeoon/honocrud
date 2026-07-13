// Category name -> id mapping. The backend stores posts with a numeric
// `category_id`; the UI only lets the user pick a name and we send the
// corresponding number. Keep these in sync with the `categories` table.
export const CATEGORIES = [
  { id: 1, name: 'Backend' },
  { id: 2, name: 'Frontend' },
  { id: 3, name: 'Database' },
  { id: 4, name: 'DevOps' },
] as const

export type Category = (typeof CATEGORIES)[number]

export function categoryNameById(id: number): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? ''
}
