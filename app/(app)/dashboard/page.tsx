import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_POSTS, MOCK_EVENTS } from "@/lib/data"
import { Calendar, Users, Activity, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
    const urgentPost = MOCK_POSTS.find(p => p.is_urgent) || MOCK_POSTS[0]
    const nextEvent = MOCK_EVENTS[0]

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
                        <CardTitle className="text-sm font-medium">Messages non lus</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+2 depuis votre dernière visite</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prochain Événement</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">J-5</div>
                        <p className="text-xs text-muted-foreground">Forum de Dakar</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Nouveaux Membres</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12</div>
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
                        <div className={`rounded-lg border p-4 ${urgentPost.is_urgent ? 'bg-red-50/50 border-red-100' : ''}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm">{urgentPost.author?.full_name}</span>
                                <span className="text-xs text-muted-foreground">{new Date(urgentPost.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm mb-4">{urgentPost.content}</p>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/feed">Voir le fil d'actualité</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Event */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Prochain Agenda</CardTitle>
                        <CardDescription>
                            Ne manquez pas les prochains rendez-vous.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold">{nextEvent.title}</h4>
                                <p className="text-sm text-muted-foreground">{new Date(nextEvent.start_date).toLocaleDateString()}</p>
                                <p className="text-sm text-muted-foreground">{nextEvent.location}</p>
                            </div>
                            <Button className="w-full" asChild>
                                <Link href="/events">
                                    Voir l'agenda complet <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
