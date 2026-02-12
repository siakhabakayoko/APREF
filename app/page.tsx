import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EventsSection } from "@/components/events-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { TeamSection } from "@/components/team-section"
import { CountriesSection } from "@/components/countries-section"
import { JoinSection } from "@/components/join-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <NewsletterSection />
      <TeamSection />
      <CountriesSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
