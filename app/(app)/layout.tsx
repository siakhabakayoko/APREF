import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { Separator } from "@/components/ui/separator"
import { ForceChangePassword } from "@/components/auth/force-change-password"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="hidden md:block">
                <AppSidebar />
            </div>
            <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">
                <ForceChangePassword />
                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">


                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard">APREF Connect</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
            <BottomNav />
        </SidebarProvider>
    )
}
