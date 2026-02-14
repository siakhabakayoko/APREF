import { FeedItem } from "@/components/feed-item"
import { createClient } from "@/lib/supabase/server"
import { CreatePost } from "@/components/feed/create-post"

export default async function FeedPage() {
    const supabase = await createClient()

    // Get current user for role check and like status
    const { data: { user } } = await supabase.auth.getUser()

    // Check if admin
    let isAdmin = false
    if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        isAdmin = profile?.role === 'admin'
    }

    // Fetch posts
    const { data: posts } = await supabase
        .from("posts")
        .select("*, author:profiles(*)")
        .order("is_urgent", { ascending: false }) // Urgent first
        .order("created_at", { ascending: false })

    // Check which posts are liked by current user
    // We can do a second query or a join if possible.
    // Simpler: fetch all likes for this user and map them.
    let likedPostIds = new Set()
    if (user) {
        const { data: likes } = await supabase
            .from('post_likes')
            .select('post_id')
            .eq('user_id', user.id)

        if (likes) {
            likedPostIds = new Set(likes.map(l => l.post_id))
        }
    }

    const postsWithLikeStatus = posts?.map(post => ({
        ...post,
        liked_by_me: likedPostIds.has(post.id)
    })) || []

    return (
        <div className="container py-6 space-y-6 pb-24">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Fil d'Actualité</h1>
                <p className="text-muted-foreground">
                    Les dernières informations officielles et veilles administratives.
                </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
                {isAdmin && <CreatePost />}

                {postsWithLikeStatus.length > 0 ? (
                    postsWithLikeStatus.map((post) => (
                        <FeedItem key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">Aucune publication pour le moment.</p>
                )}
            </div>
        </div>
    )
}
