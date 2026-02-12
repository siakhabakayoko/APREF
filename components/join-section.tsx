"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, FileText, Users, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactMessage, submitMembershipRequest } from "@/app/actions"
import { useState } from "react"

export function JoinSection() {
  const [contactStatus, setContactStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [contactLoading, setContactLoading] = useState(false)
  const [membershipStatus, setMembershipStatus] = useState<{ success?: string; error?: string } | null>(null)
  const [membershipLoading, setMembershipLoading] = useState(false)
  const [showMembershipForm, setShowMembershipForm] = useState(false)

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setContactLoading(true)
    setContactStatus(null)
    const formData = new FormData(e.currentTarget)
    const result = await submitContactMessage(formData)
    setContactStatus(result)
    setContactLoading(false)
    if (result.success) e.currentTarget.reset()
  }

  async function handleMembership(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMembershipLoading(true)
    setMembershipStatus(null)
    const formData = new FormData(e.currentTarget)
    const result = await submitMembershipRequest(formData)
    setMembershipStatus(result)
    setMembershipLoading(false)
    if (result.success) {
      e.currentTarget.reset()
      setTimeout(() => setShowMembershipForm(false), 3000)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="inline-block text-sm font-medium text-secondary">Nous rejoindre</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Devenez membre de <span className="text-input">l'APREF</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Rejoignez un réseau de hauts fonctionnaires francophones engagés pour le partage des meilleures pratiques
              administratives et la promotion de la Francophonie institutionnelle.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Réseau international</h4>
                  <p className="text-sm text-muted-foreground">
                    Accès à un réseau de préfets et gouverneurs de 10+ pays
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Plateforme collaborative</h4>
                  <p className="text-sm text-muted-foreground">Documents, rapports et ressources partagées</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Lettres électroniques</h4>
                  <p className="text-sm text-muted-foreground">Publications trimestrielles exclusives</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 mt-6"
              onClick={() => setShowMembershipForm(!showMembershipForm)}
            >
              {showMembershipForm ? "Fermer le formulaire" : "Demande d'adhésion"}
              <ArrowRight className="w-4 h-4" />
            </Button>

            {showMembershipForm && (
              <form onSubmit={handleMembership} className="mt-6 bg-card rounded-2xl border border-border p-6 space-y-4">
                <h4 className="font-serif text-lg font-bold text-foreground">{"Formulaire d'adhésion"}</h4>
                <div>
                  <label htmlFor="m_name" className="block text-sm font-medium text-foreground mb-2">Nom complet *</label>
                  <input type="text" id="m_name" name="full_name" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Votre nom complet" />
                </div>
                <div>
                  <label htmlFor="m_email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input type="email" id="m_email" name="email" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="votre@email.com" />
                </div>
                <div>
                  <label htmlFor="m_country" className="block text-sm font-medium text-foreground mb-2">Pays *</label>
                  <input type="text" id="m_country" name="country" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Ex: France" />
                </div>
                <div>
                  <label htmlFor="m_position" className="block text-sm font-medium text-foreground mb-2">Fonction actuelle *</label>
                  <input type="text" id="m_position" name="current_position" required className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Ex: Préfet de la région..." />
                </div>
                <div>
                  <label htmlFor="m_motivation" className="block text-sm font-medium text-foreground mb-2">Motivation</label>
                  <textarea id="m_motivation" name="motivation" rows={3} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="Pourquoi souhaitez-vous rejoindre l'APREF ?" />
                </div>
                <Button type="submit" disabled={membershipLoading} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {membershipLoading ? "Envoi en cours..." : "Soumettre ma candidature"}
                </Button>
                {membershipStatus?.success && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {membershipStatus.success}
                  </div>
                )}
                {membershipStatus?.error && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {membershipStatus.error}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Content - Contact Card */}
          <div className="bg-card rounded-3xl border border-border p-8 md:p-10">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Nous contacter</h3>
            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <label htmlFor="c_name" className="block text-sm font-medium text-foreground mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="c_name"
                  name="full_name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="c_email" className="block text-sm font-medium text-foreground mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  id="c_email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label htmlFor="c_subject" className="block text-sm font-medium text-foreground mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="c_subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Ex: Demande de renseignements"
                />
              </div>
              <div>
                <label htmlFor="c_message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="c_message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <Button type="submit" disabled={contactLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {contactLoading ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
              {contactStatus?.success && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {contactStatus.success}
                </div>
              )}
              {contactStatus?.error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {contactStatus.error}
                </div>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Email direct :{" "}
                <a href="mailto:sec-gen@apref.fr" className="text-primary hover:underline">
                  sec-gen@apref.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
