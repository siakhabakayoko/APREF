import { Target, Eye, Users } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Target,
      title: "Notre mission",
      description:
        "Permettre aux préfets et représentants de l'État francophones de mutualiser leurs préoccupations et pratiques administratives dans un cadre de rencontres, d'échanges et de travail.",
    },
    {
      icon: Eye,
      title: "Notre vision",
      description:
        "Participer à la meilleure reconnaissance des cultures administratives au sein de la Francophonie et positionner notre réseau comme un véritable centre de ressources.",
    },
    {
      icon: Users,
      title: "Nos membres",
      description:
        "Ouverte aux systèmes administratifs comportant des représentants territoriaux de l'État (Préfets, gouverneurs, délégués) ainsi qu'aux États fédéraux.",
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-secondary mb-4">Qui sommes-nous ?</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Une association au service de la <span className="text-input text-input">Francophonie</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-24">
            L'APREF est une Association Loi 1901 créée en décembre 2017, rassemblant les hauts fonctionnaires
            territoriaux de l'espace francophone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors size-24 mt-[-70px] opacity-100 bg-sidebar-accent rounded-full shadow-xl">
                <feature.icon className="text-primary size-14 mt-0 h-12 w-12" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 rounded-2xl p-8 md:p-12 text-center bg-primary">
          <blockquote className="text-lg md:text-xl text-primary-foreground leading-relaxed max-w-3xl mx-auto italic">
            "Nous souhaitons développer nos partenariats avec des organismes qui défendent la francophonie, en
            particulier l'OIF, en positionnant notre réseau comme un véritable centre de ressources."
          </blockquote>
          <p className="mt-6 font-medium text-primary-foreground/80">— Nicolas Desforges, 1er Vice-Président</p>
        </div>
      </div>
    </section>
  )
}
