"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createPost } from "@/app/actions/feed"
import { toast } from "sonner"
import { Loader2, Send, AlertTriangle, PlusCircle, ImagePlus, X } from "lucide-react"


export function CreatePost() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [isUrgent, setIsUrgent] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useState<HTMLInputElement | null>(null)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData(event.currentTarget)

            if (imageFile) {
                // Upload image locally (or direct to supabase if client-side preferred, 
                // but let's stick to the plan: simple upload via client, then pass URL)
                // Actually plan said "Implement file upload to posts bucket using Supabase client"

                const supabase = await import("@/lib/supabase/client").then(mod => mod.createClient())
                const fileExt = imageFile.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('posts')
                    .upload(filePath, imageFile)

                if (uploadError) {
                    throw new Error("Erreur lors de l'upload de l'image")
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('posts')
                    .getPublicUrl(filePath)

                formData.append('imageUrl', publicUrl)
            }

            const result = await createPost(formData)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(result.success)
                setContent("")
                setIsUrgent(false)
                setImageFile(null)
                setPreviewUrl(null)
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue")
        } finally {
            setLoading(false)
        }
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setPreviewUrl(null)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full mb-6">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Créer une publication
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Nouvelle publication</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <Textarea
                        name="content"
                        placeholder="Quoi de neuf ? Partagez une information..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="resize-none min-h-[100px]"
                    />

                    {previewUrl && (
                        <div className="relative rounded-lg overflow-hidden border max-h-48 bg-muted group">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="cursor-pointer text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted">
                                <ImagePlus className="h-5 w-5" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                            </label>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isUrgent"
                                    name="isUrgent"
                                    checked={isUrgent}
                                    onCheckedChange={setIsUrgent}
                                />
                                <Label htmlFor="isUrgent" className="flex items-center gap-2 cursor-pointer">
                                    {isUrgent ? <AlertTriangle className="h-4 w-4 text-red-500" /> : null}
                                    <span className={isUrgent ? "text-red-500 font-medium" : ""}>Urgent</span>
                                </Label>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading || !content.trim()}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {!loading && <Send className="mr-2 h-4 w-4" />}
                            Publier
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

