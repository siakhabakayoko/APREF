export interface Profile {
    id: string
    email: string
    full_name: string
    role: string // e.g., "Préfet", "Gouverneur"
    country: string
    region: string
    bio?: string
    avatar_url?: string
    expertise: string[] // e.g., ["Gestion de Crise", "Sécurité"]
    is_admin: boolean
    created_at: string
}

export interface Post {
    id: string
    author_id: string
    author?: Profile
    content: string
    image_url?: string
    is_urgent: boolean
    tags: string[]
    created_at: string
    likes_count: number
    comments_count: number
}

export interface Event {
    id: string
    title: string
    description: string
    start_date: string
    end_date: string
    location: string
    is_virtual: boolean
    meeting_link?: string
    organizer_id: string
    created_at: string
}

export interface Comment {
    id: string
    post_id: string
    user_id: string
    author?: Profile
    content: string
    created_at: string
}
