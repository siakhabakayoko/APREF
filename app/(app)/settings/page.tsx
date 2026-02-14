import { createClient } from "@/lib/supabase/server"
import { ProfilePictureUpload } from "@/components/settings/profile-picture-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Moon, Shield, Globe, User } from "lucide-react"
import { ChangePasswordDialog } from "@/components/settings/change-password-dialog"

export default async function SettingsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let profile = null
    if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        profile = data
    }

    return (
        <div className="container max-w-2xl py-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Mon Profil</CardTitle>
                    <CardDescription>
                        Gérez votre identité visuelle et vos informations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex flex-col items-center">
                    {user && (
                        <ProfilePictureUpload
                            userId={user.id}
                            currentAvatarUrl={profile?.avatar_url}
                            onUploadComplete={(url) => {
                                "use server"
                                // We could revalidatePath here if this was a server action, 
                                // but since it's a client callback, we rely on client state updates in the component.
                                // Or we can pass a server action to revalidate.
                            }}
                        />
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Préférences de l'application</CardTitle>
                    <CardDescription>
                        Personnalisez votre expérience APREF Connect.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications Push</Label>
                            <span className="text-sm text-muted-foreground">Recevoir les alertes urgentes et messages.</span>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label className="text-base flex items-center gap-2"><Moon className="h-4 w-4" /> Mode Sombre</Label>
                            <span className="text-sm text-muted-foreground">Activer le thème sombre pour l'interface.</span>
                        </div>
                        <Switch />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex flex-col space-y-1">
                            <Label className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> Langue</Label>
                            <span className="text-sm text-muted-foreground">Langue de l'interface (Français par défaut).</span>
                        </div>
                        <Button variant="outline" size="sm" disabled>Français</Button>
                    </div>

                </CardContent>
            </Card>

            <Card className="border-red-100">
                <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2"><Shield className="h-5 w-5" /> Sécurité</CardTitle>
                    <CardDescription>
                        Gérez vos paramètres de sécurité et de connexion.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="w-full">
                        <ChangePasswordDialog />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
