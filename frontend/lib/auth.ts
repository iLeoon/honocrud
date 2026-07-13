import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { hasValidToken } from '@/lib/auth-token'

export async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!hasValidToken(token)) {
    redirect('/login')
  }
}
