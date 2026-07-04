'use client'

import React, { ReactNode, useEffect, useState } from 'react'

export default function Protected({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const hasToken = document.cookie.split(';').some((c) => c.trim().startsWith('token='))
    if (!hasToken) {
      // redirect to login
      window.location.href = '/login'
    } else {
      setChecked(true)
    }
  }, [])

  if (!checked) return null
  return <>{children}</>
}
