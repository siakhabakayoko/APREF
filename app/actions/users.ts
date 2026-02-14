'use server'

import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createUserSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    full_name: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères" }),
})

export async function createUser(prevState: any, formData: FormData) {
    const validatedFields = createUserSchema.safeParse({
        email: formData.get("email"),
        full_name: formData.get("full_name"),
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, full_name } = validatedFields.data

    // Generate a random password
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

    try {
        const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name,
            },
        })

        if (error) {
            console.error("Error creating user:", error)
            return { error: error.message }
        }

        // Trigger user creation trigger (if needed/async) or ensure profile exists
        // The existing trigger in migration 20260209_init_profiles.sql handles profile creation on INSERT to auth.users

        revalidatePath("/admin/users")

        return {
            success: true,
            data: {
                user,
                password, // Return the generated password so it can be shown to the admin
            },
        }
    } catch (err) {
        console.error("Unexpected error:", err)
        return { error: "Une erreur inattendue est survenue." }
    }
}

export async function deleteUser(userId: string) {
    try {
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

        if (error) {
            console.error("Error deleting user:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/users")
        return { success: true }
    } catch (err) {
        console.error("Unexpected error:", err)
        return { error: "Une erreur inattendue est survenue." }
    }
}
