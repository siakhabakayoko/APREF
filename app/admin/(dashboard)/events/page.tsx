import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck } from "lucide-react"

export default async function EventsAdminPage() {
  const supabase = await createClient()
  const { data: registrations, error } = await supabase
    .from("event_registrations")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">{"Inscriptions aux événements"}</h1>
          <p className="text-muted-foreground mt-1">{registrations?.length || 0} inscriptions au total</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-chart-5/10 flex items-center justify-center">
          <CalendarCheck className="w-6 h-6 text-chart-5" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des inscrits</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !registrations?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucune inscription pour le moment.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nom</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Événement</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Pays</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Organisation</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground font-medium">{reg.full_name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.event_name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.country || "-"}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.organization || "-"}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(reg.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
