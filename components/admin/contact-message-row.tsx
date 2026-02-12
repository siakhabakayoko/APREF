"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Circle, CheckCircle2 } from "lucide-react"

interface ContactMessage {
  id: string
  full_name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}

export function ContactMessageRow({ message }: { message: ContactMessage }) {
  const router = useRouter()

  async function markAsRead() {
    if (message.is_read) return
    const supabase = createClient()
    await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", message.id)
    router.refresh()
  }

  return (
    <div
      className={`border border-border rounded-lg p-5 transition-colors cursor-pointer ${
        message.is_read ? "bg-background" : "bg-primary/5 border-primary/20"
      }`}
      onClick={markAsRead}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {message.is_read ? (
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Circle className="w-4 h-4 text-primary fill-primary" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${message.is_read ? "text-foreground" : "text-primary"}`}>
              {message.full_name}
            </h4>
            <span className="text-xs text-muted-foreground">
              {new Date(message.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{message.email}</p>
          {message.subject && (
            <p className="text-sm font-medium text-foreground">{message.subject}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{message.message}</p>
        </div>
      </div>
    </div>
  )
}
