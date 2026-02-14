import { Metadata } from "next"
import { Users } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { CreateUserDialog } from "@/components/admin/users/create-user-dialog"
import { UserList } from "@/components/admin/users/user-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Gestion des utilisateurs | Admin",
    description: "Gérer les utilisateurs de l'application",
}

export default async function UsersPage() {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 100,
    })

    // Sort users by created_at desc
    const sortedUsers = users?.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || []

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">Utilisateurs</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez les comptes utilisateurs et leurs accès.
                    </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-chart-1" />
                </div>
            </div>

            <div className="flex justify-end">
                <CreateUserDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Liste des utilisateurs ({sortedUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <p className="text-destructive">Erreur lors du chargement des utilisateurs : {error.message}</p>
                    ) : (
                        <UserList users={sortedUsers} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
