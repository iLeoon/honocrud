'use client'

import React, { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) return setError('Email is required')
    if (!password) return setError('Password is required')

    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // let the server set the cookie (Set-Cookie header) — include credentials
        credentials: 'include',
        body: JSON.stringify({ username: email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || 'Login failed')
      } else {
        // server should set cookie; redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-slate-100 bg-white p-8 shadow-sm">
      <h2 className="mb-2 text-2xl font-semibold">Sign in to your account</h2>
      <p className="mb-6 text-sm text-slate-500">Enter your email and password to access your account.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <a className="text-xs text-slate-500 hover:underline" href="#">Forgot password?</a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Your password"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <button type="submit" className="btn w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-2">
        <span className="h-px flex-1 bg-slate-100" />
        <span className="text-xs text-slate-400">Or continue with</span>
        <span className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="border rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Google</button>
        <button className="border rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">GitHub</button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">Don’t have an account? <a href="#" className="text-slate-900 font-medium">Sign up</a></p>
    </div>
  )
}
