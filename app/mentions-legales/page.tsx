import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mentions Légales - APREF",
    description: "Mentions légales de l'Association des Préfets et des Représentants de l'État de la Francophonie.",
}

export default function MentionsLegalesPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">Mentions Légales</h1>

            <div className="prose prose-lg dark:prose-invert">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Éditeur du site</h2>
                    <p className="text-muted-foreground">
                        L'Association des Préfets et des Représentants de l'État de la Francophonie (APREF)<br />
                        Association régie par la loi du 1er juillet 1901<br />
                        Siège social : [Adresse de l'association]<br />
                        Email : sec-gen@apref.fr<br />
                        Directeur de la publication : [Nom du Directeur]
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Hébergement</h2>
                    <p className="text-muted-foreground">
                        Ce site est hébergé par Vercel Inc.<br />
                        340 S Lemon Ave #4133<br />
                        Walnut, CA 91789<br />
                        États-Unis
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Propriété intellectuelle</h2>
                    <p className="text-muted-foreground">
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                        Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Liens hypertextes</h2>
                    <p className="text-muted-foreground">
                        Le site de l'APREF peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet.
                        Les liens vers ces autres ressources vous font quitter le site de l'APREF.
                    </p>
                </section>
            </div>
        </div>
    )
}
