'use client'

import { useEffect, useState } from 'react'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000'

export default function GoogleAuthCallbackPage() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const completeLogin = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/oauth/google/complete`, {
          credentials: 'include',
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          setError(data?.message || 'Google login failed')
          return
        }

        window.location.replace('/dashboard')
      } catch {
        setError('Unable to reach the backend')
      }
    }

    void completeLogin()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Completing Google sign-in</h1>
        <p className="mt-2 text-sm text-slate-500">
          {error ?? 'Please wait while we finish your authentication.'}
        </p>
        {error ? (
          <a
            href="/login"
            className="mt-6 inline-flex rounded-md border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to login
          </a>
        ) : null}
      </div>
    </main>
  )
}
