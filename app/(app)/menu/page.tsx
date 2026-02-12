import { Button } from "@/components/ui/button"
import { LogOut, Settings, User } from "lucide-react"

export default function MenuPage() {
    return (
        <div className="container py-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Menu</h1>

            <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-lg h-12" asChild>
                    <a href="/profile">
                        <User className="mr-2 h-5 w-5" />
                        Mon Profil
                    </a>
                </Button>
                <Button variant="outline" className="w-full justify-start text-lg h-12" asChild>
                    <a href="/settings">
                        <Settings className="mr-2 h-5 w-5" />
                        Paramètres
                    </a>
                </Button>
                <Button variant="destructive" className="w-full justify-start text-lg h-12 mt-4">
                    <LogOut className="mr-2 h-5 w-5" />
                    Déconnexion
                </Button>
            </div>
        </div>
    )
}
