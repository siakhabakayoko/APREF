"use server"

import { createClient } from "@/lib/supabase/server"

export async function subscribeNewsletter(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const full_name = formData.get("full_name") as string | null

  if (!email) {
    return { error: "L'adresse email est requise." }
  }

  const { error } = await supabase
    .from("newsletter_subscriptions")
    .insert({ email, full_name: full_name || null })

  if (error) {
    if (error.code === "23505") {
      return { error: "Cette adresse email est déjà inscrite." }
    }
    console.error("Error subscribing to newsletter:", error);
    if (error.code === "23505") {
      return { error: "Cette adresse email est déjà inscrite." }
    }
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }

  return { success: "Inscription réussie ! Merci de votre intérêt." }
}

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient()

  const full_name = formData.get("full_name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string | null
  const message = formData.get("message") as string

  if (!full_name || !email || !message) {
    return { error: "Veuillez remplir tous les champs obligatoires." }
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ full_name, email, subject: subject || null, message })

  if (error) {
    console.error("Error submitting contact message:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }

  return { success: "Message envoyé avec succès ! Nous vous répondrons rapidement." }
}

export async function submitMembershipRequest(formData: FormData) {
  const supabase = await createClient()

  const full_name = formData.get("full_name") as string
  const email = formData.get("email") as string
  const country = formData.get("country") as string
  const current_position = formData.get("current_position") as string
  const motivation = formData.get("motivation") as string | null

  if (!full_name || !email || !country || !current_position) {
    return { error: "Veuillez remplir tous les champs obligatoires." }
  }

  const { error } = await supabase
    .from("membership_requests")
    .insert({
      full_name,
      email,
      country,
      current_position,
      motivation: motivation || null,
    })

  if (error) {
    if (error.code === "23505") {
      return { error: "Une demande d'adhésion avec cette adresse email existe déjà." }
    }
    console.error("Error submitting membership request:", error);
    if (error.code === "23505") {
      return { error: "Une demande d'adhésion avec cette adresse email existe déjà." }
    }
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }

  return { success: "Demande d'adhésion envoyée ! Nous examinerons votre candidature." }
}

export async function registerForEvent(formData: FormData) {
  const supabase = await createClient()

  const full_name = formData.get("full_name") as string
  const email = formData.get("email") as string
  const event_name = formData.get("event_name") as string
  const country = formData.get("country") as string | null
  const organization = formData.get("organization") as string | null

  if (!full_name || !email || !event_name) {
    return { error: "Veuillez remplir tous les champs obligatoires." }
  }

  const { error } = await supabase
    .from("event_registrations")
    .insert({
      full_name,
      email,
      event_name,
      country: country || null,
      organization: organization || null,
    })

  if (error) {
    console.error("Error registering for event:", error);
    if (error.code === "23505") {
      return { error: "Vous êtes déjà inscrit à cet événement." }
    }
    return { error: "Une erreur est survenue. Veuillez réessayer." }
  }

  return { success: "Inscription confirmée ! Vous recevrez un email de confirmation." }
}
