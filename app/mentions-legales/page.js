export const metadata = { title: "Mentions légales et confidentialité" };

// MODÈLE À COMPLÉTER ET À FAIRE RELIRE : les passages entre crochets sont à
// remplir par toi. Ce texte n’est pas un conseil juridique.

export default function MentionsLegales() {
  return (
    <div className="space-y-6 pb-6 pt-4">
      <h1 className="text-2xl font-semibold tracking-tight text-primary">
        Mentions légales et confidentialité
      </h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Éditeur du site</h2>
        <p className="text-on-surface-variant">
          AES Connect est une initiative indépendante, non affiliée à l’AES.
          Éditrice : [à compléter : nom et statut]. Contact : [à compléter :
          adresse e-mail].
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Hébergement</h2>
        <p className="text-on-surface-variant">
          Le site est hébergé par Vercel. La base de données est hébergée par
          Supabase.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Contenus et sources</h2>
        <p className="text-on-surface-variant">
          AES Connect cite des titres et renvoie vers les sources originales.
          Les articles et documents cités ne sont pas reproduits.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Données personnelles</h2>
        <p className="text-on-surface-variant">
          Le site ne demande pas de compte et ne collecte pas de données
          personnelles pour être consulté. Lorsqu’une suggestion est envoyée,
          l’adresse e-mail est facultative et sert uniquement à répondre.
          Comme pour tout site web, les hébergeurs peuvent enregistrer des
          données techniques de connexion (par exemple l’adresse IP et le
          navigateur).
        </p>
        <p className="text-on-surface-variant">
          Pour toute question sur tes données ou pour signaler une erreur :
          [à compléter : adresse e-mail].
        </p>
      </section>
    </div>
  );
}
