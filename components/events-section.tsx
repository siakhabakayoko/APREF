"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight, Megaphone, CheckCircle, AlertCircle, X } from "lucide-react"
import { registerForEvent } from "@/app/actions"
import { useState } from "react"

export function EventsSection() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [regStatus, setRegStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [regLoading, setRegLoading] = useState(false)

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRegLoading(true)
    setRegStatus(null)
    const formData = new FormData(e.currentTarget)
    const result = await registerForEvent(formData)
    setRegStatus(result)
    setRegLoading(false)
    if (result.success) {
      e.currentTarget.reset()
      setTimeout(() => setShowRegistration(false), 3000)
    }
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium mb-4 text-chart-2">Événements</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Nos prochains <span className="text-input">rendez-vous</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Event */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 text-white">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/BackgroundAPREF.png')" }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-[rgba(1,5,61,0.375)]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse bg-chart-2" />
                Prochain événement
              </span>

              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Forum de Genève 2027</h3>

              <p className="text-lg mb-2 flex items-center gap-2">
                <Megaphone className="w-5 h-5" />
                {`« Le représentant de l\'État face aux enjeux de la communication »`}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-5 h-5" />
                  <span className="text-white">11-12 Décembre 2027</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>Genève, Suisse</span>
                </div>
              </div>

              <Button className="bg-white text-primary hover:bg-white/90 gap-2" onClick={() => setShowRegistration(true)}>
                {"S'inscrire"}
                <ArrowRight className="w-4 h-4" />
              </Button>

              {showRegistration && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif font-bold text-white">Inscription au Forum</h4>
                    <button type="button" onClick={() => setShowRegistration(false)} className="text-white/60 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-3">
                    <input type="hidden" name="event_name" value="Forum de Genève 2027" />
                    <input type="text" name="full_name" required placeholder="Nom complet *" className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    <input type="email" name="email" required placeholder="Email *" className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    <input type="text" name="country" placeholder="Pays" className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    <input type="text" name="organization" placeholder="Organisation" className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" />
                    <Button type="submit" disabled={regLoading} className="w-full bg-white text-primary hover:bg-white/90">
                      {regLoading ? "Inscription..." : "Confirmer mon inscription"}
                    </Button>
                    {regStatus?.success && (
                      <div className="flex items-center gap-2 text-green-300 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {regStatus.success}
                      </div>
                    )}
                    {regStatus?.error && (
                      <div className="flex items-center gap-2 text-red-300 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {regStatus.error}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Past Event */}
          <div className="bg-card rounded-3xl border border-border overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <img
                src="/1765816654791.jpeg"
                alt="Forum de Dakar 2025"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium bg-chart-2">
                  Dernier forum
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
                {"5ème Forum de l\'APREF"}
              </h3>
              <p className="text-muted-foreground mb-4">King Fahd Palace, Dakar</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {
                  "Ce forum a porté sur \"le représentant de l\'État, face aux enjeux de l\'intelligence artificielle.\""
                }
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
