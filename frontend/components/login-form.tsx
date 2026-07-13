'use client'

import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000'

type LoginPayload = {
  username: string
  password: string
}

async function loginUser(payload: LoginPayload) {
  const { data } = await api.post('/login', payload)
  return data
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      window.location.href = '/dashboard'
    },
    onError: (err) => {
      setError(getErrorMessage(err))
    },
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) return setError('Email is required')
    if (!password) return setError('Password is required')
    loginMutation.mutate({ username: email, password })
  }

  const onGoogleSignIn = () => {
    const startGoogleSignIn = async () => {
      setError(null)
      setGoogleLoading(true)

      try {
        const csrfResponse = await fetch(`${BACKEND_URL}/api/auth/csrf`, {
          credentials: 'include',
        })

        const csrfData = await csrfResponse.json().catch(() => null)

        if (!csrfResponse.ok || !csrfData?.csrfToken) {
          setError('Unable to start Google login')
          setGoogleLoading(false)
          return
        }

        const callbackUrl = `${window.location.origin}/auth/callback/google`
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = `${BACKEND_URL}/api/auth/signin/google`

        const csrfInput = document.createElement('input')
        csrfInput.type = 'hidden'
        csrfInput.name = 'csrfToken'
        csrfInput.value = csrfData.csrfToken
        form.appendChild(csrfInput)

        const callbackInput = document.createElement('input')
        callbackInput.type = 'hidden'
        callbackInput.name = 'callbackUrl'
        callbackInput.value = callbackUrl
        form.appendChild(callbackInput)

        document.body.appendChild(form)
        form.submit()
      } catch {
        setError('Unable to start Google login')
        setGoogleLoading(false)
      }
    }

    void startGoogleSignIn()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? 'Signing in…' : 'Login'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onGoogleSignIn}
                  disabled={googleLoading}
                >
                  {googleLoading ? 'Redirecting…' : 'Sign in with Google'}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
