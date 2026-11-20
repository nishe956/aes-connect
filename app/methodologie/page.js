export const metadata = { title: "Notre méthode" };

const etapes = [
  {
    numero: "1",
    verbe: "Choisir",
    titre: "Des faits marquants",
    texte:
      "Nous retenons les actes officiels, les traités, les déclarations conjointes et les faits vérifiés qui ont un impact direct sur la région.",
  },
  {
    numero: "2",
    verbe: "Vérifier",
    titre: "Au moins deux sources",
    // À CONFIRMER : cette règle doit être la même que dans la base de données
    // (min_sources dans le script SQL) et que sur les maquettes.
    texte:
      "Chaque fait est appuyé par au moins deux sources, dont une source officielle quand elle existe.",
  },
  {
    numero: "3",
    verbe: "Expliquer",
    titre: "Un contexte clair",
    texte:
      "Un résumé et un contexte (avant, ce qui s’est passé, ce que ça change), sans jugement de valeur.",
  },
];

const types = [
  {
    nom: "Officiel",
    texte:
      "Textes législatifs, communiqués ministériels, traités et déclarations d’institutions publiques.",
  },
  {
    nom: "Presse",
    texte:
      "Agences de presse et médias locaux ou internationaux reconnus pour leur rigueur.",
  },
  {
    nom: "Académique",
    texte:
      "Revues universitaires, centres d’études et travaux d’experts documentés.",
  },
];

export default function Methodologie() {
  return (
    <div className="space-y-6 pb-6 pt-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Notre méthode
        </h1>
        <p className="mt-1 text-on-surface-variant">
          Comment nous choisissons, vérifions et expliquons chaque fait.
        </p>
      </header>

      <ol className="space-y-3">
        {etapes.map((e) => (
          <li
            key={e.numero}
            className="flex gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed font-semibold text-primary"
            >
              {e.numero}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                {e.verbe}
              </p>
              <h2 className="font-semibold">{e.titre}</h2>
              <p className="mt-1 text-sm text-on-surface-variant">{e.texte}</p>
            </div>
          </li>
        ))}
      </ol>

      <section
        aria-labelledby="types"
        className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
      >
        <h2 id="types" className="text-lg font-semibold">
          Les types de sources
        </h2>
        <dl className="mt-3 space-y-3">
          {types.map((t) => (
            <div key={t.nom} className="rounded-lg bg-surface-container-low p-3">
              <dt className="inline-block rounded-md bg-secondary-container px-2 py-0.5 text-xs font-semibold text-on-secondary-container">
                {t.nom}
              </dt>
              <dd className="mt-2 text-sm text-on-surface-variant">
                {t.texte}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
