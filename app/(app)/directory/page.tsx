import { ProfileCard } from "@/components/profile-card"

export default function DirectoryPage() {
    return (
        <div className="container py-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Annuaire des Membres</h1>
                <p className="text-muted-foreground">
                    Retrouvez vos homologues dans l'espace francophone.
                </p>
            </div>

            {/* Search and Filter Section will go here */}
            <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                <p className="text-sm text-muted-foreground">Recherche et filtres (à venir)</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder for member list */}
                <p className="col-span-full text-center py-10 text-muted-foreground">
                    Chargement de l'annuaire...
                </p>
            </div>
        </div>
    )
}
