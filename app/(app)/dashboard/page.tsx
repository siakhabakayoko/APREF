import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Activity, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
    const supabase = await createClient()

    // Fetch Key Metrics in parallel
    const [
        { count: newMembersCount },
        { data: urgentPost },
        { data: nextEvent },
        { count: eventsCount }, // Using as a proxy for engagement or just to show something
        { data: upcomingEvents },
    ] = await Promise.all([
        // New Members (last 7 days)
        supabase.from("profiles").select("*", { count: 'exact', head: true })
            .gt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),

        // Urgent Post or Latest
        supabase.from("posts").select("*, author:profiles(*)").order('is_urgent', { ascending: false }).order('created_at', { ascending: false }).limit(1).single(),

        // Next Event
        supabase.from("events").select("*").gt('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(1).single(),

        // Total Events count (just for stats)
        supabase.from("events").select("*", { count: 'exact', head: true }),

        // Upcoming Events list
        supabase.from("events").select("*").gt('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(3)
    ])

    // Fetch Unread Messages / Documents / Activity
    // Since we don't have a messages table yet for users, we'll show "Nouveaux Posts" count from last 3 days
    // or just hardcode 0 if no unread system.
    // Let's use "Nouveaux Posts" (last 3 days)
    const { count: newPostsCount } = await supabase.from("posts")
        .select("*", { count: 'exact', head: true })
        .gt('created_at', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())


    return (
        <div className="container py-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                <p className="text-muted-foreground">Bienvenue sur votre espace sécurisé APREF Connect.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nouveaux Posts</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{newPostsCount || 0}</div>
                        <p className="text-xs text-muted-foreground">depuis 3 jours</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prochain Événement</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {nextEvent ? (
                            <>
                                <div className="text-2xl font-bold">
                                    {new Date(nextEvent.start_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{nextEvent.title}</p>
                            </>
                        ) : (
                            <div className="text-sm text-muted-foreground">Aucun événement</div>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nouveaux Membres</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{newMembersCount || 0}</div>
                        <p className="text-xs text-muted-foreground">cette semaine</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Latest News / Urgent */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>À la une</CardTitle>
                        <CardDescription>
                            Dernière information importante du réseau.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {urgentPost ? (
                            <div className={`rounded-lg border p-4 ${urgentPost.is_urgent ? 'bg-red-50/50 border-red-100' : ''}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-sm">{urgentPost.author?.full_name || "APREF Admin"}</span>
                                    <span className="text-xs text-muted-foreground">{new Date(urgentPost.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm mb-4">{urgentPost.content}</p>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/feed">Voir le fil d'actualité</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">Aucune actualité pour le moment.</div>
                        )}
                    </CardContent>
                </Card>

                {/* Next Event List */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Prochain Agenda</CardTitle>
                        <CardDescription>
                            Ne manquez pas les prochains rendez-vous.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {upcomingEvents && upcomingEvents.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingEvents.map((event: any) => (
                                    <div key={event.id} className="border-l-4 border-primary pl-4">
                                        <h4 className="font-semibold line-clamp-1">{event.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(event.start_date).toLocaleDateString()} • {event.location}
                                        </p>
                                    </div>
                                ))}
                                <Button className="w-full" asChild>
                                    <Link href="/events">
                                        Voir l'agenda complet <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Aucun événement à venir.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
