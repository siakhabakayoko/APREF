"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { submitMembershipRequest } from "@/app/actions"


export function MembershipModal({ children }: { children?: React.ReactNode }) {
    const [membershipStatus, setMembershipStatus] = useState<{ success?: string; error?: string } | null>(null)
    const [membershipLoading, setMembershipLoading] = useState(false)
    const [open, setOpen] = useState(false)

    async function handleMembership(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setMembershipLoading(true)
        setMembershipStatus(null)
        const formData = new FormData(e.currentTarget)
        const result = await submitMembershipRequest(formData)
        setMembershipStatus(result)
        setMembershipLoading(false)
        if (result.success) {
            e.currentTarget.reset()
            setTimeout(() => setOpen(false), 3000)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        size="lg"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 mt-6"
                    >
                        Demande d'adhésion
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Formulaire d'adhésion</DialogTitle>
                    <DialogDescription>
                        Remplissez ce formulaire pour soumettre votre demande d'adhésion à l'APREF.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleMembership} className="space-y-4 py-4">
                    <div>
                        <label htmlFor="m_name" className="block text-sm font-medium text-foreground mb-2">
                            Nom complet *
                        </label>
                        <input
                            type="text"
                            id="m_name"
                            name="full_name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="Votre nom complet"
                        />
                    </div>
                    <div>
                        <label htmlFor="m_email" className="block text-sm font-medium text-foreground mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="m_email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="votre@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="m_country" className="block text-sm font-medium text-foreground mb-2">
                            Pays *
                        </label>
                        <input
                            type="text"
                            id="m_country"
                            name="country"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="Ex: France"
                        />
                    </div>
                    <div>
                        <label htmlFor="m_position" className="block text-sm font-medium text-foreground mb-2">
                            Fonction actuelle *
                        </label>
                        <input
                            type="text"
                            id="m_position"
                            name="current_position"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="Ex: Préfet de la région..."
                        />
                    </div>
                    <div>
                        <label htmlFor="m_motivation" className="block text-sm font-medium text-foreground mb-2">
                            Motivation
                        </label>
                        <textarea
                            id="m_motivation"
                            name="motivation"
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                            placeholder="Pourquoi souhaitez-vous rejoindre l'APREF ?"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={membershipLoading}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                        {membershipLoading ? "Envoi en cours..." : "Soumettre ma candidature"}
                    </Button>
                    {membershipStatus?.success && (
                        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            <span>{membershipStatus.success}</span>
                        </div>
                    )}
                    {membershipStatus?.error && (
                        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{membershipStatus.error}</span>
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}
