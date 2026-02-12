import { MOCK_EVENTS } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Video } from "lucide-react"

export default function EventsPage() {
    return (
        <div className="container py-6 space-y-6 pb-24">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
                <p className="text-muted-foreground">
                    Prochains événements et rencontres.
                </p>
            </div>

            <div className="space-y-4">
                {MOCK_EVENTS.map((event) => (
                    <Card key={event.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                                <Badge>{new Date(event.start_date).toLocaleDateString()}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p className="text-muted-foreground">{event.description}</p>
                            <div className="flex items-center gap-2 text-primary pt-2">
                                {event.is_virtual ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                    {new Date(event.end_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
