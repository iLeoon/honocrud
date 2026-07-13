'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SiteHeader } from "@/components/site-header"
import { PostsList } from "@/components/posts-list"
import { SectionCards } from "@/components/section-cards"
import { useAuth } from "@/hooks/use-auth"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  const { data: authData, isLoading: authLoading } = useAuth()

  const user = authData?.loggedIn && authData?.payload
    ? {
        name: authData.payload.email?.split('@')[0] ?? 'User',
        email: authData.payload.email ?? 'user@example.com',
        avatar: '',
      }
    : {
        name: 'Loading...',
        email: 'Loading...',
        avatar: '',
      }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="px-4 lg:px-6">
                <PostsList />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


