import { Profile, Post, Event } from "@/types"

export const MOCK_PROFILES: Profile[] = [
    {
        id: "1",
        email: "jean.dupont@interieur.gouv.fr",
        full_name: "Jean Dupont",
        role: "Préfet",
        country: "France",
        region: "Occitanie",
        bio: "Préfet de la région Occitanie, expert en gestion de crise et sécurité civile.",
        avatar_url: "https://i.pravatar.cc/150?u=jean",
        expertise: ["Sécurité", "Gestion de Crise"],
        is_admin: false,
        created_at: new Date().toISOString()
    },
    {
        id: "2",
        email: "fatou.diop@gouv.sn",
        full_name: "Fatou Diop",
        role: "Gouverneur",
        country: "Sénégal",
        region: "Dakar",
        bio: "Gouverneur de la région de Dakar, engagée pour l'innovation publique et le développement durable.",
        avatar_url: "https://i.pravatar.cc/150?u=fatou",
        expertise: ["Innovation Publique", "Développement Durable"],
        is_admin: true,
        created_at: new Date().toISOString()
    },
    {
        id: "3",
        email: "marc.williams@quebec.ca",
        full_name: "Marc Williams",
        role: "Sous-ministre",
        country: "Canada (Québec)",
        region: "Québec",
        bio: "Sous-ministre aux relations internationales, spécialisé en francophonie économique.",
        avatar_url: "https://i.pravatar.cc/150?u=marc",
        expertise: ["Francophonie Economique", "Diplomatie"],
        is_admin: false,
        created_at: new Date().toISOString()
    }
]

export const MOCK_POSTS: Post[] = [
    {
        id: "101",
        author_id: "2",
        author: MOCK_PROFILES[1],
        content: "Lancement officiel de la plateforme APREF Connect ! Un grand pas pour la coopération administrative francophone. 🌍🤝 #APREF #Innovation",
        is_urgent: false,
        tags: ["Annonce", "Innovation"],
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        likes_count: 45,
        comments_count: 12
    },
    {
        id: "102",
        author_id: "1",
        content: "📢 ALERTE MÉTÉO : Vigilance rouge orages dans le sud de la France. Cellule de crise activée.",
        is_urgent: true,
        tags: ["Sécurité", "Urgence"],
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        likes_count: 120,
        comments_count: 5
    }
]

export const MOCK_EVENTS: Event[] = [
    {
        id: "201",
        title: "Forum de Dakar 2025",
        description: "Le rendez-vous annuel des hauts-fonctionnaires de l'espace francophone. Thème : L'administration de demain.",
        start_date: "2025-11-15T09:00:00Z",
        end_date: "2025-11-17T18:00:00Z",
        location: "Centre de Conférences de Diamniadio, Sénégal",
        is_virtual: false,
        organizer_id: "2",
        created_at: new Date().toISOString()
    },
    {
        id: "202",
        title: "Webinaire : IA et Service Public",
        description: "Comment l'intelligence artificielle peut-elle améliorer la relation usager ?",
        start_date: "2025-06-10T14:00:00Z",
        end_date: "2025-06-10T15:30:00Z",
        location: "Zoom",
        is_virtual: true,
        meeting_link: "https://zoom.us/j/123456",
        organizer_id: "3",
        created_at: new Date().toISOString()
    }
]
