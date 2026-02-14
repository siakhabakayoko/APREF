"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ChangePasswordDialog } from "@/components/settings/change-password-dialog"

export function ForceChangePassword() {
    const [mustChange, setMustChange] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        async function checkProfile() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("must_change_password")
                    .eq("id", user.id)
                    .single()

                if (profile?.must_change_password) {
                    setMustChange(true)
                }
            }
            setChecking(false)
        }

        checkProfile()
    }, [])

    if (checking || !mustChange) {
        return null
    }

    return <ChangePasswordDialog force={true} />
}
