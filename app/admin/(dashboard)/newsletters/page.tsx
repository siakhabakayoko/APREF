import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default async function NewslettersAdminPage() {
  const supabase = await createClient()
  const { data: subscriptions, error } = await supabase
    .from("newsletter_subscriptions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Inscriptions Newsletter</h1>
          <p className="text-muted-foreground mt-1">{subscriptions?.length || 0} inscrits au total</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-chart-2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des inscrits</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !subscriptions?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucune inscription pour le moment.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nom</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground">{sub.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{sub.full_name || "-"}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(sub.created_at).toLocaleDateString("fr-FR", {
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
