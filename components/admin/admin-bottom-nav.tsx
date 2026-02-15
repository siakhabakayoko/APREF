"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Mail, Users, MessageSquare, CalendarCheck, UserCog } from "lucide-react"

export function AdminBottomNav() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/users", label: "Users", icon: UserCog },
        { href: "/admin/newsletters", label: "News", icon: Mail },
        { href: "/admin/memberships", label: "Membres", icon: Users },
        { href: "/admin/contacts", label: "Msgs", icon: MessageSquare },
        { href: "/admin/events", label: "Events", icon: CalendarCheck },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-lg p-2 md:hidden z-50 overflow-x-auto">
            <div className="flex justify-between items-center min-w-full px-2 gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[60px] ${isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-[10px] mt-1 truncate max-w-full">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
