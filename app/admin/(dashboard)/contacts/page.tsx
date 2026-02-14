import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { ExportButton } from "@/components/admin/export-button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteContactMessage } from "@/app/actions/admin"

export default async function ContactsAdminPage() {
  const supabase = await createClient()
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">{messages?.length || 0} messages reçus</p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton data={messages || []} filename="contact_messages.csv" />
          <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-chart-2" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Boîte de réception</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !messages?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="border border-border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{msg.subject || "Sans objet"}</h4>
                      <p className="text-sm text-muted-foreground">{msg.full_name} ({msg.email})</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                      <DeleteButton
                        id={msg.id}
                        onDelete={async (id) => {
                          'use server'
                          return await deleteContactMessage(id)
                        }}
                        itemName="ce message"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
