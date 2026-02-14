'use server'

import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function deleteNewsletterSubscription(id: string) {
    try {
        const { error } = await supabaseAdmin
            .from("newsletter_subscriptions")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Error deleting subscription:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/newsletters")
        return { success: true }
    } catch (error) {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteContactMessage(id: string) {
    try {
        const { error } = await supabaseAdmin
            .from("contact_messages")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Error deleting message:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/contacts")
        return { success: true }
    } catch (error) {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteEventRegistration(id: string) {
    try {
        const { error } = await supabaseAdmin
            .from("event_registrations")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Error deleting registration:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/events")
        return { success: true }
    } catch (error) {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteMembershipRequest(id: string) {
    try {
        const { error } = await supabaseAdmin
            .from("membership_requests")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Error deleting membership request:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/memberships")
        return { success: true }
    } catch (error) {
        return { error: "Une erreur est survenue." }
    }
}
