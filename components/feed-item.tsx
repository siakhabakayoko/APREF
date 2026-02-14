"use client"

import { Post } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, AlertTriangle, Send } from "lucide-react"
import { toggleLike, addComment } from "@/app/actions/feed"
import { toast } from "sonner"
import { useState } from "react"
import { Input } from "./ui/input"

interface FeedItemProps {
    post: Post & {
        author?: any,
        liked_by_me?: boolean
    }
}

export function FeedItem({ post }: FeedItemProps) {
    const [liking, setLiking] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState("")
    const [commenting, setCommenting] = useState(false)

    const handleLike = async () => {
        setLiking(true)
        // Optimistic update could happen here, but for now we rely on revalidate
        const result = await toggleLike(post.id)
        if (result.error) {
            toast.error(result.error)
        }
        setLiking(false)
    }

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return

        setCommenting(true)
        const result = await addComment(post.id, comment)
        if (result.error) {
            toast.error(result.error)
        } else {
            setComment("")
            toast.success("Commentaire ajouté")
        }
        setCommenting(false)
    }

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
                            {new Date(post.created_at).toLocaleDateString()} {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                <p className="whitespace-pre-wrap">{post.content}</p>
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post content"
                        className="mt-3 rounded-lg w-full object-cover max-h-60"
                    />
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] h-5">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch pt-3 gap-3">
                <div className="flex justify-between w-full border-t pt-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 gap-1 ${post.liked_by_me ? 'text-red-500' : 'text-muted-foreground'}`}
                        onClick={handleLike}
                        disabled={liking}
                    >
                        <Heart className={`h-4 w-4 ${post.liked_by_me ? 'fill-current' : ''}`} />
                        <span className="text-xs">{post.likes_count}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-muted-foreground"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.comments_count}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>

                {showComments && (
                    <div className="w-full space-y-3 pt-2">
                        <form onSubmit={handleComment} className="flex gap-2">
                            <Input
                                placeholder="Écrire un commentaire..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="h-9 text-sm"
                            />
                            <Button type="submit" size="icon" className="h-9 w-9" disabled={commenting || !comment.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        {/* We could fetch comments here if we had a sub-component or server fetch */}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
