'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createPostSchema = z.object({
    content: z.string().min(1, { message: "Le contenu ne peut pas être vide" }),
    isUrgent: z.boolean().optional(),
})

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    const content = formData.get("content") as string
    const isUrgent = formData.get("isUrgent") === "on"

    const validatedFields = createPostSchema.safeParse({
        content,
        isUrgent,
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.content?.[0] || "Erreur de validation",
        }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Non authentifié" }

    // Admin check removed to allow all members to post
    /*
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') {
        return { error: "Non autorisé" }
    }
    */

    const { error } = await supabase.from('posts').insert({
        content: validatedFields.data.content,
        is_urgent: validatedFields.data.isUrgent,
        author_id: user.id
    })

    if (error) {
        console.error("Error creating post:", error)
        return { error: "Erreur lors de la création du post." }
    }

    revalidatePath("/feed")
    revalidatePath("/dashboard")
    return { success: "Post publié avec succès." }
}

export async function toggleLike(postId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Login required" }

    // Check if liked
    const { data: existingLike } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

    if (existingLike) {
        // Unlike
        const { error } = await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id)
        if (!error) {
            const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single()
            if (post) {
                await supabase.from('posts').update({ likes_count: Math.max(0, (post.likes_count || 0) - 1) }).eq('id', postId)
            }
        }
    } else {
        // Like
        const { error } = await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id })
        if (!error) {
            const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single()
            if (post) {
                await supabase.from('posts').update({ likes_count: (post.likes_count || 0) + 1 }).eq('id', postId)
            }
        }
    }

    revalidatePath("/feed")
    return { success: true }
}

export async function addComment(postId: string, content: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "Login required" }

    if (!content.trim()) return { error: "Comment cannot be empty" }

    const { error } = await supabase.from('post_comments').insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim()
    })

    if (error) {
        console.error("Error adding comment:", error)
        return { error: "Failed to add comment" }
    }

    // Increment comment count
    const { data: post } = await supabase.from('posts').select('comments_count').eq('id', postId).single()
    if (post) {
        await supabase.from('posts').update({ comments_count: (post.comments_count || 0) + 1 }).eq('id', postId)
    }

    revalidatePath("/feed")
    return { success: true }
}

export async function getComments(postId: string) {
    const supabase = await createClient()

    const { data: comments, error } = await supabase
        .from('post_comments')
        .select(`
            *,
            author:profiles(*)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error) {
        console.error("Error fetching comments:", error)
        return { error: "Impossible de charger les commentaires" }
    }

    return { success: comments }
}
