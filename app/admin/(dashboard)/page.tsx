import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Users, MessageSquare, CalendarCheck } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [newsletters, memberships, contacts, events] = await Promise.all([
    supabase.from("newsletter_subscriptions").select("*", { count: "exact", head: true }),
    supabase.from("membership_requests").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("event_registrations").select("*", { count: "exact", head: true }),
  ])

  const [pendingMemberships, unreadContacts] = await Promise.all([
    supabase.from("membership_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
  ])

  const stats = [
    {
      title: "Inscriptions Newsletter",
      value: newsletters.count || 0,
      icon: Mail,
      href: "/admin/newsletters",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Demandes d'adhésion",
      value: memberships.count || 0,
      subtitle: `${pendingMemberships.count || 0} en attente`,
      icon: Users,
      href: "/admin/memberships",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Messages de contact",
      value: contacts.count || 0,
      subtitle: `${unreadContacts.count || 0} non lus`,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Inscriptions événements",
      value: events.count || 0,
      icon: CalendarCheck,
      href: "/admin/events",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de l'activité du site APREF</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
