"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePassword } from "@/app/actions/auth"
import { toast } from "sonner"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export function ChangePasswordDialog({ force = false }: { force?: boolean }) {
    const [open, setOpen] = useState(force)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const result = await updatePassword(formData)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success(result.success)
            setOpen(false)
            if (force) {
                router.refresh()
            }
        }

        setLoading(false)
    }

    return (
        <Dialog open={open || force} onOpenChange={force ? undefined : setOpen}>
            {!force && (
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Lock className="mr-2 h-4 w-4" />
                        Modifier le mot de passe
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={force ? (e) => e.preventDefault() : undefined} onEscapeKeyDown={force ? (e) => e.preventDefault() : undefined}>
                <DialogHeader>
                    <DialogTitle>
                        {force ? "Changement de mot de passe requis" : "Modifier le mot de passe"}
                    </DialogTitle>
                    <DialogDescription>
                        {force
                            ? "Pour votre sécurité, vous devez changer votre mot de passe avant de continuer."
                            : "Entrez votre nouveau mot de passe ci-dessous."
                        }
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Nouveau
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="col-span-3"
                                required
                                minLength={6}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirmPassword" className="text-right">
                                Confirmer
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="col-span-3"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
