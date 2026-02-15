"use client"

import {
    Calendar,
    Home,
    LayoutDashboard,
    Settings,
    Users,
    Files,
    LogOut,
    User as UserIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

import { type LucideIcon } from "lucide-react"
import Image from "next/image"

// Menu items.
interface MenuItem {
    title: string
    url: string
    icon: LucideIcon
    disabled?: boolean
}

const items: MenuItem[] = [
    {
        title: "Tableau de bord",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Fil d'actualité",
        url: "/feed",
        icon: Home,
    },
    {
        title: "Annuaire",
        url: "/directory",
        icon: Users,
    },
    {
        title: "Agenda",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "Documents",
        url: "/documents",
        icon: Files,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="none" className="border-r h-svh">
            <SidebarHeader className="flex items-center justify-center py-4">
                <div className="font-bold text-xl text-primary flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="APREF Logo"
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                    />

                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        disabled={item.disabled}
                                        className={item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                                    >
                                        <a href={item.disabled ? undefined : item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Mon Profil">
                            <a href="/profile">
                                <UserIcon />
                                <span>Mon Profil</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Paramètres">
                            <a href="/settings">
                                <Settings />
                                <span>Paramètres</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-red-500 hover:text-red-600" tooltip="Déconnexion">
                            <a href="/login">
                                <LogOut />
                                <span>Déconnexion</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
