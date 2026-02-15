
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Politique de Confidentialité - APREF",
    description: "Politique de confidentialité de l'Association des Préfets et des Représentants de l'État de la Francophonie.",
}

export default function PolitiqueConfidentialitePage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">Politique de Confidentialité</h1>

            <div className="prose prose-lg dark:prose-invert">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Collecte des données</h2>
                    <p className="text-muted-foreground">
                        Nous collectons uniquement les données nécessaires au fonctionnement de l'association et à la gestion des adhésions.
                        Ces données peuvent inclure : nom, prénom, fonction, adresse email, et coordonnées professionnelles.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Utilisation des données</h2>
                    <p className="text-muted-foreground">
                        Les informations recueillies sont enregistrées dans un fichier informatisé par l'APREF pour :
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-2">
                        <li>La gestion des membres et des cotisations</li>
                        <li>L'envoi de la newsletter et des informations relatives à la vie de l'association</li>
                        <li>L'organisation d'événements</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Conservation des données</h2>
                    <p className="text-muted-foreground">
                        Vos données personnelles sont conservées pendant la durée de votre adhésion et jusqu'à 3 ans après votre départ de l'association,
                        sauf demande explicite de votre part.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Vos droits</h2>
                    <p className="text-muted-foreground">
                        Conformément à la loi « informatique et libertés » et au RGPD, vous pouvez exercer votre droit d'accès aux données vous concernant
                        et les faire rectifier en contactant : sec-gen@apref.fr
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Cookies</h2>
                    <p className="text-muted-foreground">
                        Ce site utilise des cookies techniques nécessaires à son bon fonctionnement et des cookies de mesure d'audience anonymes.
                        Aucun cookie publicitaire n'est déposé sans votre consentement.
                    </p>
                </section>
            </div>
        </div>
    )
}
