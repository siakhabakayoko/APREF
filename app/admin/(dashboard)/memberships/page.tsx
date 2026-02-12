import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { MembershipActions } from "@/components/admin/membership-actions"

export default async function MembershipsAdminPage() {
  const supabase = await createClient()
  const { data: requests, error } = await supabase
    .from("membership_requests")
    .select("*")
    .order("created_at", { ascending: false })

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  const statusLabels: Record<string, string> = {
    pending: "En attente",
    approved: "Approuvée",
    rejected: "Refusée",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">{"Demandes d'adhésion"}</h1>
          <p className="text-muted-foreground mt-1">{requests?.length || 0} demandes au total</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-chart-4" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des candidatures</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !requests?.length ? (
            <p className="text-muted-foreground text-center py-8">{"Aucune demande d'adhésion pour le moment."}</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="border border-border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-foreground">{req.full_name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[req.status] || ""}`}>
                          {statusLabels[req.status] || req.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{req.email}</p>
                      <p className="text-sm text-muted-foreground">{req.country} - {req.current_position}</p>
                      {req.motivation && (
                        <p className="text-sm text-muted-foreground mt-2 italic">{`"${req.motivation}"`}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(req.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {req.status === "pending" && (
                      <MembershipActions requestId={req.id} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
