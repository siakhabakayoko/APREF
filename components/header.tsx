"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { MembershipModal } from "@/components/membership-modal"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Accueil", href: "#" },
    { label: "À propos", href: "#about" },
    { label: "Événements", href: "#events" },
    { label: "Équipe", href: "#team" },
    { label: "Pays membres", href: "#countries" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="APREF - Association des Préfets et des Représentants de l'Etat de la Francophonie"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                scroll={true}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-secondary/10 text-foreground">
                Connexion
              </Button>
            </Link>

            <MembershipModal>
              <Button className="hover:bg-secondary/90 text-secondary-foreground bg-chart-2">
                Adhérer
              </Button>
            </MembershipModal>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/login">
                <Button variant="outline" className="w-full mt-4">
                  Connexion
                </Button>
              </Link>

              <MembershipModal>
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-2 w-full">
                  Adhérer
                </Button>
              </MembershipModal>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
