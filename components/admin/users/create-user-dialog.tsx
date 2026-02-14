'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Loader2, Copy, Check } from "lucide-react"
import { createUser } from "@/app/actions/users"
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    full_name: z.string().min(2, { message: "Le nom complet doit contenir au moins 2 caractères" }),
})

export function CreateUserDialog() {
    const [open, setOpen] = useState(false)
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            full_name: "",
        },
    })

    const { isSubmitting } = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        formData.append("email", values.email)
        formData.append("full_name", values.full_name)

        const result = await createUser(null, formData)

        if (result.error) {
            if (typeof result.error === "string") {
                toast.error(result.error)
            } else {
                // Handle validation errors
                Object.values(result.error).forEach((errors: any) => {
                    errors.forEach((error: string) => toast.error(error))
                })
            }
        } else if (result.success && result.data) {
            toast.success("Utilisateur créé avec succès")
            setGeneratedPassword(result.data.password)
            form.reset()
        }
    }

    const handleCopyPassword = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleClose = () => {
        setOpen(false)
        setGeneratedPassword(null)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un utilisateur
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un utilisateur</DialogTitle>
                    <DialogDescription>
                        Créez un nouveau compte utilisateur. Un mot de passe sera généré automatiquement.
                    </DialogDescription>
                </DialogHeader>

                {generatedPassword ? (
                    <div className="space-y-4 py-4">
                        <div className="rounded-md bg-muted p-4">
                            <p className="text-sm font-medium mb-2">Mot de passe généré :</p>
                            <div className="flex items-center justify-between bg-background border rounded-md p-2">
                                <code className="font-mono text-sm">{generatedPassword}</code>
                                <Button variant="ghost" size="icon" onClick={handleCopyPassword}>
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
                            Important : Copiez ce mot de passe et transmettez-le à l'utilisateur. Il ne sera plus visible après la fermeture de cette fenêtre.
                        </div>
                        <DialogFooter>
                            <Button onClick={handleClose}>Fermer</Button>
                        </DialogFooter>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom complet</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jean Dupont" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jean.dupont@example.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Créer le compte
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}
