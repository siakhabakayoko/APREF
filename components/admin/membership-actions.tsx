"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Check, X } from "lucide-react"

export function MembershipActions({ requestId }: { requestId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(status: "approved" | "rejected") {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from("membership_requests")
      .update({ status })
      .eq("id", requestId)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="gap-1 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent"
        onClick={() => updateStatus("approved")}
        disabled={loading}
      >
        <Check className="w-3.5 h-3.5" />
        Approuver
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
        onClick={() => updateStatus("rejected")}
        disabled={loading}
      >
        <X className="w-3.5 h-3.5" />
        Refuser
      </Button>
    </div>
  )
}
