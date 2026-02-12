import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Roboto, Roboto_Mono, Roboto_Slab, Roboto as V0_Font_Roboto, Roboto_Mono as V0_Font_Roboto_Mono, Roboto_Slab as V0_Font_Roboto_Slab } from 'next/font/google'

// Initialize fonts
const _roboto = V0_Font_Roboto({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _robotoMono = V0_Font_Roboto_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _robotoSlab = V0_Font_Roboto_Slab({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "APREF - Association des Préfets et des Représentants de l'État de la Francophonie",
  description:
    "L'APREF permet aux préfets et représentants de l'État francophones de mutualiser leurs préoccupations et pratiques administratives.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${roboto.className} ${robotoMono.variable} ${robotoSlab.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
