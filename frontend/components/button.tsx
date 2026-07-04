'use client'

import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline'
}

export default function Button({ variant = 'default', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium'
  const styles =
    variant === 'outline'
      ? 'border bg-white text-slate-700 hover:bg-slate-50'
      : 'bg-slate-900 text-white hover:opacity-90'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}
