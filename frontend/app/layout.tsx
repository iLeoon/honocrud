import './globals.css'
import { ReactNode } from 'react'
import QueryProvider from '@/components/query-provider'

export const metadata = {
  title: 'Shadcn Login Demo',
  description: 'Simple login form inspired by shadcn blocks',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
