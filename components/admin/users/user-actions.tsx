'use client'

import { useState } from "react"
import { MoreHorizontal, Trash, Loader2, UserCog, UserMinus } from "lucide-react"
import { deleteUser, toggleAdminRole } from "@/app/actions/users"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

interface UserActionsProps {
    userId: string
    userEmail: string
    isAdmin: boolean
}

export function UserActions({ userId, userEmail, isAdmin }: UserActionsProps) {
    const [openDelete, setOpenDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdatingRole, setIsUpdatingRole] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteUser(userId)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Utilisateur supprimé avec succès")
                setOpenDelete(false)
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleToggleAdmin = async () => {
        setIsUpdatingRole(true)
        try {
            const result = await toggleAdminRole(userId, !isAdmin)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(isAdmin ? "Rôle administrateur révoqué" : "Utilisateur promu administrateur")
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setIsUpdatingRole(false)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleToggleAdmin}
                        disabled={isUpdatingRole}
                    >
                        {isAdmin ? (
                            <>
                                <UserMinus className="mr-2 h-4 w-4" />
                                Révoquer Admin
                            </>
                        ) : (
                            <>
                                <UserCog className="mr-2 h-4 w-4" />
                                Promouvoir Admin
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => setOpenDelete(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Elle supprimera définitivement le compte de <strong>{userEmail}</strong> et toutes ses données associées.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete()
                            }}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
