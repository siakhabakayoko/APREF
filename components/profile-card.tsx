import { Profile } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield } from "lucide-react"

interface ProfileCardProps {
    profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
    const expertise = profile.expertise || []

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                    <AvatarFallback className="text-xl font-bold bg-primary/5 text-primary">
                        {profile.full_name?.charAt(0) || "?"}
                        {profile.full_name?.split(' ')[1]?.charAt(0) || ""}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle className="text-lg">{profile.full_name || "Anonyme"}</CardTitle>
                    <CardDescription className="flex items-center gap-1 font-medium text-primary">
                        <Shield className="h-3 w-3" />
                        {profile.role || "Membre"}
                    </CardDescription>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {profile.country || "Non renseigné"} {profile.region ? `• ${profile.region}` : ''}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                {profile.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {profile.bio}
                    </p>
                )}
                <div className="flex flex-wrap gap-1">
                    {expertise.length > 0 ? (
                        expertise.map((exp) => (
                            <Badge key={exp} variant="secondary" className="text-xs">
                                {exp}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-xs text-muted-foreground italic">Aucune expertise renseignée</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
