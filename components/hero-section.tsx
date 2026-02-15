"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

import { ArrowRight, Users, Globe2, Calendar } from "lucide-react"
import RotatingEarth from "@/components/rotating-earth"
import { MembershipModal } from "@/components/membership-modal"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#009C89]/10 via-background to-[#0612BF]/10" />

      {/* Ambient color spots - Laravel Cloud style */}
      <div className="absolute inset-0 bg-background">
        {/* Teal glow - top left */}
        <div
          className="absolute -top-20 -left-20 w-[700px] h-[700px] rounded-full blur-[180px] opacity-40"
          style={{ background: "radial-gradient(circle, #009C89 0%, transparent 70%)" }}
        />

        {/* Blue glow - bottom right */}


        {/* Violet glow - center right */}


        {/* Orange glow - subtle accent top */}
        <div
          className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #EE5D17 0%, transparent 70%)" }}
        />

        {/* Red glow - very subtle center accent */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #ff0000 0%, transparent 70%)" }}
        />
      </div>
      {/* End of Laravel Cloud style ambient gradient background */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-primary px-4 py-2 rounded-full text-sm font-medium bg-card border-border border">
              <Globe2 className="w-4 h-4" />
              <span>Francophonie & Gouvernance</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Association des Préfets et des Représentants de l'État de la{" "}
              <span className="text-input">Francophonie</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Depuis 2017, l'APREF réunit près d'une centaine de membres pour mutualiser les préoccupations et pratiques
              administratives des représentants de l'État francophones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <MembershipModal>
                <Button size="lg" className="hover:bg-primary/90 text-primary-foreground gap-2 bg-input w-full sm:w-auto">
                  Rejoindre l'APREF
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </MembershipModal>
              <Link href="#about">
                <Button size="lg" variant="outline" className="hover:bg-accent bg-transparent border-chart-2 text-chart-2 w-full sm:w-auto">
                  En savoir plus
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-input">100+</p>
                <p className="text-sm text-muted-foreground">Membres actifs</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-secondary">10+</p>
                <p className="text-sm text-muted-foreground">Pays représentés</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl font-bold text-chart-2">5</p>
                <p className="text-sm text-muted-foreground">Forums organisés</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Central Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <RotatingEarth className="w-full h-full" />
              </div>

              {/* Floating Cards */}
              <div className="absolute top-10 right-0 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Réseau international</p>
                    <p className="text-xs text-muted-foreground">Coopération francophone</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-0 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-border">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Forum de Genève</p>
                    <p className="text-xs text-muted-foreground">11-12 Décembre 2027</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
