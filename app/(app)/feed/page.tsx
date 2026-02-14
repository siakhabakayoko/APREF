import { FeedItem } from "@/components/feed-item"
import { createClient } from "@/lib/supabase/server"
import { CreatePost } from "@/components/feed/create-post"

export default async function FeedPage() {
    const supabase = await createClient()

    // Get current user for role check and like status
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch posts without inner join constraint (if any)
    // We use a simple select first to debug, but let's try to keep the author join
    // If the foreign key is null, standard join might behave differently depending on Supabase version?
    // Actually left join is default for this syntax.

    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, author:profiles!posts_author_id_fkey(*)")
        .order("is_urgent", { ascending: false }) // Urgent first
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching feed:", error)
    }

    // Check which posts are liked by current user
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
                {/* Debug info */}
                {postsWithLikeStatus.length === 0 && (
                    <p className="text-xs text-red-500">Debug: No posts found by app query. DB has 5.</p>
                )}
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
                {user && <CreatePost />}

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
