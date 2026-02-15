"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { FileText, ArrowRight, Download, CheckCircle, AlertCircle } from "lucide-react"
import { subscribeNewsletter } from "@/app/actions"
import { useState } from "react"

export function NewsletterSection() {
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const formData = new FormData(e.currentTarget)
    const result = await subscribeNewsletter(formData)
    setStatus(result)
    setLoading(false)
    if (result.success) {
      e.currentTarget.reset()
    }
  }
  const highlights = [
    "Éditorial du Président",
    "Articles de fond",
    "Retours d'expérience",
    "Regards croisés",
    "Perspectives locales",
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block text-sm font-medium text-secondary">Publications</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Lettres électroniques <span className="text-primary">trimestrielles</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Publiées chaque trimestre, les lettres électroniques de l'APREF constituent une vitrine vivante des
              réflexions, actions et expériences des membres à travers l'espace francophone.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 pt-4">
              <input
                type="text"
                name="full_name"
                placeholder="Votre nom complet"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <Button type="submit" disabled={loading} className="hover:bg-primary/90 text-primary-foreground gap-2 bg-input">
                  {loading ? "Envoi..." : "S'inscrire"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
            {status?.success && (
              <div className="flex items-center gap-2 text-green-600 text-sm pt-2">
                <CheckCircle className="w-4 h-4" />
                {status.success}
              </div>
            )}
            {status?.error && (
              <div className="flex items-center gap-2 text-destructive text-sm pt-2">
                <AlertCircle className="w-4 h-4" />
                {status.error}
              </div>
            )}
          </div>

          {/* Right Content - Newsletter Cards */}
          <div className="relative">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '100.0000%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
              <iframe loading="lazy" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                src="https://www.canva.com/design/DAG_asNVORY/lkxRlf97HJ3XvUeSNOlOzw/view?embed" allowFullScreen allow="fullscreen">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
