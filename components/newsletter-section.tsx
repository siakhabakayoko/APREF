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

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <input type="hidden" name="full_name" value="" />
              <Button type="submit" disabled={loading} className="hover:bg-primary/90 text-primary-foreground gap-2 bg-input">
                {loading ? "Envoi..." : "S'inscrire"}
                <ArrowRight className="w-4 h-4" />
              </Button>
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
            <div className="grid grid-cols-2 gap-4">
              {[12, 11, 10, 9].map((num, index) => (
                <div
                  key={num}
                  className={`bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer ${
                    index === 0 ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-border">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-serif font-bold text-foreground mb-1">Lettre n°{num}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{index === 0 ? "Nouveau !" : "2024"}</p>
                  <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto text-primary">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
