import { MOCK_POSTS } from "@/lib/data"
import { FeedItem } from "@/components/feed-item"

export default function FeedPage() {
    return (
        <div className="container py-6 space-y-6 pb-24">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Fil d'Actualité</h1>
                <p className="text-muted-foreground">
                    Les dernières informations officielles et veilles administratives.
                </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
                {MOCK_POSTS.map((post) => (
                    <FeedItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
