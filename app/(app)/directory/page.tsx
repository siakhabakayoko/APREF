import { Suspense } from "react"
import { ProfileCard } from "@/components/profile-card"
import { createClient } from "@/lib/supabase/server"
import { DirectoryFilters } from "@/components/directory/directory-filters"
import { Profile } from "@/types"

export default async function DirectoryPage({
    searchParams,
}: {
    searchParams: { q?: string }
}) {
    const supabase = await createClient()
    const query = searchParams?.q || ""

    let dbQuery = supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true })

    if (query) {
        dbQuery = dbQuery.or(`full_name.ilike.%${query}%,role.ilike.%${query}%,country.ilike.%${query}%`)
    }

    const { data: profiles, error } = await dbQuery

    return (
        <div className="container py-6 space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Annuaire des Membres</h1>
                <p className="text-muted-foreground">
                    Retrouvez vos homologues dans l'espace francophone.
                </p>
            </div>

            <Suspense fallback={<div>Chargement des filtres...</div>}>
                <DirectoryFilters />
            </Suspense>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {profiles && profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile as Profile} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        {query ? "Aucun membre trouvé pour cette recherche." : "Aucun membre dans l'annuaire."}
                    </div>
                )}
            </div>
        </div>
    )
}
