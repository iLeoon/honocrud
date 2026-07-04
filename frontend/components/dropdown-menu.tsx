'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'

export function DropdownMenu({ label = 'Actions', children }: { label?: string; children: ReactNode }) {
  return (
    <details className="relative inline-block">
      <summary className="list-none cursor-pointer rounded-md border bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
        {label}
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-36 rounded-md border bg-white p-1 shadow-md">
        {children}
      </div>
    </details>
  )
}

export function DropdownMenuItem({
  onClick,
  children,
  className = '',
}: {
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 ${className}`}
    >
      {children}
    </button>
  )
}

export function DropdownMenuLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="block rounded px-3 py-2 text-sm hover:bg-slate-100">
      {children}
    </Link>
  )
}
