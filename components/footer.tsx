import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/apref-footer-logo.png"
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
              {["À propos", "Événements", "Équipe", "Pays membres", "Publications"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-background/70 hover:text-background transition-colors">
                    {item}
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
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">© {new Date().getFullYear()} APREF. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-sm text-background/50 hover:text-background transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
