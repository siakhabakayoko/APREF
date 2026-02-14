import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserActions } from "./user-actions"

interface User {
    id: string
    email?: string
    created_at: string
    last_sign_in_at?: string
    user_metadata: {
        full_name?: string
        [key: string]: any
    }
}

interface UserListProps {
    users: User[]
}

export function UserList({ users }: UserListProps) {
    if (!users.length) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                Aucun utilisateur trouvé.
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                {user.user_metadata.full_name || "N/A"}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {new Date(user.created_at).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </TableCell>
                            <TableCell>
                                {user.last_sign_in_at ? (
                                    new Date(user.last_sign_in_at).toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                ) : (
                                    <Badge variant="secondary">Jamais</Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <UserActions userId={user.id} userEmail={user.email || ""} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
