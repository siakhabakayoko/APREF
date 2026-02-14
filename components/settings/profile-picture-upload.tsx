"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Upload, Camera } from "lucide-react"

interface ProfilePictureUploadProps {
    userId: string
    currentAvatarUrl?: string | null
    onUploadComplete: (url: string) => void
}

export function ProfilePictureUpload({ userId, currentAvatarUrl, onUploadComplete }: ProfilePictureUploadProps) {
    const supabase = createClient()
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split(".").pop()
            const filePath = `${userId}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath)

            // Update profile with new avatar URL
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ avatar_url: publicUrl })
                .eq("id", userId)

            if (updateError) {
                throw updateError
            }

            setAvatarUrl(publicUrl)
            onUploadComplete(publicUrl)
            toast.success("Photo de profil mise à jour !")

        } catch (error: any) {
            toast.error(error.message || "Error uploading avatar")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={avatarUrl || ""} />
                    <AvatarFallback className="text-4xl">
                        {/* If we had the name, we could generate initials here. For now "?" */}
                        ?
                    </AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                    <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </Label>
            </div>
            <p className="text-sm text-muted-foreground">
                Cliquez sur l'icône caméra pour changer votre photo.
            </p>
        </div>
    )
}
