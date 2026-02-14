import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { ExportButton } from "@/components/admin/export-button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteNewsletterSubscription } from "@/app/actions/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
          <h1 className="font-serif text-3xl font-bold text-foreground">Newsletter</h1>
          <p className="text-muted-foreground mt-1">{subscriptions?.length || 0} abonnés au total</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={subscriptions || []} filename="newsletter_subscribers.csv" />
          <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-chart-1" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Liste des abonnés</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !subscriptions?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucun abonné pour le moment.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nom complet</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.full_name || "-"}</TableCell>
                    <TableCell>
                      {new Date(sub.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DeleteButton
                        id={sub.id}
                        onDelete={async (id) => {
                          'use server'
                          return await deleteNewsletterSubscription(id)
                        }}
                        itemName="cet abonné"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
