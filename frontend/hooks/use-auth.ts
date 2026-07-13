import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export type AuthUser = {
  loggedIn: boolean
  payload?: {
    sub: string
    role: string
    email?: string
    exp: number
  }
  message?: string
}

export function useAuth() {
  return useQuery<AuthUser>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/user/me')
      return data
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
