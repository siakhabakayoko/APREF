const countries = [
  { name: "France", flag: "🇫🇷", members: "Pays fondateur" },
  { name: "Sénégal", flag: "🇸🇳", members: "Membre actif" },
  { name: "Belgique", flag: "🇧🇪", members: "Membre actif" },
  { name: "Côte d'Ivoire", flag: "🇨🇮", members: "Membre actif" },
  { name: "Togo", flag: "🇹🇬", members: "Membre actif" },
  { name: "Suisse", flag: "🇨🇭", members: "Membre actif" },
  { name: "Haïti", flag: "🇭🇹", members: "Membre actif" },
  { name: "Bénin", flag: "🇧🇯", members: "Membre actif" },
  { name: "Guinée Conakry", flag: "🇬🇳", members: "Membre actif" },
  { name: "Congo", flag: "🇨🇬", members: "Membre actif" },
]

export function CountriesSection() {
  return (
    <section id="countries" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-secondary mb-4">Rayonnement international</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Les pays <span className="text-input">membres</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Notre ambition est de couvrir à terme le périmètre de l'OIF, en intégrant les membres associés et les
            observateurs.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="text-4xl mb-3 block" role="img" aria-label={country.name}>
                {country.flag}
              </span>
              <h3 className="font-medium text-foreground mb-1 text-sm">{country.name}</h3>
              <p className="text-xs text-muted-foreground">{country.members}</p>
            </div>
          ))}
        </div>

        {/* Expansion Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <span className="text-primary font-medium">+</span> Nous prévoyons de nous étendre en{" "}
            <span className="font-medium text-foreground">Asie</span> et en{" "}
            <span className="font-medium text-foreground">Amérique</span> pour renforcer notre présence géographique.
          </p>
        </div>
      </div>
    </section>
  )
}
