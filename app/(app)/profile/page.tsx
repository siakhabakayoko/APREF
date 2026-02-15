"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { ProfilePictureUpload } from "@/components/settings/profile-picture-upload"

export default function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        console.log("🚀 ~ ProfilePage ~ useEffect:")
        getProfile()
    }, [])

    async function getProfile() {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error && error.code !== 'PGRST116') {
                console.error(error)
            }

            if (data) {
                console.log("🚀 ~ getProfile ~ data:", data)
                setProfile(data)
            } else {
                // If no profile exists, use basic user metadata or empty defaults
                setProfile({
                    id: user.id,
                    full_name: user.user_metadata?.full_name || '',
                    avatar_url: user.user_metadata?.avatar_url || '',

                    username: user.email?.split('@')[0],
                    website: '',
                    role: '',
                    country: '',
                    region: '',
                    bio: '',
                    expertise: []
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setSaving(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user')

            const updates = {
                id: user.id,
                full_name: profile.full_name,

                username: profile.username,
                website: profile.website,
                role: profile.role,
                country: profile.country,
                region: profile.region,
                bio: profile.bio,
                expertise: profile.expertise,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) throw error
            toast.success('Profil mis à jour !')
        } catch (error) {
            toast.error('Erreur lors de la mise à jour.')
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <div className="container max-w-2xl py-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                    <CardDescription>
                        Gérez vos informations visibles par les autres membres.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={updateProfile} className="space-y-6">
                        <ProfilePictureUpload
                            userId={profile?.id}
                            currentAvatarUrl={profile?.avatar_url}
                            onUploadComplete={(url) => setProfile({ ...profile, avatar_url: url })}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={profile?.id ? "********" : ""} disabled placeholder="Email sécurisé" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nom complet</Label>
                            <Input
                                id="fullName"
                                value={profile?.full_name || ''}
                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input
                                id="username"
                                value={profile?.username || ''}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="website">Site Web / Réseau Social</Label>
                            <Input
                                id="website"
                                value={profile?.website || ''}
                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Fonction / Rôle</Label>
                                <Input
                                    id="role"
                                    placeholder="Ex: Préfet, Gouverneur..."
                                    value={profile?.role || ''}
                                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays</Label>
                                <Input
                                    id="country"
                                    value={profile?.country || ''}
                                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="region">Région / Ville</Label>
                            <Input
                                id="region"
                                value={profile?.region || ''}
                                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expertise">Expertise (séparées par des virgules)</Label>
                            <Input
                                id="expertise"
                                placeholder="Ex: Gestion de crise, Sécurité civile, Administration..."
                                value={Array.isArray(profile?.expertise) ? profile.expertise.join(', ') : (profile?.expertise || '')}
                                onChange={(e) => setProfile({ ...profile, expertise: e.target.value.split(',').map((s: string) => s.trim()) })}
                            />
                            <p className="text-xs text-muted-foreground">Séparez vos domaines d'expertise par des virgules.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Biographie</Label>
                            <Textarea
                                id="bio"
                                placeholder="Présentez-vous en quelques lignes..."
                                className="min-h-[100px]"
                                value={profile?.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            />
                        </div>


                        <Button type="submit" disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enregistrer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
