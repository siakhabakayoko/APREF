import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck } from "lucide-react"
import { ExportButton } from "@/components/admin/export-button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteEventRegistration } from "@/app/actions/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
          <h1 className="font-serif text-3xl font-bold text-foreground">Événements</h1>
          <p className="text-muted-foreground mt-1">{registrations?.length || 0} inscriptions au total</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={registrations || []} filename="event_registrations.csv" />
          <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6 text-chart-3" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inscriptions aux événements</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !registrations?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucune inscription pour le moment.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Événement</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Pays/Organisation</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.event_name}</TableCell>
                    <TableCell>{reg.full_name}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>
                      {reg.country && reg.organization ? `${reg.country} - ${reg.organization}` : (reg.country || reg.organization || "-")}
                    </TableCell>
                    <TableCell>
                      {new Date(reg.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DeleteButton
                        id={reg.id}
                        onDelete={async (id) => {
                          'use server'
                          return await deleteEventRegistration(id)
                        }}
                        itemName="cette inscription"
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
