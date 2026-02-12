import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { ContactMessageRow } from "@/components/admin/contact-message-row"

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
          <h1 className="font-serif text-3xl font-bold text-foreground">Messages de contact</h1>
          <p className="text-muted-foreground mt-1">{messages?.length || 0} messages au total</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-chart-1" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Messages reçus</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-destructive">Erreur lors du chargement des données.</p>
          ) : !messages?.length ? (
            <p className="text-muted-foreground text-center py-8">Aucun message pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <ContactMessageRow key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
