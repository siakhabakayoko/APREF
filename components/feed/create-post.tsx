"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createPost } from "@/app/actions/feed"
import { toast } from "sonner"
import { Loader2, Send, AlertTriangle } from "lucide-react"

export function CreatePost() {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [isUrgent, setIsUrgent] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const result = await createPost(formData)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
            setContent("")
            setIsUrgent(false)
        }

        setLoading(false)
    }

    return (
        <Card className="mb-6 border-dashed">
            <CardContent className="pt-6">
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        name="content"
                        placeholder="Quoi de neuf ? Partagez une information..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="resize-none min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isUrgent"
                                name="isUrgent"
                                checked={isUrgent}
                                onCheckedChange={setIsUrgent}
                            />
                            <Label htmlFor="isUrgent" className="flex items-center gap-2 cursor-pointer">
                                {isUrgent ? <AlertTriangle className="h-4 w-4 text-red-500" /> : null}
                                <span className={isUrgent ? "text-red-500 font-medium" : ""}>Message Urgent</span>
                            </Label>
                        </div>
                        <Button type="submit" disabled={loading || !content.trim()}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Send className="mr-2 h-4 w-4" />
                            Publier
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
