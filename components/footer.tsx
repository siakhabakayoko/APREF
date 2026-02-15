import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="images/apref-footer-logo.png"
                alt="APREF Logo"
                width={240}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-background/70 leading-relaxed max-w-md">
              L'APREF est une Association Loi 1901 permettant aux préfets et représentants de l'État francophones de
              mutualiser leurs préoccupations et pratiques administratives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-background">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "À propos", href: "#about" },
                { label: "Événements", href: "#events" },
                { label: "Équipe", href: "#team" },
                { label: "Pays membres", href: "#countries" },
                { label: "Nous rejoindre", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-background/70 hover:text-background transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-background">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:sec-gen@apref.fr" className="hover:text-background transition-colors">
                  sec-gen@apref.fr
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span>Salon des Préfets – Place Beauvau, 75008 Paris</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="https://www.facebook.com/AssoAPREF/?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://fr.linkedin.com/company/association-des-prefets-et-des-representants-de-l-etat-de-la-francophonie-apref-" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://x.com/APREF2" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">X</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">© {new Date().getFullYear()} APREF. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="text-sm text-background/50 hover:text-background transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-sm text-background/50 hover:text-background transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
