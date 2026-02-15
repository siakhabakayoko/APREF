import React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-muted/30 pb-16 md:pb-0">
      <div className="hidden md:flex">
        <AdminSidebar userEmail={user.email || ""} />
      </div>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
      <AdminBottomNav />
    </div>
  )
}
