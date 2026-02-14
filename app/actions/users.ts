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

        // Force password change for new admin-created users
        if (user?.user) {
            // Give trigger a moment or retry?
            // Actually, we can just update it. The trigger runs synchronously usually?
            // Let's rely on admin client to update the profile.
            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .update({ must_change_password: true })
                .eq('id', user.user.id)

            if (profileError) {
                console.error("Error setting force password change:", profileError)
                // Non-blocking error, but good to know
            }
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

export async function toggleAdminRole(userId: string, isAdmin: boolean) {
    try {
        const newRole = isAdmin ? 'admin' : 'member'

        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId)

        if (error) {
            console.error("Error updating user role:", error)
            return { error: error.message }
        }

        revalidatePath("/admin/users")
        return { success: true }
    } catch (err) {
        return { error: "Une erreur inattendue est survenue." }
    }
}

export async function revalidateProfile() {
    revalidatePath('/settings')
    return { success: true }
}
