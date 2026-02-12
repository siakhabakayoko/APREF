import { Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Olivier FARGEON",
    role: "Président",
    title: "Préfet du district de Nyon",
    country: "Suisse",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Nicolas DESFORGES",
    role: "Vice-Président",
    title: "Préfet honoraire",
    country: "France",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Félicien AMANI",
    role: "Vice-Président",
    title: "Directeur de cabinet adjoint du Président de la République",
    country: "Côte d'Ivoire",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Bassirou SENE",
    role: "Vice-Président",
    title: "Ancien Ambassadeur, Ancien Haut-commissaire",
    country: "Sénégal",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Denis MATHEN",
    role: "Vice-Président",
    title: "Gouverneur de la Province de Namur",
    country: "Belgique",
    image: "/professional-headshot.png",
  },
  {
    name: "Clément Kalou KOUAME BI",
    role: "Membre du bureau",
    title: "Préfet de la Région du Hambol",
    country: "Côte d'Ivoire",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Thomas WISNER",
    role: "Membre du bureau",
    title: "Coordonnateur de l'administration publique",
    country: "Haïti",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Kodjo Kadévi ETSE",
    role: "Membre du bureau",
    title: "Préfet du Zio",
    country: "Togo",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Sophie LAVAUX",
    role: "Membre du bureau",
    title: "Gouverneur pour la gestion de crise",
    country: "Belgique",
    image: "/professional-headshot.png",
  },
  {
    name: "Eric DJENDJA",
    role: "Membre du bureau",
    title: "Directeur Général du Développement Local",
    country: "Congo Brazzaville",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Patricia-Dominique LACHAT",
    role: "Membre du bureau",
    title: "Préfète honoraire",
    country: "Suisse",
    image: "/professional-headshot.png",
  },
  {
    name: "Pierre N'GAHANE",
    role: "Secrétaire Général",
    title: "Préfet, Directeur général délégué",
    country: "France",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Eric FREYSSELINARD",
    role: "Trésorier",
    title: "Préfet de la Vendée",
    country: "France",
    image: "/placeholder-user.jpg",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-secondary mb-4">Notre équipe</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Le Bureau de <span className="text-input">l'APREF</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Des hauts fonctionnaires engagés pour la coopération francophone et le partage des bonnes pratiques
            administratives.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full mb-3">
                  {member.role}
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{member.title}</p>
                <p className="text-xs text-primary font-medium">{member.country}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Voir tous les membres du bureau
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
