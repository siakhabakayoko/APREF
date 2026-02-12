import { Post } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, AlertTriangle } from "lucide-react"

interface FeedItemProps {
    post: Post
}

export function FeedItem({ post }: FeedItemProps) {
    return (
        <Card className={`overflow-hidden ${post.is_urgent ? 'border-red-500/50 bg-red-50/10' : ''}`}>
            <CardHeader className="flex flex-row items-start gap-4 pb-3">
                <Avatar>
                    <AvatarImage src={post.author?.avatar_url} />
                    <AvatarFallback>{post.author?.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{post.author?.full_name || "Système"}</h4>
                        <span className="text-xs text-muted-foreground">
                            {/* Simple date formatting */}
                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.author?.role}</p>
                </div>
            </CardHeader>
            <CardContent className="pb-3 text-sm leading-relaxed">
                {post.is_urgent && (
                    <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>URGENT</span>
                    </div>
                )}
                <p>{post.content}</p>
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post content"
                        className="mt-3 rounded-lg w-full object-cover max-h-60"
                    />
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] h-5">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                    <Heart className="h-4 w-4" /> <span className="text-xs">{post.likes_count}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" /> <span className="text-xs">{post.comments_count}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
