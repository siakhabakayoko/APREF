"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, Menu } from "lucide-react"

export function BottomNav() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg p-2 md:hidden z-50">
            <div className="flex justify-around items-center">
                <Link
                    href="/feed"
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive("/feed") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Home className="h-6 w-6" />
                    <span className="text-xs mt-1">Accueil</span>
                </Link>
                <Link
                    href="/directory"
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive("/directory") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Users className="h-6 w-6" />
                    <span className="text-xs mt-1">Annuaire</span>
                </Link>
                <Link
                    href="/events"
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive("/events") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Calendar className="h-6 w-6" />
                    <span className="text-xs mt-1">Agenda</span>
                </Link>
                <Link
                    href="/menu"
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive("/menu") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    <Menu className="h-6 w-6" />
                    <span className="text-xs mt-1">Menu</span>
                </Link>
            </div>
        </div>
    )
}
