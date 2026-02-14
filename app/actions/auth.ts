'use server'

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const updatePasswordSchema = z.object({
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
})

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
        return { error: "Les mots de passe ne correspondent pas." }
    }

    const validatedFields = updatePasswordSchema.safeParse({
        password,
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.password?.[0] || "Mot de passe invalide",
        }
    }

    const { error } = await supabase.auth.updateUser({
        password: validatedFields.data.password,
    })

    if (error) {
        console.error("Error updating password:", error)
        return { error: "Une erreur est survenue lors de la mise à jour du mot de passe." }
    }

    // Clear the force password change flag
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ must_change_password: false })
        .match({ id: (await supabase.auth.getUser()).data.user?.id }) // Ensure we tackle the right user, though RLS handles it

    if (profileError) {
        console.error("Error clearing force password flag:", profileError)
    }

    return { success: "Votre mot de passe a été mis à jour avec succès." }
}
